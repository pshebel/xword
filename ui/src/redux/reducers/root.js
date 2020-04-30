import { combineReducers } from 'redux';
import login from './login';
import xword from './xword';
import words from './words';
import users from './users';

const rootReducer = combineReducers({
  login,
  xword,
  words,
  users,
});

export default rootReducer;
