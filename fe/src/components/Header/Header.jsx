import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="user">User</button>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="xword">xword</button>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="words">+word</button>
        <button onClick={(e) => this.props.handleOnClick(e.target.value)} value="boards">Leaderboards</button>
      </div>
    )
  }
}

export default Header;
