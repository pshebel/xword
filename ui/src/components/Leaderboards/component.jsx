import React, { Component } from 'react';
import './leaderboard.css'

class Leaderboard extends Component {
  render() {
    console.log("Leaderboard", this.props)
    return (
      <div className={'leaderboard'}>
        <h1>Leaderboard</h1>
        <div className={'row'}>
          <div className={'col'}>
            <h3>Puzzles</h3>
            <div>
              <div className={'leader'}>
                <h4>Puzzle Champion</h4>
                <p>{this.props.puzzlesLeader.username}: {this.props.puzzlesLeader.puzzles}</p>
              </div>
              <div className={'col-row'}>
                <div className={'user-col'}>
                  {this.props.puzzlesUsers.map((user, index) => {
                    return (<div>{index+2}) {user.username}:</div>)
                  })}
                </div>
                <div className={'user-col'}>
                  {this.props.puzzlesUsers.map((user, index) => {
                    return (<div>{user.puzzles}</div>)
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={'col'}>
            <h3>Words</h3>
            <div>
              <div className={'leader'}>
                <h4>Words Champion</h4>
                <p>{this.props.wordsLeader.username}: {this.props.wordsLeader.words}</p>
              </div>
              <div className={'col-row'}>
                <div className={'user-col'}>
                  {this.props.wordsUsers.map((user, index) => {
                    return (<div>{index+2}) {user.username}:</div>)
                  })}
                </div>
                <div className={'user-col'}>
                  {this.props.wordsUsers.map((user, index) => {
                    return (<div>{user.words}</div>)
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
