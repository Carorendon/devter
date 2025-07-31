/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react"
import Button from "components/Button"
import useUser from "hooks/useUser"
import Head from "next/head"
import Avatar from "components/Avatar"
import { getDownloadURL } from "firebase/storage" // AGREGADO: Import necesario
import { addDevit, uploadImage } from "../../../firebase/app"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload progress:', progress + '%')
      }
      
      const onError = (error) => {
        console.error("Error al subir imagen:", error)
        setDrag(DRAG_IMAGE_STATES.ERROR)
        setTask(null)
      }

      const onComplete = async () => {
        console.log("Upload completado")
        try {
          const downloadURL = await getDownloadURL(task.snapshot.ref)
          setImageUrl(downloadURL)
          setDrag(DRAG_IMAGE_STATES.COMPLETE)
        } catch (error) {
          console.error("Error obteniendo URL:", error)
          setDrag(DRAG_IMAGE_STATES.ERROR)
        }
      }

      task.on("state_changed", onProgress, onError, onComplete)

      return () => {
        task.cancel && task.cancel()
      }
    }
  }, [task]) // CORREGIDO: Faltaba cerrar el useEffect

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imageUrl, // AGREGADO: Incluir imagen en el devit
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.UPLOADING)
    const file = e.dataTransfer.files[0]
    
    if (file && file.type.startsWith('image/')) {
      console.log("Subiendo archivo:", file.name)
      const uploadTask = uploadImage(file)
      setTask(uploadTask)
    } else {
      console.error("Por favor selecciona un archivo de imagen válido")
      setDrag(DRAG_IMAGE_STATES.ERROR)
    }
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      
        <Head>
          <title>Crear un Post / SocialApp</title>
        </Head>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="¿Qué está pasando?"
              value={message}
              className={drag === DRAG_IMAGE_STATES.DRAG_OVER ? 'drag-over' : ''}
            ></textarea>
            
            {/* Mostrar estado del drag */}
            {drag === DRAG_IMAGE_STATES.UPLOADING && (
              <div className="upload-status">Subiendo imagen...</div>
            )}
            
            {drag === DRAG_IMAGE_STATES.ERROR && (
              <div className="error-status">Error al subir imagen</div>
            )}
            
            {imageUrl && (
              <section className="remove-img">
                <button 
                  type="button" 
                  onClick={() => {
                    setImageUrl(null)
                    setTask(null)
                    setDrag(DRAG_IMAGE_STATES.NONE)
                  }}
                >
                  ×
                </button>
                <img src={imageUrl} alt="Imagen adjunta" />
              </section>
            )}
            
            <div>
              <Button disabled={isButtonDisabled}>Repostear</Button>
            </div>
          </form>
        </section>
    
    
      <style jsx>{`
        .form-container {
          display: flex;
          padding: 20px;
        }

        .avatar-container {
          margin-right: 15px;
          flex-shrink: 0;
        }

        form {
          flex: 1;
        }

        div {
          padding: 15px;
        }

        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
          transition: background-color 0.2s ease;
        }

        textarea.drag-over {
          background-color: #f0f8ff;
          border: 2px dashed #0099ff;
        }

        .upload-status {
          color: #0099ff;
          font-size: 14px;
          margin: 10px 0;
        }

        .error-status {
          color: #ff4444;
          font-size: 14px;
          margin: 10px 0;
        }

        .remove-img {
          position: relative;
          margin: 15px 0;
          display: inline-block;
        }

        .remove-img button {
          position: absolute;
          top: -10px;
          right: -10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .remove-img button:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .remove-img img {
          max-width: 100%;
          max-height: 300px;
          border-radius: 10px;
          display: block;
        }
      `}</style>
    </>
  )
}