import * as types from '../actions/actionTypes'

const initialState = {
  user: '',
  loggedIn: false,
  input: {
    first: '',
    middle: '',
    last: ''
  },
};

const checkInput = (input) => {
  if (input.first !== "" && input.middle !== "" && input.last !== "") {
    return true
  }
  return false
}
const joinInput = (input) => {
  return input.first + input.middle + input.last
}

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
        user: ''
      }
    case types.LOGIN:
      return {
        ...state,
        loggedIn: true
      }
    case types.LOGIN_FORM_CHANGE:
      var newInput = Object.assign({}, state.input);
      newInput[action.index] = action.value
      var newUser = state.user
      if (checkInput(newInput)) {
        newUser = joinInput(newInput)
        console.log("input checked", newUser)
      }
      return {
        ...state,
        input: newInput,
        user: newUser,
      }
    case types.CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
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
