import React, { useState } from "react";
import "../index.css";
import Square from "./Square";
import Textblock from "./Textblock";

const Board = () => {
//function from React website that calculates winning combinations 
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  //initializing an array of 9 cells, each is initially set to null
  const initialState = ["", "", "", "", "", "", "", "", ""]; 

  //tracking game state 
  const [gameState, setGameState] = useState(initialState);

  //whose turn is it? or rather is it X's turn?
  const [xTurn, setXTurn] = useState(true);

  const onClickHandler = (index) => {
    let value = (xTurn) ? "X" : "0";
    gameState.splice(index, 1, value);
    setGameState(gameState);
    setXTurn(prevState => (!prevState)); 
  }

  const winner = calculateWinner(gameState);
  console.log(gameState)

  if (calculateWinner(gameState)){
    return <Textblock text={ winner } />
  }

  return (  
    <>
      <h1>{ (xTurn) ? `It's X's turn` : `It's 0's turn` } </h1> 
      <div className="container">  
        <table>
          <tr className="board-row">
            <td> <Square state = { gameState[0] } onClick = { () => onClickHandler(0) }/></td>
            <td className="vert"> <Square state = { gameState[1] } onClick = { () => onClickHandler(1) }/></td>
            <td> <Square state = { gameState[2] } onClick = { () => onClickHandler(2) }/> </td>
          </tr>
  
          <tr className="board-row">
            <td className="hori"> <Square state = { gameState[3] } onClick = { () => onClickHandler(3) }/> </td>
            <td className="hori-vert"> <Square state = { gameState[4] } onClick = { () => onClickHandler(4) }/> </td>
            <td className="hori"> <Square state = { gameState[5] } onClick = { () => onClickHandler(5) }/> </td>
          </tr>
  
          <tr className="board-row">
            <td><Square state = { gameState[6] } onClick = { () => onClickHandler(6) }/></td>
            <td className="vert"><Square state = { gameState[7] } onClick = { () => onClickHandler(7) }/></td>
            <td><Square state = { gameState[8] } onClick = { () => onClickHandler(8) }/></td>
          </tr>
        </table>
     
     </div>
    </>
     
  );
        
}

export default Board;