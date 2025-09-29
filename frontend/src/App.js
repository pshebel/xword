import { useState, useEffect } from 'react';
import Game from './game';
import Info from './info';

// Main App Component
export default function App() {
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
      const response = await fetch(`${process.env.API_URL}/api/puzzle`);
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
    console.log(userHash, data.hash);
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
      {/* <div className="header">xword</div> */}
      <div className="board-container">
        <div className="game">
          <Game 
            size={data.size} 
            squares={squares} 
            onChange={handleSquareChange} 
          />
        </div>
        
        <div className="info">
          <Info 
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
    </div>
  );
}