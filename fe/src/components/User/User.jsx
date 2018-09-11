import React from 'react';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      view: "create",
      username: "",
      words: 0,
      puzzles: 0
    }
  }

  componentDidMount() {
    if (this.state.username === "") {
      let u = this.props.getLocalUser()
      if (u !== null) {
        this.props.getUser(u, ((res) => {
          if (res !== null) {
            this.setState({
              view: "view",
              username: res.username,
              puzzles: res.puzzles,
              words: res.words
            })
          }
        }))
      }
    }
  }

  handleChange = (e) => {
    let ele = e.nativeEvent.srcElement.nextElementSibling
    if (e.target.value !== "" && ele !== null) {
      ele.focus()
    }

    let newUser = this.state.username.slice()
    let index = parseInt(e.target.id, 10)
    newUser = newUser.substr(0, index) + e.target.value + newUser.substr(index)

    this.setState({
      username: newUser
    })

  }

  handleSubmit = () => {
    this.props.getUser(this.state.username, ((res) => {
      if (res === null) {
        this.props.postUser(this.state.username, ((res) => {
          if (res === 200) {
            alert("added new user")
            this.setState({
              view: "view"
            })
          } else {
            alert("failed to create exists")
          }
        }))
      } else {
        alert("user exists", res)
        this.setState({
          view: "view",
          username: res.username,
          puzzles: res.puzzles,
          words: res.words
        })
      }
    }))
    this.props.setLocalUser(this.state.username)
  }

  handleSwitch = () => {
    this.setState({
      "view": "create",
      "username": "",
      "puzzles": 0,
      "words": 0
    })
  }

  renderCreateUser() {
    return (
      <div>
        <input className="user" id={0} key={0} value={this.state.username.charAt(0)} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}/>
        <input className="user" id={1} key={1} value={this.state.username.charAt(1)} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}/>
        <input className="user" id={2} key={2} value={this.state.username.charAt(2)} type="text" maxLength={1} onChange={(e) => this.handleChange(e)}/>
        <input type="button" onClick={this.handleSubmit} value="Check"/>
      </div>
    )
  }

  renderViewUser() {
    return (
      <div>
        <div>
          <h4>Username</h4>
          {this.state.username}
        </div>
        <div>
          <h4>Puzzles</h4>
          {this.state.puzzles}
        </div>
        <div>
          <h4>Words</h4>
          {this.state.words}
        </div>
        <input type="button" onClick={this.handleSwitch} value="Switch Users"/>
      </div>
    )
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>User Profile</h1>
        <div >
          {this.state.view === "create" && this.renderCreateUser()}
          {this.state.view === "view"  && this.renderViewUser()}
        </div>

      </div>
    )
  }
}

export default User;
