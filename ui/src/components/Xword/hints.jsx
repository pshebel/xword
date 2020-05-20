import React, { Component } from 'react';
import './hints.css'

class Hints extends Component {
  renderHelper() {
    const across = []
    const down = []
    this.props.words.sort((a,b) => a.idx - b.idx).map(word => {
      if (word.dir === 0) {
        across.push(<li>{word.idx+1}: {word.definition}</li>)
      } else {
        down.push(<li>{word.idx+1}: {word.definition}</li>)
      }
    })
    const hints = []
    hints.push(<div className="sub-hint"><h2>across</h2><ul>{across}</ul></div>)
    hints.push(<div className="sub-hint"><h2>down</h2><ul>{down}</ul></div>)
    return hints
  }
  render() {
    return (
      <div className="hints">
        {this.props.solved && (
          <h1 className="solved">Solved!</h1>
        ) || (this.renderHelper())}
        <div className="error-handler">
          {this.props.error}
        </div>
        <div className="game-handler">
          {this.props.solved && (
            <button onClick={this.props.getXword}>new xword</button>
          ) || (
            <button onClick={this.props.getCheckXword}>check xword</button>
          )}
        </div>
      </div>
    )
  }
}

export default Hints;