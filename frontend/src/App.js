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

// Square Component
const Square = ({ index, value, onChange }) => {
  return (
    <input 
      className="square"
      maxLength={1}
      value={value || ''}
      onChange={(e) => onChange(index, e.target.value.toUpperCase())}
    />
  );
};

// Board Component
const Board = ({ size, squares, onChange }) => {
  const renderSquare = (index) => (
    <Square 
      key={index}
      index={index}
      value={squares[index]}
      onChange={onChange}
    />
  );

  const renderRow = (rowIndex) => {
    const row = [];
    for (let col = 0; col < size; col++) {
      const squareIndex = rowIndex * size + col;
      row.push(renderSquare(squareIndex));
    }
    return (
      <div key={rowIndex} className="board-row">
        {row}
      </div>
    );
  };

  const board = [];
  for (let row = 0; row < size; row++) {
    board.push(renderRow(row));
  }

  return <div className="board">{board}</div>;
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

// Game Info Component
const GameInfo = ({ data, success, onCheck, onReset, showMessage, messageVariant, messageText }) => {
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
};

// Main Game Component
export default function CrosswordGame() {
  const [data, setData] = useState({ id: 0, size: 3, across: [], down: [], hash: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [squares, setSquares] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageVariant, setMessageVariant] = useState('info');
  const [messageText, setMessageText] = useState('');

  // Initialize squares when data changes
  useEffect(() => {
    if (data.size > 0) {
      setSquares(Array(data.size * data.size).fill(""));
    }
  }, [data.size]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://xword.io/api/puzzle');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      showAlertMessage('error', 'Failed to load puzzle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showAlertMessage = (variant, text) => {
    setMessageVariant(variant);
    setMessageText(text);
    setShowMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleSquareChange = (index, value) => {
    const newSquares = [...squares];
    newSquares[index] = value;
    setSquares(newSquares);
  };

  const handleCheck = () => {
    const userInput = squares.join("").toLowerCase();
    const userHash = btoa(userInput);

    if (userHash === data.hash) {
      setSuccess(true);
      showAlertMessage('success', 'Congratulations! You solved the puzzle!');
    } else {
      showAlertMessage('error', 'Not quite right. Keep trying!');
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setSquares([]);
    setShowMessage(false);
    fetchData();
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <div>Loading puzzle...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          Error: {error}
          <button onClick={fetchData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div class="logo">xword.io</div>
        <nav class="nav">
          <ul>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
      </div>
      <div className="board-container">
        <div className="game">
          <Board 
            size={data.size} 
            squares={squares} 
            onChange={handleSquareChange} 
          />
        </div>
        
        <div className="info">
          <GameInfo 
            data={data}
            success={success}
            onCheck={handleCheck}
            onReset={handleReset}
            showMessage={showMessage}
            messageVariant={messageVariant}
            messageText={messageText}
          />
        </div>
      </div>
 
      {/* <div className="footer"><h1></h1></div> */}
    </div>
  );
}