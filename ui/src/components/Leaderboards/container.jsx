import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../redux/actions/users'
import Leaderboard from './component'


class LeaderboardContainer extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    console.log("LeaderboardContainer", this.props)
    return (
      <div>
        <Leaderboard
          puzzlesLeader={this.props.puzzlesLeader}
          puzzlesUsers={this.props.puzzlesUsers}
          wordsLeader={this.props.wordsLeader}
          wordsUsers={this.props.wordsUsers}
          error={this.props.error}
        />  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzlesLeader: state.users.puzzlesLeader,
    puzzlesUsers: state.users.puzzlesUsers,
    wordsLeader: state.users.wordsLeader,
    wordsUsers: state.users.wordsUsers,
    error: state.users.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardContainer);