import React from "react"
import PropTypes from "prop-types"

export default function Button ({children, onClick}) {
  return (
    <button onClick={onClick}>
      {children}
      <style >{`
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
        button > svg {
          margin-right: 8px;
        }
        button:hover {
          opacity: .7;
        }
      `}</style>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}