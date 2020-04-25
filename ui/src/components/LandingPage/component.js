import React, {Component} from 'react';
import './landingPage.css';
import ArcadeUser from './arcadeUser';
import {Redirect} from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="landing">
          <h1>XWORD</h1>
          <div className="forms">
            <div className="col">
              <h4>Username</h4>
              <input autocomplete="off" type="text" name="word" value={this.props.username} onChange={(e) => this.props.loginFormChange(e.target.value)}/>
            </div>
            <p>
              {this.props.error && 
                <div>Error: {this.props.error}</div>
              }
            </p>
            <button 
              disabled={this.props.username.length < 4 || this.props.username.length > 12}
              onClick={this.props.login} 
            >
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
