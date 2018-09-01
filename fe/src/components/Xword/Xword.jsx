import React from 'react';
import '../../index.css';

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
        key={(row*this.props.sideLength + col)}
        id={(row*this.props.sideLength + col)}
        currentValue={this.props.squares[(row*this.props.sideLength + col)][2]}
        realValue={this.props.squares[(row*this.props.sideLength + col)][3]}
        onChange={(e) => this.props.onChange(e.target.value, square)}
      />
    );
  }

  renderHelper() {
    let result = [];
    for (let row = 0; row < this.props.sideLength; row++){
      let row_result = [];
      for (let col = 0; col < this.props.sideLength; col++){
        row_result.push([row, col, '', '']);
      }
      result.push(row_result);
    }
    return result;
  }

  render() {
    const ele = (x) => x.map((square) => this.renderSquare(square));
    const rows = this.renderHelper().map((row, i) => <div key={i}className="board-row"> {ele(row)} </div>);

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Xword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: props.data,
        sideLength: props.data.words.length,
        squares: this.createSquares(props.data),
        solved: false
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        data: nextProps.data,
        sideLength: nextProps.data.words.length,
        squares: this.createSquares(nextProps.data),
        solved: false
      })
    }
  }

  createSquares(data) {
    let array = [];
    for (let i = 0; i < data.words.length; i++) {
      let word = data.words[i]
      for (let j = 0; j < data.words.length; j++) {
        array.push([i, j, '', word[j]]);
      }
    }
    return array;
  }

  handleChange(e, square) {
    console.log(e)
    // let ele = e.nativeEvent.srcElement.nextElementSibling
    // ele.focus()

    const squares = this.state.squares.slice();
    let row = square[0];
    let col = square[1];
    squares[(row*this.state.sideLength + col)][2] = e
    console.log(squares[(row*this.state.sideLength + col)][2])
    if (squares[(row*this.state.sideLength + col)][2] === squares[(row*this.state.sideLength + col)][3]) {
      console.log("correct")
    }
    // squares[(row*this.state.sideLength + col)][2] = getDir(row, col, this.state.treasure);
    //alert(squares[(i*10 + j)]);
    this.setState({
      squares: squares
    });
  }

  handleNewPuzzle = () => {
    this.setState({
      data: null,
      sideLength: 0,
      squares: null,
      solved: false
    })
    this.props.getNewXword()
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
            {...this.state}
            onChange={(e, square) => this.handleChange(e, square)}
          />
        </div>
        <div className="game-status">
          {
            !this.state.solved && this.state.data !== null &&
            <div>
              <div className="definitions">{this.state.data.definitions.map((def, i) => <div key={i}>{def}</div>)}</div>
              <button onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          }
          {
            this.state.solved &&
            <button onClick={() => this.handleNewPuzzle()}>Another One</button>
          }
        </div>
      </div>
    );
  }
}

export default Xword;
