import { useState, useEffect } from 'react';

// Alert Message Component
const AlertMessage = ({ children, show = true, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!isVisible) return null;

  return (
    <div className="alert">
      {children}
    </div>
  );
};

// Clue List Component
const ClueList = ({ title, clues }) => {
  const sortedClues = [...clues].sort((a, b) => a.id - b.id);
  
  return (
    <div className="clue-section">
      <h3>{title}</h3>
      <ol>
        {sortedClues.map(clue => (
          <li key={clue.id}>
            {clue.text}
          </li>
        ))}
      </ol>
    </div>
  );
};

// Game Info Component (default export)
export default function Info({ data, success, onCheck, onReset, showMessage, messageVariant, messageText }) {
  return (
    <div className="game-info">
      {showMessage && (
        <AlertMessage variant={messageVariant}>
          {messageText}
        </AlertMessage>
      )}
      
      {!success && data.across && data.down && (
        <div className="clues-container">
          <ClueList title="Across" clues={data.across} />
          <ClueList title="Down" clues={data.down} />
        </div>
      )}
      
      <div className="controls">
        {success ? (
          <button onClick={onReset}>
            Next Puzzle
          </button>
        ) : (
          <button onClick={onCheck}>
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
}