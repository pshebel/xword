import * as store from '../store/configureStore';

// export const data = (store) => store.login.user;
export function getXword(state) {
  return state.xword.xword
}

export function getInput(state) {
  return state.xword.input
}

export default {
  // data,
  getInput,
  getXword
}