import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route} from 'react-router';
import Header from '../Header/header';
import {Redirect} from 'react-router-dom';
import XwordContainer from '../Xword/container';
import WordContainer from '../Words/container';
import LeaderboardContainer from '../Leaderboards/container';


class Main extends Component {
  render() {
    return (
      <div className="main-container">
        {this.props.username === "" && <Redirect to="/"/>}
        <Header/>
        <div>
          <Route path="/xword/play" component={XwordContainer}/>
          <Route path="/xword/leaderboard" component={LeaderboardContainer}/>
          <Route path="/xword/word" component={WordContainer}/>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => {
  return {
    username: state.login.username,
  };
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// }

export default connect(mapStateToProps, null)(Main);