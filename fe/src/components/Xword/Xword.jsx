import React from 'react';
import '../../index.css';

function Square(props) {
  return (
    <input type="text" className="square" onChange={props.onChange} onClick={props.onClick} maxLength="1">
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
        onChange={(e) => this.props.onChange(e, square)}
        onClick={(e) => this.props.onClick(e, square)}
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
    // for orientation
    // true: across
    // false: down
    this.state = {
        data: props.data,
        sideLength: props.data.words.length,
        squares: this.createSquares(props.data),
        solved: false,
        orientation: true,
        focus: 0
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
    console.log(Object.values(e), Object.keys(e))
    if (e.target.value !== "") {
      let ele = e.currentTarget.nextElementSibling
      console.log(ele)
      if (ele !== null) {
        ele.focus()
      } else {
        ele = e.currentTarget.parentElement.nextElementSibling

        console.log(ele)
        if (ele !== null) {
          ele.firstElementChild.focus()
        } else {
          // TODO
        }
      }
    }

    const squares = this.state.squares.slice();
    let row = square[0];
    let col = square[1];


    squares[(row*this.state.sideLength + col)][2] = e.target.value.toLowerCase()
    this.setState({
      squares: squares
    });
  }

  handleClick(square) {
    let row = square[0];
    let col = square[1];

    this.setState({
      orientation: !this.state.orientation,
      focus: row*this.props.sideLength + col
    })
  }

  handleNewPuzzle = () => {
    this.setState({
      data: null,
      sideLength: 0,
      squares: null,
      solved: false
    })

    this.props.getXword()
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
      this.props.putUser("puzzles", ((res) => {
        console.log("made it to cb", res)
        if (res === 200) {
          alert("successfully update user")
        } else {
          alert("failed to update user")
        }
      }))
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
            onClick={(square) => this.handleClick(square)}
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
