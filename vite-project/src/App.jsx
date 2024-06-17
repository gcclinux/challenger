import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState('Press Enter to Start!');
  const [inputsArray, setInputsArray] = useState([]);
  const [displayValue, setDisplayValue] = useState(null);

  const wordsArray = ['Go', 'Golang', 'React', 'JavaScript', 'Python' , 'Java' , 'C++' , 'C#' , 'Ruby' , 'Rust' , 'Swift' , 'Kotlin' , 'TypeScript' , 'PHP' , 'HTML' , 'CSS' , 'SQL' , 'NoSQL'];
  const lowerCaseInutValue = inputValue.toLowerCase();

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      setSubmittedValue(inputValue);
      if(wordsArray.map(word => word.toLowerCase()).includes(lowerCaseInutValue) && !inputsArray.includes(inputValue)) {
        setScore(score + 1000);
        setDisplayValue('OK');
      } else if (inputValue.trim() !== '' && !wordsArray.includes(inputValue)) {
        setDisplayValue('ERROR');
      } else if (inputValue.trim() !== '' && inputsArray.includes(inputValue)){
        setDisplayValue('DUPLICATE');
      }
      setInputsArray(prevInputsArray => [...prevInputsArray, inputValue]);
      if(countdown === 'Press Enter to Start!') {
        setCountdown(60);
      }
      setInputValue('');
    }
  }

  useEffect(() => {
    if(countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

        <label>Enter only valid programming languages!</label>
        <br /><br />
        <input
          type="text"
          style={{ width: '200px' }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          readOnly={countdown <= 0}
          autoFocus
        />
      {displayValue && (
        <p>{submittedValue} {displayValue}</p>
      )}
      </header>
    </div>
  );
}

export default App;