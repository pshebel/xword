import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Xword from './components/Xword/Xword';
import User from './components/User/User';
import Leaderboards from './components/Leaderboards/Leaderboards';
import Words from './components/Words/Words';
import './index.css';


const beHost = 'http://localhost:'
const bePort = 4000
const beGetPath = '/api/xword'
const bePostPath = '/api/word'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "xword",
      data: null,
      user: null
    }
  };

  componentDidMount() {
    if (this.state.data === null) {
      this.getNewXword()
    }
    if (this.state.user === null) {
      let u = this.getUser()
      if (u === null) {
        this.setState({
          view: "user"
        })
      } else {
        this.setState({
          user: u
        })
      }
    }
  }

  handleOnClick = (e) => {
    this.setState({
      view: e
    })
  }

  getNewXword = () => {
    fetch(beHost+bePort+beGetPath, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((response) => { return response.json(); })
    .then((data) => {
      console.log(data)
      if (data.code) {
        this.setState({ data: null })
      } else {
        this.setState({ data })
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        data: null,
        view: "xword"
      })
    });
  }

  updateUser = (val) => {
    if (this.state.user !== null){
      let url = beHost+bePort+"/api/user?user="+this.state.user+"&value="+val
      
    }
  }
  postWord = (word, cb) => {
    let url = beHost+bePort+bePostPath
    console.log(this.state.user)
    if (this.state.user !== null) {
      url = url+"?user="+this.state.user
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(word)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.code)
      if (data.code === 200) {
        console.log("succesful post to db")
        return cb(200)
      } else {
        console.log("post to db failed")
        return cb(400)
      }
    })
    .catch((error) => {
      console.log(error)
      return cb(400)
    });

  }

  setUser = (user) => {
    console.log("User", user)
    localStorage.setItem("user", user)
    this.setState({ user })
  }

  getUser = () => {
    return localStorage.getItem("user")
  }

  render() {
    return (
      <div className="app">
        <Header handleOnClick={this.handleOnClick} />
        {this.state.view === "xword" && this.state.data !== null &&
            <Xword data={this.state.data} getNewXword={this.getNewXword}/>
        }
        {this.state.view === "xword" && this.state.data === null &&
            <div>No more xwords for now, but come back soon</div>
        }
        {this.state.view === "user" && <User setUser={this.setUser}/>}
        {this.state.view === "boards" && <Leaderboards />}
        {this.state.view === "words" && <Words postWord={this.postWord}/>}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
