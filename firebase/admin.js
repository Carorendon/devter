// firebase/admin.js - Asegúrate de que exportas 'db'
import admin from 'firebase-admin'

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: `https://${firebaseAdminConfig.projectId}.firebaseio.com`
  })
}

const db = admin.firestore() // ✅ Esto es lo que necesitas
const auth = admin.auth()

// ✅ Exportar tanto db como firestore (por compatibilidad)
export { db, auth }
export const firestore = db // Por si usas este nombre en otros archivos
export default admin