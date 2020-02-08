import * as React from 'react'
import { Route } from 'react-router'
import LangingPageContainer from './components/LandingPage/container'
import XwordContainer from './components/Xword/container'
// import leaderboard from './containers/Leaderboard/'
// import word from './containers/Word'

export default (
  <Route path="/" component={LangingPageContainer}>
    <Route path="/xword" component={XwordContainer} />
    {/* <Route path="/leaderboard"
           component={leaderboard} />
    <Route path="/+word"
           component={word} /> */}
  </Route>
)
