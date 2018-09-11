import React from 'react';
import '../../index.css';

class Header extends React.Component {

  render() {
    return (
      <div>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="xword">xword</button>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="words">+word</button>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="user">user</button>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="boards">leaderboards</button>
      </div>
    )
  }
}

export default Header;
