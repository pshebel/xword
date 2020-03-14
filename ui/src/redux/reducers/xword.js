import * as types from '../actions/actionTypes'

const initialState = {
  error: '',
  loading: false,
  index: {
    x: 0,
    y: 0,
  },
  // 0: Horizontal
  // 1: Vertical
  direction: 0,
  input: [],
  solved: false,
  xword: {
    id: '',
    size: '',
    words: [],
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_XWORD_SUCCESS:
      return {
        ...state,
        xword: action.xword,
        loading: false,
      };
    case types.GET_XWORD_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false,
      }
    case types.GET_XWORD:
      return {
        ...initialState,
        loading: true,
      }
    case types.GET_CHECK_XWORD_SUCCESS:
      return {
        ...state,
        solved: true,
      }
    case types.XWORD_ELEMENT_CHANGE:
      // update input array
      const newInput = state.input.slice()
      const index = state.index.x * state.xword.size + state.index.y
      newInput[index] = action.value
      // end of puzzle
      let newIndex = Object.assign({}, state.index)
      // set focus
      if (action.value !== "") {
        if (state.index.x === (state.xword.size - 1) && state.index.y === (state.xword.size - 1)) {
          newIndex = {
            x: 0,
            y: 0,
          }
        } else if (state.direction === 0) {
          if (state.index.y === (state.xword.size - 1)) {
            newIndex = {
              x: state.index.x + 1,
              y: 0,
            }
          } else {
            newIndex = {
              x: state.index.x,
              y: state.index.y + 1,
            }
          }
        } else {
          if (state.index.x === (state.xword.size - 1)) {
            newIndex = {
              x: 0,
              y: state.index.y + 1,
            }
          } else {
            newIndex = {
              x: state.index.x + 1,
              y: state.index.y,
            }
          }
        }
      }
      
      return {
        ...state,
        input: newInput,
        index: Object.assign({}, newIndex),
      }
    case types.XWORD_INDEX_CHANGE:
      return {
        ...state,
        index: Object.assign({}, JSON.parse(action.id))
      }
    case types.XWORD_DIRECTION_CHANGE:
      return {
        ...state,
        direction: (state.direction === 0) ? 1 : 0,
      }
    default:
        return state;
    }
}