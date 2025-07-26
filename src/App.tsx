import React, { useState } from 'react';
import './App.css';

const BINGO_MIN = 1;
const BINGO_MAX = 90;

function getRandomNumber(available: number[]): number {
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

const App: React.FC = () => {
  const [history, setHistory] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [available, setAvailable] = useState<number[]>(
    Array.from({ length: BINGO_MAX }, (_, i) => i + BINGO_MIN)
  );

  const handleNewNumber = () => {
    if (available.length === 0) return;
    const next = getRandomNumber(available);
    setCurrent(next);
    setHistory([next, ...history]);
    setAvailable(available.filter((n) => n !== next));
  };

  const handleReset = () => {
    setHistory([]);
    setCurrent(null);
    setAvailable(Array.from({ length: BINGO_MAX }, (_, i) => i + BINGO_MIN));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bingo Number Generator</h1>
        <div className="bingo-current">
          <span>Current Number:</span>
          <div className="bingo-number">{current !== null ? current : '--'}</div>
        </div>
        <div className="bingo-controls">
          <button onClick={handleNewNumber} disabled={available.length === 0}>
            New Number
          </button>
          <button onClick={handleReset}>Reset Game</button>
        </div>
        <div className="bingo-history">
          <h2>History</h2>
          {history.length === 0 ? (
            <p>No numbers drawn yet.</p>
          ) : (
            <div className="bingo-history-list">
              {[...history].sort((a, b) => a - b).map((num, idx) => (
                <span key={idx} className="bingo-history-number">{num}</span>
              ))}
            </div>
          )}
        </div>
        {available.length === 0 && (
          <div className="bingo-finished">All numbers have been drawn!</div>
        )}
      </header>
    </div>
  );
};

export default App;
