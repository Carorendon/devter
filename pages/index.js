import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import {colors} from '../styles/theme'
import Button from '../components/Button'
import Github from '../components/Icons/GitHub'
// devit
import { loginWithGitHub } from '../firebase/app'

export default function Home() {

   const handleClick = () => {
    loginWithGitHub()
      .then((result) => {
        // El usuario se autenticó exitosamente
        setUser(result.user)
        console.log('Usuario autenticado:', result.user)
      })
      .catch((error) => {
        console.error('Error al autenticar:', error)
      })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
        <img src='/Lemon.jpg' alt='logo' />
        <h1> Devter</h1>
        <h2>Talk about development with developers</h2>

         <div>  
         <Button onClick={handleClick}>
          <Github fill='#fff' width={24} height={24}/>
          Login with Github</Button>
          </div>
         
        </section> 
        </AppLayout>

      <style jsx>{`
  img {
    width: 80px;
    height: 280px;
    display: block;
    border-radius: 20%;
    margin: 0 auto;
  }

  section {
    display: grid;
    height: 100%;
    place-content: center;
    place-items: center;
    text-align: center;
  }

  h1 {
    color: #035a15;
    font-weight: 800;
    margin-bottom: 16px;
  }

  h2 {
    color: #82ee1e;
    font-weight: 600;
    margin: 0;
  }
`}</style>
    </>
  )
}