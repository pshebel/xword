import React, {Component} from 'react';
import './landingPage.css';
import ArcadeUser from './arcadeUser';
import {Redirect} from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        {false && <Redirect to="/xword"/>}
        <div className="landing">
          <h1>XWORD</h1>
          <ArcadeUser 
             login={this.props.login}
             loginFormChange={this.props.loginFormChange}
          />
        </div>
      </div>
    )
  }
}

export default LandingPage;
