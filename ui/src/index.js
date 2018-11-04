import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Xword from './components/Xword/Xword';
import User from './components/User/User';
import Leaderboards from './components/Leaderboards/Leaderboards';
import Words from './components/Words/Words';
import './index.css';

const API_HOST = "http://localhost:4000"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "xword",
      data: null,
      user: null,
      leaderboard: []
    }
  };

  componentDidMount() {
    if (this.state.data === null) {
      this.getXword()
    }
    if (this.state.leaderboard === []) {
      this.getUsers()
    }
  }

  // xword functions
  getXword = () => {
    fetch(API_HOST+'/api/xword', {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((response) => {
      return response.json();
    })
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

  // user functions
  getUser = (username, cb) => {
    let url = API_HOST+"/api/user?username="+username
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      if (data.code) {
        this.setState({ user: null })
        return cb(null)
      } else {
        this.setState({ user: data })
        return cb(data)
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({ user: null })
      return cb(null)
    })
  }

  postUser = (username, cb) => {
    let url = API_HOST+"/api/user?username="+username
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
    return cb(400)
  }

  putUser = (val, cb) => {
    let username = this.getLocalUser()
    if (username!== null) {
      let url = API_HOST+"/api/user?username="+username+"&value="+val
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.code === 200) {
          console.log("succesful post to db")
        } else {
          console.log("post to db failed")
        }
        return cb(data.code)
      })
      .catch((error) => {
        console.log(error)
        return cb(400)
      });
    } else {
      return cb(400)
    }
  }

  // Users functions
  getUsers = () => {
    let url = API_HOST+"/api/users"
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data)
      if (!data.code) {
        this.setState({
          leaderboard: data
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // word functions
  postWord = (word, cb) => {
    let url = API_HOST+'/api/words'
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

  // localStorage
  setLocalUser = (user) => {
    console.log("User", user)
    localStorage.setItem("user", user)
    this.setState({ user })
  }

  getLocalUser = () => {
    return localStorage.getItem("user")
  }

  handleOnClick = (e) => {
    this.setState({
      view: e
    })
  }

  render() {
    return (
      <div className="app">
        <h1>xword</h1>
        <Header handleOnClick={this.handleOnClick} />
        {this.state.view === "xword" && this.state.data !== null &&
            <Xword data={this.state.data} getXword={this.getXword} putUser={this.putUser}/>
        }
        {this.state.view === "xword" && this.state.data === null &&
            <div>No more xwords for now, but come back soon</div>
        }
        {this.state.view === "user" && <User setLocalUser={this.setLocalUser} getLocalUser={this.getLocalUser} getUser={this.getUser} postUser={this.postUser}/>}
        {this.state.view === "boards" && <Leaderboards data={this.state.leaderboard} getUsers={this.getUsers}/>}
        {this.state.view === "words" && <Words postWord={this.postWord} putUser={this.putUser}/>}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
