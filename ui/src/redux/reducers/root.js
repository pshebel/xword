import { combineReducers } from 'redux';
import login from './login';
import xword from './xword';
import words from './words';

const rootReducer = combineReducers({
  login,
  xword,
  words,
});

export default rootReducer;
