import * as types from '../actions/actionTypes'

const initialState = {
  username: '',
  loggedIn: false,
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        error: action.error,
        username: '',
      }
    case types.LOGIN:
      return {
        ...state,
        loggedIn: true
      }
    case types.LOGIN_FORM_CHANGE:
      return {
        ...state,
        username: action.username,
      }
    case types.CHECK_LOGIN_SUCCESS:
      console.log("CHECK LOGIN", action.username)
      return {
        ...state,
        loggedIn: true,
        username: action.username,
      }
    case types.CHECK_LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state;
  }
}
