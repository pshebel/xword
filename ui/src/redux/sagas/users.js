import { put, call, takeLatest } from 'redux-saga/effects'
import * as actionType from '../actions/actionTypes'
import * as actions from '../actions/users'

export function* fetchGetUsers() {
  console.log("get users")
  var responseBody = {}
  try {
    const response = yield call(fetch, `http://54.235.226.192:8000/api/users`)
    responseBody = yield response.json()
  } catch (e) {
    yield put(actions.getUsersFailure(e))
  }
  yield put(actions.getUsersSuccess(responseBody))
}

export function* getUsers() {
  yield takeLatest(actionType.GET_USERS, fetchGetUsers);
}

export default {
  getUsers,
};