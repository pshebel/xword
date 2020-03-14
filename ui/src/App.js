import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import Routes from './routes';
import store from './redux/store/configureStore';
import { Route, Switch } from 'react-router'
import LangingPageContainer from './components/LandingPage/container'
import Main from './components/Main/main'

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={LangingPageContainer} />
            <Route path="/xword*" component={Main} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;