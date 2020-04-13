import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as actionType from '../actions/actionTypes'
import * as actions from '../actions/login'
import { getUser } from '../selectors/login'

export function* fetchLogin() {
  console.log("fetchLogin")
  const user = yield select(getUser)
  localStorage.setItem("USER", user)
  console.log("TEST ENV (10.0.3.216:8000)", process.env.API_HOST)
  const response = yield call(fetch, `10.0.3.216:8000/api/user?username=${user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
  let responseBody = yield response.json()
  if (response.ok) {
    yield put(actions.loginSuccess())
  } else {
    yield put(actions.loginFailure(responseBody.message))
  }
}

export function* fetchCheckLogin() {
  console.log("fetchCheckLogin")
  var user = localStorage.getItem("USER")
  localStorage.setItem("USER", user)
  console.log("USER: ", user)

  // localStoarge.getItem returns undefined as 
  // a string if not found, absolutely insane
  if (user !== "" 
      && user !== "undefined" 
      && user !== undefined 
      && user !== null
      && user !== "null") {
    yield put(actions.checkLoginSuccess(user))
  } else {
    yield put(actions.checkLoginFailure())
  }
}

export function* login() {
  yield takeLatest(actionType.LOGIN, fetchLogin);
}

export function* checkLogin() {
  yield takeLatest(actionType.CHECK_LOGIN, fetchCheckLogin);
}

export default {
  login,
  checkLogin,
};