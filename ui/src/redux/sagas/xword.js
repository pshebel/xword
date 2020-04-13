import { put, call, takeLatest, select } from 'redux-saga/effects'
import * as actionType from '../actions/actionTypes'
import * as actions from '../actions/xword'

import * as selector from '../selectors/xword';
import { getUser } from '../selectors/login'

export function* fetchGetXword() {
  console.log("get xword")
  var responseBody = {}
  console.log("TEST ENV (3.87.2.137:8000)", process.env.API_HOST)
  try {
    const response = yield call(fetch, `http://3.87.2.137:8000/api/xword`)
    responseBody = yield response.json()
  } catch (e) {
    yield put(actions.getXwordFailure(e))
  }
  yield put(actions.getXwordSuccess(responseBody))
}


export function* fetchCheckWord() {
  // join xword data and input data
  var xword = yield select(selector.getXword)
  var input = yield select(selector.getInput)
  var user = yield select(getUser)
  var check = {
    xword_id: xword.id,
    words: xword.words.map(word => {
      let w = ""
      if (word.dir === 0) {
        w = input.slice(word.idx*xword.size,(word.idx*xword.size+xword.size)).join("")
      } else {
        for (let i=0; i < xword.size; i++) {
          let idx = i*xword.size + word.idx 
          w += input[idx]
        }
      }
      let solve = Object.assign({}, word)
      solve.input = w
      return solve
    })
  }

  let body = JSON.stringify(Object.assign({}, check))
  const response = yield call(fetch, `http://3.87.2.137:8000/api/xword/solve/puzzle`, {
    method: "PUT",
    headers: {
      "user": user,
      "Content-Type": "application/json",
    },
    body,
  })
  let responseBody = yield response.json()
  if (response.ok) {
    if (responseBody.message === "correct") {
      yield put(actions.getCheckXwordSuccess())
    } else {
      yield put(actions.getCheckXwordFailure(responseBody.message))
    }
  } else {
    yield put(actions.getCheckXwordFailure(responseBody.message))
  }
}
// export function* fetchCheckLogin() {
//   console.log("fetchCheckLogin")
//   var user = localStorage.getItem("USER")
//   console.log(user)
//   // localStoarge.getItem returns undefined as 
//   // a string if not found, absolutely insane
//   if (user !== "" && user !== "undefined" && user !== undefined && user !== null) {
//     yield put(actions.checkLoginSuccess(user))
//   } else {
//     yield put(actions.checkLoginFailure())
//   }
// }

export function* getXword() {
  yield takeLatest(actionType.GET_XWORD, fetchGetXword);
}

export function* getCheckXword() {
  yield takeLatest(actionType.GET_CHECK_XWORD, fetchCheckWord);
}

export default {
  getXword,
  getCheckXword,
};