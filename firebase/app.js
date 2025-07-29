import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, Timestamp, doc , orderBy, query, limit, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'


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

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate()
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

export const listenLatestDevits = (callback) => {
  const q = query(
    collection(db, "devits"),
    orderBy("createdAt", "desc"),
    limit(20)
  )
  
  return onSnapshot(q, (snapshot) => {
    const newDevits = snapshot.docs.map(mapDevitFromFirebaseToDevitObject)
    callback(newDevits)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}

export const addDevit = async ({ avatar, content, userId, img, userName }) => {
  try {
    const docRef = await addDoc(collection(db, "devits"), {
      avatar,
      content,
      img,
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
  const devitsCollection = collection(db, "devits")
  const q = query(devitsCollection, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const {createdAt} = data

    return {
      ...data,
      id,
      createdAt: +createdAt.toDate()
      
    }
  })
}

export const uploadImage = (file) => {
  const storage = getStorage()
  const storageRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(storageRef, file)
  
  return task
}