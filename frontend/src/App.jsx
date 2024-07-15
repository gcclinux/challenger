/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Serve the frontend Panel with the leaderboard
function Panel({ message, score, userName }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/scores')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Check if the response is JSON before attempting to parse it
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        return response.text().then(text => {
          throw new Error(`Expected JSON, but got text: ${text}`);
        });
      }
      return response.json(); // If JSON, parse it directly
    })
    .then(data => {
      console.log('Fetched scores:', data);
      setScores(data);
    })
    .catch(error => console.error('Error fetching scores:', error));
  }, []);

  return (
    // Display the leaderboard panel content
    <div className="panel" style={{ textAlign: "left" }}>
      <p>{message}</p>
      {userName && score !== 0 && <p style={{ color: "red" }}>{userName} ({score})</p>}
      <div>
          {scores.map((item, index) => (
            <p key={index} style={{ fontSize: "12px", fontWeight: "normal", color: "blue" }}>{item.userName} ({item.score})</p>
          ))}
      </div>
    </div>
  );
}

function App() {
  const [message] = useState("~ LEADERBOARD ~");
  const [startmsg, setStartMsg] = useState(
    "Maximize your score by entering valid programming languages before the countdown ends"
  );
  const [totalScore, setTotalScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState("Press Enter to Start!");
  const [inputsArray, setInputsArray] = useState([]);
  const [displayValue, setDisplayValue] = useState(null);
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  const wordsArray = [
    "Go",
    "Golang",
    "React",
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "Rust",
    "Swift",
    "Kotlin",
    "TypeScript",
    "PHP",
    "HTML",
    "CSS",
    "SQL",
    "NoSQL",
    "MongoDB",
    "PostgreSQL",
    "Vite",
  ];

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSubmittedValue(inputValue);
      if (
        wordsArray.includes(inputValue) &&
        !inputsArray.includes(inputValue)
      ) {
        setScore(score + 1000);
        setDisplayValue("OK");
      } else if (inputValue.trim() !== "" && !wordsArray.includes(inputValue)) {
        setDisplayValue("ERROR");
      } else if (inputValue.trim() !== "" && inputsArray.includes(inputValue)) {
        setDisplayValue("DUPLICATE");
      }
      setInputsArray((prevInputsArray) => [...prevInputsArray, inputValue]);
      if (countdown === "Press Enter to Start!") {
        setCountdown(60);
      }
      setInputValue("");
    }
  };

  const handleNameSubmit = async (e) => {
    const newName = e.target.value; 
    setUserName(newName); // Update userName with the input
    setShowNameInput(false); // Hide the input popup

    await handleSubmit(newName, totalScore);
  };


  // Function to handle the submission of userName and totalScore
  const handleSubmit = async (name, score) => {
    try {
      const response = await fetch('/api/append', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: name, score }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.message); // Handle success response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setTotalScore(score);
      setStartMsg("Game Over! F5 to Restart!");
      setShowNameInput(true);
    }
  }, [countdown, score]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <header className="App-header">
        <h1>Programming Languages</h1>
        <p>Countdown: {countdown}</p>

        <p>Score: {score}</p>

        <label>{startmsg}</label>
        <br />
        <br />
        <input
          type="text"
          style={{ width: "200px" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          readOnly={countdown <= 0}
          autoFocus
        />
        {displayValue && (
          <p>
            {submittedValue} {displayValue}
          </p>
        )}

        {showNameInput && (
          <div
            style={{
              position: "fixed", // Use fixed positioning to cover the whole screen
              top: 0,
              left: 0,
              width: "100%", // Cover the full width
              height: "100%", // Cover the full height
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
              display: "flex",
              justifyContent: "center", // Center children horizontally
              alignItems: "center", // Center children vertically
              zIndex: 1000, // Ensure it's on top of other content
            }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: "white", // Background for the input area
                borderRadius: "5px", // Optional: rounded corners for the input area
              }}
            >
              <input
                type="text"
                placeholder="Enter your name"
                onBlur={handleNameSubmit} // Handle submission on input blur
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleNameSubmit(e);
                  }
                }} // Handle submission on Enter key press
                autoFocus
                style={{
                  fontSize: "16px", // Larger font size for better readability
                  padding: "10px", // Padding for the input field
                  width: "300px", // Set a fixed width for the input
                  borderRadius: "5px", // Optional: rounded corners for the input field
                }}
              />
            </div>
          </div>
        )}
      </header>
      <Panel message={message} userName={userName} score={totalScore} />
      
    </div>
  );
}

export default App;
