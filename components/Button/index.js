export default function Button ({children, onClick}) {
  return (
    <button onClick={onClick}>
      {children}
      <style jsx>{`
        button {
          align-items: center;
          background: black;
          border-radius: 9999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 24px;
          transition: opacity .3s ease;
    
        }
          button > :global(svg) {
          margin-right: 8px;
      }
        button:hover {
          opacity:.7;
        }
      `}</style>
    </button>
  )
}