import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBJPoaRv9o54IMuBrmeMzFpz8wmcVP8sug",
  authDomain: "devter-c2873.firebaseapp.com",
  projectId: "devter-c2873",
  storageBucket: "devter-c2873.firebasestorage.app",
  messagingSenderId: "142166511183",
  appId: "1:142166511183:web:d233bd919e6d757f4aa43a",
  measurementId: "G-CBLEJF5H2R",
}

// Inicializar Firebase - versión 9+
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Inicializar servicios
const auth = getAuth(app)
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebaseOnAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const listenToAuthChanges = (onChange) => {
  return firebaseOnAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}

export const addDevit = async ({ avatar, content, userId, userName }) => {
  try {
    const docRef = await addDoc(collection(db, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()), // ✅ Sintaxis correcta v9+
      likesCount: 0,
      sharedCount: 0,
    })
     console.log("Devit creado con ID: ", docRef.id)
    return docRef
  } catch (error) {
    console.error("Error al crear devit: ", error)
    throw error
  }
}

export const fetchLatestDevits = async () => {
  const querySnapshot = await getDocs(collection(db, "devits"))
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data

    const date = new Date(createdAt.seconds * 1000)
    const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)

    return {
      ...data,
      id,
      createdAt: normalizedCreatedAt,
    }
  })
}