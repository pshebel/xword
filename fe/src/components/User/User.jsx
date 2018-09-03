import React from 'react';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: ["", "", ""],
      words: 0,
      puzzles: 0
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

  handleSubmit = () => {
    let u = this.state.user.join("")
    this.props.getUser(u, ((res) => {
      if (res === null) {
        this.props.postUser(u, ((res) => {
          if (res === 200) {
            alert("added new user")
          } else {
            alert("failed to create exists")
          }
        }))
      } else {
        alert("user exists", res)
      }
    }))
  }

  render() {
    return (
      <div>
        <h1>User Profile</h1>
        <div >
          <input className="user" id={0} key={0} value={this.state.user[0]} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}/>
          <input className="user" id={1} key={1} value={this.state.user[1]} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}/>
          <input className="user" id={2} key={2} value={this.state.user[2]} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}/>
        </div>
        <input type="button" onClick={this.handleSubmit} value="Check"/>
      </div>
    )
  }
}

export default User;
