import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers/root'

const store = createStore(
  rootReducer,
)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/root', () => {
    const nextRootReducer = require('../reducers/root').default
    store.replaceReducer(nextRootReducer)
  })
}

const sagaMiddleware = createSagaMiddleware()
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

store.runSaga = sagaMiddleware.run
store.close = () => store.dispatch(END)

export default store;
