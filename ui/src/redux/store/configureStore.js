import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers/root'
import rootSaga from '../sagas/root'



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
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

store.runSaga = sagaMiddleware.run
store.close = () => store.dispatch(END)
store.runSaga(rootSaga)

export default store;
