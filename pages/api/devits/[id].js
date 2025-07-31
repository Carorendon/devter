import { db } from '../../../firebase/admin'

export default async (request, response) => {
  const { query } = request
  const { id } = query
  
  try {
    const doc = await db.collection("devits").doc(id).get()
    
    if (!doc.exists) {
      return response.status(404).json({ error: 'Devit no encontrado' })
    }
    
    const data = doc.data()
    
    response.json({
      ...data,
      id: doc.id,
      createdAt: +data.createdAt.toDate(),
    })
  } catch (error) {
    console.error('Error al obtener devit:', error)
    response.status(500).json({ error: 'Error interno del servidor' })
  }
}