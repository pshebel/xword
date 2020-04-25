import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginFormChange, login, checkLogin } from '../../redux/actions/login'
// import { login, checkLogin } from '../../redux/sagas/login'
import LandingPage from './component'
import {Redirect} from 'react-router-dom';


class LangingPageContainer extends Component {
  componentDidMount() {
    this.props.checkLogin()
  }

  render() {
    return (
      <div>
        {this.props.loggedIn && <Redirect to="/xword/play"/>
        || (
          <LandingPage
            username={this.props.username}
            loggedIn={this.props.loggedIn}
            error={this.props.error}
            login={this.props.login}
            loginFormChange={this.props.loginFormChange}
            checkLogin={this.props.checkLogin}
          />  
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    loggedIn: state.login.loggedIn,
    error: state.login.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    loginFormChange: (username) => dispatch(loginFormChange(username)),
    checkLogin: () => dispatch(checkLogin())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LangingPageContainer);