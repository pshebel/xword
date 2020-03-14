import React, { Component } from 'react';
import './solved.css'

class Solved extends Component {

  render() {
    return (
      <div className="solved">
        <h1>Solved!</h1>
        <button onClick={this.props.getXword}>Play Again</button>
      </div>
    )
  }
}

export default Solved;