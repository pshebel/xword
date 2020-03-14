import * as store from '../store/configureStore';

// export const data = (store) => store.login.user;
export function getUser(state) {
  return state.login.user
}

export default {
  // data,
  getUser,
}