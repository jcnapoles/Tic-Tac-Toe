import { WINNER_COMBINATIONS } from '../constants.js';

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    for (const combination of WINNER_COMBINATIONS) {
      const [a, b, c] = combination;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador, comprobar si hay empate
    if (boardToCheck.every(square => square)) {
      return false;
    } else { // si no hay ganador ni empate, devolver null para seguir jugando  
      return null;  
    } 
  }

  export const checkEndGame = (newBoard) => {
    // si no hay ganador, comprobar si hay empate
    return newBoard.every((square) => square === null);
  }