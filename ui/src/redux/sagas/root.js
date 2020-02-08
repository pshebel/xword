import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as login from './login'


export default function* root() {
  yield all([
    login.login(),
    login.checkLogin(),
  ])
  // code after all-effect
}