import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState("Press Enter to Start!");
  const [inputsArray, setInputsArray] = useState([]);
  const [displayValue, setDisplayValue] = useState(null);

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
  ];
  const lowerCaseInutValue = inputValue.toLowerCase();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSubmittedValue(inputValue);
      if (
        wordsArray
          .map((word) => word.toLowerCase())
          .includes(lowerCaseInutValue) &&
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

  useEffect(() => {
    let timer;
    if (typeof countdown === "number" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Handle countdown reaching 0
      setDisplayValue(`Time's Up! Your score: ${score}`);
    }
    return () => clearTimeout(timer);
  }, [countdown, score]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ flex: 8, padding: "20px" }}>
        {/* Left panel content */}
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Challenger App</h1>
          <header className="App-header">
            <h2>Programming Languages</h2>
            <p>Countdown: {countdown}</p>

            <p>Score: {score}</p>

            <label>Enter only valid programming languages!</label>
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
          </header>
        </div>
      </div>
      <div style={{ flex: 2, padding: "10px", borderLeft: "5px solid black", height: "50vh" }}>
        {/* Right panel content */}
        {typeof countdown === "number" ? (
          <>
            <p>Countdown: {countdown}</p>
            <p>Score: {score}</p>
          </>
        ) : (
          <p><i>Enter as many programming languages you know until the time runs out!</i></p>
        )}
      </div>
    </div>
  );
}

export default App;
