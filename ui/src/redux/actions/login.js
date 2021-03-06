import * as types from './actionTypes';

export function login() {
  return {type: types.LOGIN};
}

export function loginSuccess() {
  return {type: types.LOGIN_SUCCESS};
}

export function loginFailure(error) {
  return {type: types.LOGIN_FAILURE, error};
}

export function checkLogin() {
  return {type: types.CHECK_LOGIN};
}

export function checkLoginSuccess(username) {
  return {type: types.CHECK_LOGIN_SUCCESS, username};
}

export function checkLoginFailure() {
  return {type: types.CHECK_LOGIN_FAILURE}
}

export function loginFormChange(username) {
  return {type: types.LOGIN_FORM_CHANGE, username}
}