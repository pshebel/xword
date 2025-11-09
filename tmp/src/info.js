import { useState, useEffect } from 'react'

// Alert Message Component
const AlertMessage = ({ children, show = true, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration])

  if (!isVisible) return null

  return (
    <div className="alert">
      {children}
    </div>
  )
}

// Clue List Component
const ClueList = ({ clues }) => {
  const across = [...clues].filter((clue) => clue.across).sort((a, b) => a.id - b.id)
  const down = [...clues].filter((clue) => !clue.across).sort((a, b) => a.id - b.id)

  // const sortedClues = [...clues].sort((a, b) => a.id - b.id)
  
  return (
    <div className="clue-section">
      <h3 className="info-header">Across</h3>
      <ol>
        {across.map(clue => (
          <li key={clue.index}>
            {clue.text}
          </li>
        ))}
      </ol>
      <h3 className="info-header">Down</h3>
      <ol>
        {down.map(clue => (
          <li key={clue.index}>
            {clue.text}
          </li>
        ))}
      </ol>
    </div>
  )
}

// Game Info Component (default export)
export default function Info({ data, success, onCheck, onReset, showMessage, messageVariant, messageText }) {
  return (
    <div className="game-info">
      {!success && data.clues && (
        <div className="clues-container">
          <ClueList clues={data.clues} />
        </div>
      )}
      
      <div className="controls">
        {success ? (
          <button onClick={onReset}>
            Next
          </button>
        ) : (
          <button onClick={onCheck}>
            Check
          </button>
        )}
      </div>
      {showMessage && (
        <AlertMessage className={"alert"} variant={messageVariant}>
          {messageText}
        </AlertMessage>
      )}
    </div>
  )
}