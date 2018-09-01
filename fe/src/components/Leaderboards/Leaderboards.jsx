import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Leaderboards extends React.Component {

  render() {
    const data = [
      {
        rank: "1",
        user: "aaa",
        puzzles: 69
      },
      {
        rank: "2",
        user: "bbb",
        puzzles: 59
      },
      {
        rank: "3",
        user: "ccc",
        puzzles: 49
      }
    ]
    const columns = [
      {
        Header: "Rank",
        accessor: "rank"
      },
      {
        Header: "Username",
        accessor: "user"
      },
      {
        Header: "Puzzles",
        accessor: "puzzles"
      }
    ]
    return (
      <div className="boards">
        <h1>Leaderboards</h1>

        <ReactTable
          data={data}
          columns={columns}
        />
      </div>
    )
  }
}

export default Leaderboards;
