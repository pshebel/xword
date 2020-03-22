import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './game.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "0:0"
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.index !== this.state.index || 
      nextProps.index !== this.props.index || 
      nextProps.direction !== this.props.direction ||
      nextProps.words.length !== this.props.words.length
    ) {
      return true
    }
    return false
  }

  componentDidUpdate() {
    if (this.refs[this.state.index] !== undefined) {
      ReactDOM.findDOMNode(this.refs[this.state.index]).focus()
    }
  }

  renderSquare(className, index, focus, value) {
    var ele = <input
      type="text"
      autoComplete="off"
      className={className}
      key={index}
      id={index}
      ref={index}
      onChange={this.props.onChange}
      onClick={this.props.onClick}
      value={value}
    />
    if (focus) {
      this.setState({
        index,
      })
    }
    return ele;
  }

  renderHelper() {
    let result = [];
    for (let row = 0; row < this.props.size; row++){
      let row_result = [];
      for (let col = 0; col < this.props.size; col++) {
        let value = this.props.input[row*this.props.size + col]
        row_result.push({x: row, y: col, value: (value) ? value : ''});
      }
      result.push(row_result);
    }
    return result;
  }

  render() {
    const ele = (x) => x.map((square, i) => {
      let className = "square "
      let focus = false
      // check direction
      if (this.props.direction === 0) {
        // check if row contains the focus
        if (this.props.index.x === square.x) {
          className += " highlight-row "
        }
      } else {
        // check if column contains the focus
        if (this.props.index.y === square.y) {
          className += " highlight-col "
        }
      }

      if (i === 0) {
        className += " first "
      } else if (i === (this.props.size - 1)) {
        className += " last "
      } else {
        className += " middle "
      }

      if (square.x === this.props.index.x && square.y === this.props.index.y) {
        className += " focus "
        focus = true
      }
      let index = JSON.stringify({
        x: square.x,
        y: square.y,
      })
      return this.renderSquare(className, index, focus, square.value)
    });
    const rows = this.renderHelper().map((row, i) => {
      if (i === 0) {
        return (
          <div key={i} className="board-row first"> {ele(row)} </div>
        )
      } else if (i === (this.props.size - 1)) {
        return (
          <div key={i} className="board-row last"> {ele(row)} </div>
        )
      } else {
        return (
          <div key={i} className="board-row middle"> {ele(row)} </div>
        )
      }
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends Component {
  onClick(id) {
    // if we click on an element that is already focused, we 
    // will change direction instead
    if (JSON.stringify(this.props.index) === id) {
      this.props.xwordDirectionChange()
    } else {
      this.props.xwordIndexChange(id)
    }
  }
  // this is to account for replacing a current value
  // if we set max length to 1 it will not trigger onChange
  onChange(value) {
    if (value.length > 1) {
      this.props.xwordElementChange(value.slice(-1))
    } else {
      this.props.xwordElementChange(value)
    }
  }

  render() {
    return (
      <div className="game">
        <Board
          input={this.props.input}
          direction={this.props.direction}
          index={this.props.index}
          words={this.props.xword.words}
          size={this.props.xword.size}
          onClick={(e) => this.onClick(e.target.id)}
          onChange={(e) => this.onChange(e.target.value)}
        />
      </div>
    )
  }
}

export default Game;