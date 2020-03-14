import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as login from './login'
import * as xword from './xword'


export default function* root() {
  yield all([
    login.login(),
    login.checkLogin(),
    xword.getXword(),
    xword.getCheckXword(),
  ])
  // code after all-effect
}