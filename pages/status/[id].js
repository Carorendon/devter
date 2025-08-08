// pages/status/[id].js
import Devit from "components/Devit"
import { useRouter } from "next/router"

export default function DevitPage(props) {
  const router = useRouter()

  // Muestra loading mientras se genera la página
  if (router.isFallback) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <h1>Cargando devit...</h1>
      </div>
    )
  }

  // Si no hay props, muestra error
  if (!props || !props.id) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Devit no encontrado</h1>
        <p>Lo sentimos, este devit no existe o ha sido eliminado.</p>
      </div>
    )
  }

  return (
    <>
      <Devit {...props} />
      <style jsx>{`
        /* Estilos adicionales si los necesitas */
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  try {
    // Opción 1: Si tienes Firebase configurado
    const { db } = await import("../../firebase/admin")
    
    // Obtener algunos devits populares o recientes
    const snapshot = await db
      .collection("devits")
      .orderBy("createdAt", "desc")
      .limit(10) // Solo los 10 más recientes para pre-generar
      .get()

    const paths = snapshot.docs.map(doc => ({
      params: { id: doc.id }
    }))

    return {
      paths,
      fallback: 'blocking' // Genera páginas bajo demanda
    }
    
  } catch (error) {
    console.log('Error obteniendo paths, usando fallback:', error)
    
    // Opción 2: Si Firebase no está disponible
    return {
      paths: [], // No pre-generar ninguna página
      fallback: 'blocking' // Todas se generan bajo demanda
    }
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  // Validar que el ID existe
  if (!id) {
    return { notFound: true }
  }

  try {
    // Importación dinámica de Firebase (solo en el servidor)
    const { db } = await import("../../firebase/admin")
    
    const doc = await db.collection("devits").doc(id).get()
    
    if (!doc.exists) {
      return { notFound: true }
    }

    const data = doc.data()
    
    // Preparar los props asegurándose de que todos los campos existan
    const props = {
      id: doc.id,
      avatar: data.avatar || '/default-avatar.png',
      content: data.content || '',
      userId: data.userId || '',
      userName: data.userName || 'Usuario Anónimo',
      img: data.img || null,
      likesCount: data.likesCount || 0,
      sharedCount: data.sharedCount || 0,
      // Convertir timestamp de Firestore a número
      createdAt: data.createdAt ? +data.createdAt.toDate() : Date.now(),
    }

    return { 
      props,
      revalidate: 60 // Revalidar cada minuto
    }
    
  } catch (error) {
    console.error('Error en getStaticProps:', error)
    
    // ❌ COMENTADO: Datos de prueba eliminados
    /*
    if (process.env.NODE_ENV === 'development') {
      const props = {
        id: id,
        avatar: "https://i.pinimg.com/736x/25/06/c9/2506c909c706c6fcbaaf686aafc5032e.jpg",
        userName: "Usuario de Prueba",
        content: "Este es un devit de prueba (modo desarrollo)",
        createdAt: Date.now(),
        img: null,
        likesCount: 5,
        sharedCount: 2,
        userId: "test-user"
      }
      
      return { props, revalidate: 1 }
    }
    */
    
    // ✅ Solo devolver notFound si hay error
    return { notFound: true }
  }
}
