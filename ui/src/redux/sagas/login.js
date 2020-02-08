import { put, select } from 'redux-saga/effects'
import * as actions from '../actions/login'
import { getUser } from '../selectors/login'

export function* login() {
  const user = yield select(getUser)
  localStorage.setItem("USER", user)
  yield put(actions.login())
}

export function* checkLogin() {
  var user = localStorage.getItem("USER")
  yield put(actions.checkLogin(user))
}

export function* login() {
  yield takeLatest(actionType.LOGIN, login.login());
}
export function* checkLogin() {
  yield takeLatest(actionType.CHECK_LOGIN, login.checkLogin());
}

export default {
  login,
  checkLogin,
};