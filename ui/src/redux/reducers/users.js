import * as types from '../actions/actionTypes'

const initialState = {
  error: '',
  loading: false,
  wordsLeader: {
    username: '',
    words: 0,
  },
  wordsUsers: [],
  puzzlesLeader: {
    username: '',
    puzzles: 0
  },
  puzzlesUsers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      const users = action.users.map(u => {
        if (u.puzzles === undefined) {
          u.puzzles = 0
        }
        if (u.words === undefined) {
          u.words = 0
        }
        return u
      })
      const pu = users.slice().sort((a,b) => {
        if (a.puzzles > b.puzzles) {
          return -1
        } else if (a.puzzles === b.puzzles) {
          return 0
        }
        return 1
      })
      const wu = users.slice().sort((a,b) => {
        if (a.words > b.words) {
          return -1
        } else if (a.words === b.words) {
          return 0
        }
        return 1
      })
      return {
        ...state,
        puzzlesLeader: pu[0],
        puzzlesUsers: pu.slice(1,10),
        wordsLeader: wu[0],
        wordsUsers: wu.slice(1,10),
        loading: false,
      };
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false,
      }
    case types.GET_USERS:
      return {
        ...initialState,
        loading: true,
      }
    default:
        return state;
    }
}