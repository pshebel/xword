import * as types from '../actions/actionTypes'

const initialState = {
  error: '',
  loading: false,
  success: false,
  word: '',
  definition: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.POST_WORD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case types.POST_WORD_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false,
      }
    case types.POST_WORD:
      return {
        ...state,
        loading: true,
      }
    case types.CHANGE_WORD:
      console.log(action)
      console.log(initialState)
      let s = Object.assign({}, state)
      s[action.name] = action.value
      console.log(s)
      return {
        ...s
      }
    case types.RESET_WORD:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: '',
        definition: '',
        word: '',
      }
    default:
        return state;
    }
}