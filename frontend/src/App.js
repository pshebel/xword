import { useState, useEffect } from 'react';
import Game from './game';
import Info from './info';
import Success from './success';

// Main App Component
export default function App() {
  const [data, setData] = useState({ id: 0, size: 3, across: [], down: [], block: [] });
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
    setData({ id: 0, size: 3, across: [], down: [], block: [] });
    setSquares([]);

    try {
      const response = await fetch(`${process.env.API_URL}/api/puzzle`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      let tmp = Array(result.size * result.size).fill("")
      // console.log(result.block)
      result.block.forEach((b) => {
        // console.log("setting ", b, " to *")
        tmp[b] = "*"
      })
      setSquares(tmp)
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

  const handleCheck = async () => {
    console.log("checking answer")
    const userInput = {}
    // todo: the squares block elements will occasionally be empty instead of *
    let tmp = squares.slice()
    data.block.forEach((b) => {
        if (b !== "*") {
          console.log("BUG STILL EXISTS")
        }
        // console.log("setting ", b, " to *")
        tmp[b] = "*"
      })
    
    for (let i=0;i<data.size;i++){
      userInput[i] = tmp.slice(i*data.size, (i+1)*data.size).join("").toLowerCase();
    }
    const req = {id: data.id, words: userInput}
    try {
      const response = await fetch(`${process.env.API_URL}/api/check`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        showAlertMessage('success', 'Congratulations! You solved the puzzle!');
        setSuccess(true);
      } else {
        showAlertMessage('error', 'Not quite right. Keep trying!');
      }
    } catch (err) {
      setError(err.message);
      showAlertMessage('error', 'Failed to load puzzle. Please try again.');
    }
    // const userHash = btoa(userInput);
    // console.log(userHash, data.hash);
    // if (userHash === data.hash) {
    //   setSuccess(true);
    //   showAlertMessage('success', 'Congratulations! You solved the puzzle!');
    // } else {
    //   showAlertMessage('error', 'Not quite right. Keep trying!');
    // }
  };

  const handleReset = () => {
    setSuccess(false);
    setSquares([]);
    setData({ id: 0, size: 3, across: [], down: [], block: [] });
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
      </div>
      {success ? (
        <Success onReset={handleReset} />
      ):(
        <div className="board-container">
          <div className="game">
            <Game 
              size={data.size} 
              block={data.block}
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
      )}
      
      <div className="footer">
        <div className="footer-container">
          <span class="footer-text">Contact Me: phil.shebel@gmail.com</span>
          <span class="footer-text">Last Updated: {}</span>
          <span class="footer-text">Version: {}</span>
        </div>
      </div>
    </div>
  );
}