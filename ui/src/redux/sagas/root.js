import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as login from './login'
import * as xword from './xword'
import * as words from './words'
import * as users from './users'


export default function* root() {
  yield all([
    login.login(),
    login.checkLogin(),
    xword.getXword(),
    xword.getCheckXword(),
    words.postWord(),
    words.resetWord(),
    users.getUsers(),
  ])
  // code after all-effect
}