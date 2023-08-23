import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <h1 style={{marginTop:"50px"}}>Tic-Tac-Toe</h1>
      <div className="board" style={{alignContent:"center",marginLeft:"450px",marginTop:"30px"}}>
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: 3 }, (_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="status">{status}</div>
      {(winner || board.every((square) => square)) && (
        <button className="restart-button" onClick={handleRestart}>
          Restart
        </button>
      )}
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
