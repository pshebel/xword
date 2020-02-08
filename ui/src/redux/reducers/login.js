import * as types from '../actions/actionTypes'

const initialState = {
  user: '',
  input: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: state.input.join(),
      };
    case types.LOGIN_FORM_CHANGE:
      var newInput = state.input.slice()
      newInput[action.index] = action.value
      return {
        ...state,
        input: newInput,
      }
    case types.CHECK_LOGIN:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state;
  }
}
