import * as types from './actionTypes';

export function login() {
  return {type: types.LOGIN};
}

export function checkLogin(user) {
  return {type: types.CHECK_LOGIN, user};
}

export function loginFormChange(index, value) {
  return {type: types.LOGIN_FORM_CHANGE, index, value}
}