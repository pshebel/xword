import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import Routes from './routes';
import store from './redux/store/configureStore';
import { Route, Switch } from 'react-router'
import LangingPageContainer from './components/LandingPage/container'
import Xword from './components/Xword/component'

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={LangingPageContainer} />
            <Route path="/xword" component={Xword} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;