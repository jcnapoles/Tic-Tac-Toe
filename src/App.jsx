import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './componets/Square';
import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerModal } from './componets/WinnerModal.jsx';
import { resetGameFromStorage, saveGameToStorage } from './logic/storage/index.js';

function App() { 
  const [board, setBoard] = useState(() => { 
    const boardFromStorage = window.localStorage.getItem('board');
    
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameFromStorage();
  }

  const updateBoard = (index) => {
    // no hacer nada si el cuadrado ya está ocupado
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar la partida en el local storage
    saveGameToStorage({board: newBoard, turn: newTurn});
    // comprobar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner !== null) {
      // lanzar confetti
      confetti();     
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }    
  }

  useEffect(() => {
    console.log('board', board);
  }, [board, turn, winner]);

   return (<main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset</button>
        <section className='game'>
           {
            board.map((square, index) => {
              return (
                <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}>
                  {square}
                </Square>
              )
               
            })
           }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
        <WinnerModal winner={winner} resetGame={resetGame} />
    </main>) 
}

export default App
