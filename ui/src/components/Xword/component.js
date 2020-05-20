import React, { Component } from 'react';
import Game from './game'
import Hints from './hints'
import './component.css'

class Xword extends Component {
  render() {
    return (
      <div >
          <div className="game-container">
            <Game
              xword={this.props.xword.xword}
              input={this.props.xword.input}
              index={this.props.xword.index}
              direction={this.props.xword.direction}
              xwordElementChange={this.props.xwordElementChange}
              xwordIndexChange={this.props.xwordIndexChange}
              xwordDirectionChange={this.props.xwordDirectionChange}
            />
            <Hints
              words={this.props.xword.xword.words}
              solved={this.props.xword.solved}
              getXword={this.props.getXword}
              getCheckXword={this.props.getCheckXword}
              error={this.props.xword.error}
            />
          </div>
        
      </div>
    )
  }
}

export default Xword;
