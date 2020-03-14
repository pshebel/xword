import { combineReducers } from 'redux';
import login from './login';
import xword from './xword';

const rootReducer = combineReducers({
  login,
  xword,
});

export default rootReducer;
