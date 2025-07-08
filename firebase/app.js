import { initializeApp } from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyBJPoaRv9o54IMuBrmeMzFpz8wmcVP8sug",
  authDomain: "devter-c2873.firebaseapp.com",
  projectId: "devter-c2873",
  storageBucket: "devter-c2873.firebasestorage.app",
  messagingSenderId: "142166511183",
  appId: "1:142166511183:web:d233bd919e6d757f4aa43a",
  measurementId: "G-CBLEJF5H2R"
};

!
  firebase.initializeApp(firebaseConfig)



export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}