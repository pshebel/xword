import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Leaderboards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const puzzleColumns = [
      {
        Header: "Rank",
        accessor: "rank"
      },
      {
        Header: "Username",
        accessor: "username"
      },
      {
        Header: "Puzzles",
        accessor: "puzzles"
      }
    ]
    const wordColumns = [
      {
        Header: "Rank",
        accessor: "rank"
      },
      {
        Header: "Username",
        accessor: "username"
      },
      {
        Header: "Words",
        accessor: "words"
      }
    ]
    
    return (
      <div className="boards">
        <h1>Leaderboards</h1>
        <h4>Puzzled Completed</h4>
        <ReactTable
          data={this.props.data.sort((a,b) => {
            a = a.puzzles ? a.puzzles : 0
            b = b.puzzles ? b.puzzles : 0
            if (a < b) {
              return 1
            } else if (a > b) {
              return -1
            } else {
              return 0
            }
          }).map((ele, i) => {
            return {
              username: ele.username,
              puzzles: ele.puzzles ? ele.puzzles : 0,
              rank: i
            }
          })}
          columns={puzzleColumns}
          defaultSorted={[
            {
              id: "puzzles",
              desc: true
            }
          ]}
          pageSize={5}
        />
        <h4>Words Submitted</h4>
        <ReactTable
          data={this.props.data.sort((a,b) => {
            a = a.words ? a.words : 0
            b = b.words ? b.words : 0
            if (a < b) {
              return 1
            } else if (a > b) {
              return -1
            } else {
              return 0
            }
          }).map((ele, i) => {
            return {
              username: ele.username,
              words: ele.words ? ele.words : 0,
              rank: i
            }
          })}
          columns={wordColumns}
          defaultSorted={[
            {
              id: "words",
              desc: true
            }
          ]}
          pageSize={5}
        />
      </div>
    )
  }
}

export default Leaderboards;
