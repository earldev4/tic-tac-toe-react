/* eslint-disable react/prop-types */
import { useState } from 'react'

function Square({ value, func }) {
  return (
    <button className='w-16 h-16 text-3xl border-solid border-2 border-black bg-white font-bold cursor-pointer' onClick={func}>
      {value}
    </button>
  )
}

function Board({ xIsNext, square, onPlay }) {
  const onSquareClick = (i) => {
    if (square[i] || calculateWinner(square)) return
    const nextSquare = square.slice()
    nextSquare[i] = xIsNext ? "X" : "O"

    onPlay(nextSquare)
  }

  const winner = calculateWinner(square)
  let status = ""
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <>
      <div className='text-3xl'>{status}</div>
      <div className="grid grid-cols-3 w-48">
        <Square value={square[0]} func={() => onSquareClick(0)} />
        <Square value={square[1]} func={() => onSquareClick(1)} />
        <Square value={square[2]} func={() => onSquareClick(2)} />
        <Square value={square[3]} func={() => onSquareClick(3)} />
        <Square value={square[4]} func={() => onSquareClick(4)} />
        <Square value={square[5]} func={() => onSquareClick(5)} />
        <Square value={square[6]} func={() => onSquareClick(6)} />
        <Square value={square[7]} func={() => onSquareClick(7)} />
        <Square value={square[8]} func={() => onSquareClick(8)} />
      </div>
    </>
  )
}

function Game() {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquare = history[currentMove]

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext)
  }

  function jumpTo(move) {
    setCurrentMove(move)
    setXIsNext(move % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Go to move #" + move : "Go to game start"
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className="border-solid border-2 border-black">{description}</button>
      </li>
    )
  })

  return (
    <div className=''>
      <div className=''>
        <Board xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay} />
      </div>
      <div className=''>
        <ol>{moves}</ol>
      </div>
    </div>
  )
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Game
