import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const wordsArray = ['Go', 'Golang', 'React', 'JavaScript', 'Python' , 'Java' , 'C++' , 'C#' , 'Ruby' , 'Rust' , 'Swift' , 'Kotlin' , 'TypeScript' , 'PHP' , 'HTML' , 'CSS' , 'SQL' , 'NoSQL'];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <label>Enter valid programming languages</label>
        <br />
        <input
          type="text"
          style={{ width: '200px' }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        {wordsArray.includes(inputValue) ? <p>{inputValue} OK</p> : <p>{inputValue} Incorrect</p>}

      </header>
    </div>
  );
}

export default App;