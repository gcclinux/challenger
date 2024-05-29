import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState('Press Enter to Start!');
  const [inputsArray, setInputsArray] = useState([]);
  const [displayValue, setDisplayValue] = useState(null);

  const wordsArray = ['Go', 'Golang', 'React', 'JavaScript', 'Python' , 'Java' , 'C++' , 'C#' , 'Ruby' , 'Rust' , 'Swift' , 'Kotlin' , 'TypeScript' , 'PHP' , 'HTML' , 'CSS' , 'SQL' , 'NoSQL'];

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      setSubmittedValue(inputValue);
      if(wordsArray.includes(inputValue) && !inputsArray.includes(inputValue)) {
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
      <header className="App-header">
        <h1>Programming Languages</h1>
        <p>Countdown: {countdown}</p>
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>Score: {score}</p>

        <label>Enter only valid programming languages!</label>
        <br />
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