import Devit from "components/Devit"
import { firestore } from "/firebase/admin"
import { useRouter } from "next/router"

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "L70ITZlvStM6KSNzfz38" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params


  try {
    console.log('Obteniendo devit con ID:', id) // Debug

    const doc = await db.collection("devits").doc(id).get()
    
    if (!doc.exists) {
      console.log('Devit no encontrado')
      return {
        notFound: true // ✅ Mejor que props vacías
      }
    }

    const data = doc.data()
    console.log('Datos obtenidos:', data) // Debug
    
    // ✅ Serializar correctamente
    const props = {
      ...data,
      id: doc.id,
      createdAt: data.createdAt ? +data.createdAt.toDate() : Date.now(),
      // Asegurar que todos los campos existen
      avatar: data.avatar || '',
      content: data.content || '',
      userId: data.userId || '',
      userName: data.userName || '',
      img: data.img || null,
      likesCount: data.likesCount || 0,
      sharedCount: data.sharedCount || 0
    }

    console.log('Props serializadas:', props) // Debug

    return {
      props, // ✅ Estructura correcta
      revalidate: 60 // Revalidar cada minuto
    }
    
  } catch (error) {
    console.error('Error en getStaticProps:', error)
    
    return {
      notFound: true // ✅ En caso de error, mostrar 404
    }
  }
}