// ✅ Importación normal en API routes (solo servidor)
import { db } from '../../../firebase/admin'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const doc = await db.collection("devits").doc(id).get()
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Devit no encontrado' })
    }
    
    const data = doc.data()
    
    const devit = {
      ...data,
      id: doc.id,
      createdAt: data.createdAt ? +data.createdAt.toDate() : Date.now(),
    }

    res.json(devit)
  } catch (error) {
    console.error('Error al obtener devit:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}