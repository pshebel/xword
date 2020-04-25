import * as store from '../store/configureStore';

// export const data = (store) => store.login.user;
export function getUser(state) {
  return state.login.username
}

export default {
  // data,
  getUser,
}