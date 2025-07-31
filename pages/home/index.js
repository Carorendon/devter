import { useEffect, useState } from "react"
import Devit from "@/components/Devit"
import useUser from "@/hooks/useUser.js"
import { fetchLatestDevits } from "@/firebase/app"
import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"
import Head from "next/head"
import { listenLatestDevits } from "/firebase/app"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ createdAt, img, id, userName, avatar, content, userId}) => (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                img={img}
                key={id}
                content={content}
                userName={userName}
                userId={userId}
                
              />
            )
          )}
        </section>
        <nav>
          <Link href="/search" className="nav-link">
            <Search width={30} height={30} stroke="#09f" />
          </Link>

          <Link href="/home" className="nav-link">
            <Home width={30} height={30} stroke="#09f" />
          </Link>

          <Link href="/compose/tweet" className="nav-link">
            <Create width={30} height={30} stroke="#09f" />
          </Link>
        </nav>
      

      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        section {
          flex: 1;
          padding: 10px 15px;
          
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
         
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: aboslute fixed;
          width: 100%; /* Cambiado de 100% a 100vw */
          left: 0; /* Asegura que esté alineado al borde izquierdo */
          right: 0; /* Asegura que no se pase */
          justify-content: space-around;
          z-index: 1000;
          padding: 0 10px;
}

          
          
        }

        .nav-link {
          align-items: center;
          display: flex;
          flex: 1;
          height: 100%;
          justify-content: center;
        }

        .nav-link:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;

        }
        

        .nav-link:hover :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}