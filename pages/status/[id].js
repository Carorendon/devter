// ✅ VERSIÓN CON FIREBASE (para cuando esté configurado correctamente)

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

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}





/*
// pages/status/[id].js
import Devit from "components/Devit"
import { useRouter } from "next/router"

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  // ✅ SOLUCIÓN TEMPORAL: Solo datos de prueba (sin Firebase)
  const now = Date.now()
  console.log('getStaticProps - Current timestamp:', now)
  
  const props = {
    id: "test-id",
    avatar: "https://i.pinimg.com/736x/25/06/c9/2506c909c706c6fcbaaf686aafc5032e.jpg",
    userName: "Usuario de Prueba",
    content: "Este es un devit de prueba",
    createdAt: now,
    img: null,
    likesCount: 0,
    sharedCount: 0
  }

  console.log('getStaticProps - Props:', props)

  return {
    props,
    revalidate: 60
  }
}

*/

