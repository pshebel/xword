import React, { Component } from 'react';
import './leaderboard.css'
import PuzzleTable from './puzzleTable';
import WordsTable from './wordsTable';


class Leaderboard extends Component {
  render() {
    console.log("Leaderboard", this.props)
    return (
      <div className={'leaderboard'}>
        <h1>Leaderboard</h1>
        <div  className={'row'}>
          <div className={'col'}>
            <h3>Puzzles</h3>
          </div>
          <div className={'col'}>
            <h3>Words</h3>
          </div>
        </div>
        <div  className={'row'}>
          <div className={'col'}>
            <div className={'leader'}>
              <h4>Puzzle Champion</h4>
              <p>{this.props.puzzlesLeader.username}: {this.props.puzzlesLeader.puzzles}</p>
            </div>
          </div>
          <div className={'col'}>
            <div className={'leader'}>
              <h4>Words Champion</h4>
              <p>{this.props.wordsLeader.username}: {this.props.wordsLeader.words}</p>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col'}>
            <div className={'col-row'}>
              {<PuzzleTable data= {this.props.puzzlesUsers}/>}
            </div>
          </div>
          <div className={'col'}>
            <div className={'col-row'}>
              {<WordsTable data= {this.props.wordsUsers}/>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
