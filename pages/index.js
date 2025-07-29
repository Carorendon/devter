import { useEffect } from "react"
import Head from "next/head"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"


import { loginWithGitHub } from "/firebase/app"

import { useRouter } from "next/router"
import useUser, { USER_STATES } from "../hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🍋</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
        <section>
          <img src='/Lemon.jpg' alt='logo' />
          <h1>Devter</h1>
          <h2>Talk about development with developers</h2>

          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="" />}
            </div>  
        </section>
      

      <style jsx>{`
        img {
          width: 200px;
          height: 250px;
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
          margin: auto;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}