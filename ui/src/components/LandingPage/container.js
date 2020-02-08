import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginFormChange, login, checkLogin } from '../../redux/actions/login'
// import { login, checkLogin } from '../../redux/sagas/login'
import LandingPage from './component'

class LangingPageContainer extends Component {
 render() {
   return (
     <LandingPage
        login={this.props.login}
        loginFormChange={this.props.loginFormChange}
        checkLogin={this.props.checkLogin}
     />
   )
 } 
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
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