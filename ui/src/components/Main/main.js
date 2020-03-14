import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route} from 'react-router';
import Header from '../Header/header';
import {Redirect} from 'react-router-dom';
import XwordContainer from '../Xword/container';


class Main extends Component {
  render() {
    return (
      <div className="main-container">
        {this.props.user === "" && <Redirect to="/"/>}
        <Header/>
        <div>
          <Route path="/xword/play" component={XwordContainer}/>
          <Route path="/xword/leaderboard">leaderboard</Route>
          <Route path="/xword/word">add word</Route>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// }

export default connect(mapStateToProps, null)(Main);