import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const sideLength = 3;

const data = {
    "definitions": [
        "0 Across: a small insect.",
        "1 Across: skip you, reverse back to me, draw 2, draw 4, skip you, reverse ____ !",
        "2 Across: used to form nouns denoting a computer program or robot with a very specific function.",
        "0 Down: an aggressive or rude way of addressing a boy or man.",
        "1 Down: skip you, reverse back to me, draw 2, draw 4, skip you, reverse ____ !",
        "2 Down: you ___ this!"
    ],
    "id": "ObjectIdHex(\"5b8906853b56c7fe316c8a2d\")",
    "words": [
        "bug",
        "uno",
        "bot"
    ]
}


function Square(props) {
  return (
    <input type="text" className="square" onChange={props.onChange} maxLength="1">
      {props.value}
    </input>
  );
}

class Board extends React.Component {
  renderSquare(square) {
    let row = square[0];
    let col = square[1];
    return (
      <Square
        currentValue={this.props.squares[(row*sideLength + col)][2]}
        realValue={this.props.squares[(row*sideLength + col)][3]}
        onChange={(e) => this.props.onChange(e.target.value, square)}
      />
    );
  }

  renderHelper(){
    let result = [];
    for (let row = 0; row < sideLength; row++){
      let row_result = [];
      for (let col = 0; col < sideLength; col++){
        row_result.push([row, col, '', '']);
      }
      result.push(row_result);
    }
    return result;
  }


  render() {
    const status = 'xword';
    //const ele = (x) => x.map((square) => (square == treasure) ? this.renderSquare(square, true) : this.renderSquare(square, false));
    const ele = (x) => x.map((square) => this.renderSquare(square));
    const rows = this.renderHelper().map((row) => <div className = "board-row"> {ele(row)} </div>);

    return (
      <div>
        <div className="status">{status}</div>
          {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        data,
        squares: this.createSquares(),
        solved: false
    }
  };

  createSquares() {
    let array = [];
    for (let i = 0; i < sideLength; i++) {
      let word = data.words[i]
      for (let j = 0; j < sideLength; j++) {
        array.push([i, j, '', word[j]]);
      }
    }
    return array;
  }

  handleChange(e, square) {
   console.log(e)
   const squares = this.state.squares.slice();
   let row = square[0];
   let col = square[1];
   squares[(row*sideLength + col)][2] = e
   console.log(squares[(row*sideLength + col)][2])
   if (squares[(row*sideLength + col)][2] === squares[(row*sideLength + col)][3]) {
     console.log("correct")
   }
   // squares[(row*sideLength + col)][2] = getDir(row, col, this.state.treasure);
   //alert(squares[(i*10 + j)]);
   this.setState({
     squares: squares
   });
  }

  handleNewData() {
    const data = fetch("http://localhost:3000/api/xword").then((response) => { return response.json(); });
    this.setState({
      data
    })
  }

  handleSubmit = () => {
    let solved = true
    let squares = this.state.squares
    console.log(squares)
    for (let i = 0; i < squares.length; i++) {
      if (squares[i][2] !== squares[i][3]) {
        solved = false
        alert("not quite")
        break
      }
    }
    if (solved) {
      alert("success!")
    }
    this.setState({ solved })
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onChange={(e, square) => this.handleChange(e, square)}
          />
        </div>
        <div className="game-status">
          {
            !this.state.solved &&
            <div>
              <div>{this.state.data.definitions}</div>
              <button onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          }
          {
            this.state.solved &&
            <button onClick={this.handleSubmit}>Another One</button>
          }
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function getDir(row, col, [trow, tcol]){
  let possible = [];
  if (row === trow && col === tcol){
    return "X";
  }

  if (row > trow){
    possible.push("↑");
  }
  else if(row < trow){
    possible.push("↓");
  }

  if(col > tcol){
    possible.push("←");
  }
  else if(col < tcol){
    possible.push("→");
  }

  let index = Math.floor(Math.random()*possible.length);
  return possible[index];
}
