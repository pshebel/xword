import React from 'react';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ui: this.userInput(),
      user: ["-", "-", "-"]
    }
  }

  handleChange = (e) => {
    let ele = e.nativeEvent.srcElement.nextElementSibling
    if (e.target.value !== "" && ele !== null) {
      ele.focus()
    }

    let newUser = this.state.user.slice()
    newUser[parseInt(e.target.id, 10)] = e.target.value
    this.setState({
      user: newUser
    })

  }

  userInput = () => {
    let u = []
    for (let i = 0; i < 3; i++) {
      u.push(<input className="user" id={i} key={i} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}></input>)
    }
    return u
  }

  render() {
    return (
      <div>
        <h1>User Profile</h1>
        <div >
          {
            this.state.ui.map((e) => {
              return e
            })
          }
        </div>
        <button onClick={() => this.props.setLocalUser((this.state.user.join("")))}>Check</button>
      </div>
    )
  }
}

export default User;
