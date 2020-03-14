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
            user={this.props.user}
            input={this.props.input}
            loggedIn={this.props.loggedIn}
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
    user: state.login.user,
    input: state.login.input,
    loggedIn: state.login.loggedIn,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    loginFormChange: (name, value) => dispatch(loginFormChange(name, value)),
    checkLogin: () => dispatch(checkLogin())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LangingPageContainer);