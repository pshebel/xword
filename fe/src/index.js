import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Xword from './components/Xword/Xword';
import User from './components/User/User';
import Leaderboards from './components/Leaderboards/Leaderboards';
import Words from './components/Words/Words';
import './index.css';


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
      this.getXword()
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

  getXword = () => {
    fetch(process.env.beHost+process.env.bePort+'/api/word', {
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

  putUser = (val, cb) => {
    if (this.state.user !== null) {
      let url = process.env.beHost+process.env.bePort+"/api/user?user="+this.state.user+"&value="+val
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
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
    return cb(400)
  }

  postWord = (word, cb) => {
    let url = process.env.beHost+process.env.bePort+'/api/word'
    console.log(url)
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

  setLocalUser = (user) => {
    console.log("User", user)
    localStorage.setItem("user", user)
    this.setState({ user })
  }

  getLocalUser = () => {
    return localStorage.getItem("user")
  }

  render() {
    return (
      <div className="app">
        <Header handleOnClick={this.handleOnClick} />
        {this.state.view === "xword" && this.state.data !== null &&
            <Xword data={this.state.data} getXword={this.getXword}/>
        }
        {this.state.view === "xword" && this.state.data === null &&
            <div>No more xwords for now, but come back soon</div>
        }
        {this.state.view === "user" && <User setLocalUser={this.setLocalUser}/>}
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
