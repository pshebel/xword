import React, {Component} from 'react';
import './landingPage.css';
import ArcadeUser from './arcadeUser';
import {Redirect} from 'react-router-dom';

class LandingPage extends Component {
  render() {
    console.log("LANDING PAGE", this.props)
    return (
      <div className="container">
        <div className="landing">
          <h1>XWORD</h1>
          <p>{this.props.login.error}</p>
          <ArcadeUser
            user={this.props.user}
            input={this.props.input}
            login={this.props.login}
            loginFormChange={this.props.loginFormChange}
          />
        </div>
      </div>
    )
  }
}

export default LandingPage;
