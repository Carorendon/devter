
import Avatar from "components/Avatar"
import useTimeAgo from "/hooks/useTimeAgo"
import useDateTimeFormat from "../hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"


export default function Devit({ avatar, userName, content, createdAt, id, img }) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>·</span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <time title={createdAtFormated}>{timeAgo}</time>
            </Link>  
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
           img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        span {
          margin: 0 5px;
        }

        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}