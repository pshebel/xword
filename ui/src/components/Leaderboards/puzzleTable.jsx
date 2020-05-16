import React from 'react';
import './table.css'


class PuzzleTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((user, index) => {
            let cn = ""
            if (index === this.props.data.length - 1) {
              cn = "last-row"
            }
            if (index % 2 == 0) {
              return (
                <tr className={"dark-row "+cn}>
                  <td>{index + 2}</td>
                  <td>{user.username}</td>
                  <td>{user.puzzles}</td>
                </tr>
              )
            } else {
              return (
                <tr className={"light-row "+cn}>
                  <td>{index + 2}</td>
                  <td>{user.username}</td>
                  <td>{user.puzzles}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    )
  }
}

export default PuzzleTable;
