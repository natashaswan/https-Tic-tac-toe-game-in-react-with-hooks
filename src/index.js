
import React from 'react';
import ReactDOM from 'react-dom';
// importing the styling sheet
import './index.css';

//Creating clickable buttons for the game-board
function Square(props) {
  return (
      <button 
        className="square" 
        onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

//Creating a board and making the buttons (i.e. squares) partof it

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
     />
    );
  }

  //Creating a table with three rows and three squares in each row

  render() {
    return (
      <table>
        <tr className="board-row">
          <td>  {this.renderSquare(0)} </td>
          <td className="vert">  {this.renderSquare(1)} </td>
          <td>  {this.renderSquare(2)} </td>
        </tr>

        <tr className="board-row">
          <td className="hori"> {this.renderSquare(3)} </td>
          <td className="hori-vert">  {this.renderSquare(4)} </td>
          <td className="hori"> {this.renderSquare(5)} </td>
        </tr>

        <tr className="board-row">
          <td>{this.renderSquare(6)}</td>
          <td className="vert"> {this.renderSquare(7)} </td>
          <td>{this.renderSquare(8)}</td>
        </tr>
      </table>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
        squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  //The function administers the moves and adds each move to the history
  handleClick(i) {
    const history = this.state.history.slice(0, 
      this.state.stepNumber + 1);
    const current = 
    history[history.length - 1];
    const squares = 
    current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
        squares: squares
        }
    ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  //This is to check whose move it is X's or O's
  jumpTo(step) {
    this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
  }

  //Printing out moves' time-travel history after each move
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move)=> {
      const desc = move ?
      'CLICK TO MOVE  #' + move :
      'GO BACK TO GAME START' ;
      return (
        <li key={move}> 
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    //Text above the board,indicates whose turn it is and prints a message when X or O win
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
    }
    //All main divs with assigned css classes
    return (
    <div>
      <div className="titleBox">
        <h1 className="title"> 
        TIC-TAC-TOE GAME
        </h1>
      </div>

      <div className="game-info">
          <div>{status}</div>
      </div>

      <div className="game">
        <div className="moves"><ul>{moves}</ul></div>

        <div className="game-board">
             <Board 
            squares={current.squares}
            onClick={i => this.handleClick(i)}
             />
        </div>
      </div>

    </div>
            
    );
  }
}
// ========================================
ReactDOM.render(
  <Game />, document.getElementById('root')
);
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







