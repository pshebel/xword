import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import * as actionType from '../actions/actionTypes'
import * as actions from '../actions/words'
import { getUser } from '../selectors/login'

export function* fetchPostWord(action, args) {
  console.log("fetchPostWord", action, args)
  const user = yield select(getUser)

  console.log("TEST ENV (0.0.0.0:8000)", process.env.API_HOST)
  const body = {
    word: args.word,
    definition: args.definition,
    wordLength: args.wordLen,
  }
  const strBody = JSON.stringify(body)
  const response = yield call(fetch, `http://0.0.0.0:8000/api/word`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user": user
    },
    body: strBody,
  })
  let responseBody = yield response.json()
  if (response.ok) {
    yield put(actions.postWordSuccess())
  } else {
    yield put(actions.postWordFailure(responseBody.message))
  }
}

export function* fetchResetWord() {
  yield delay(1000)
  yield put(actions.resetWord())
}

export function* postWord(word, definition, wordLen) {
  console.log("test", word, definition, wordLen)
  yield takeLatest(actionType.POST_WORD, fetchPostWord, [word, definition, wordLen]);
}

export function* resetWord() {
  yield takeLatest(actionType.POST_WORD_SUCCESS, fetchResetWord)
  yield takeLatest(actionType.POST_WORD_FAILURE, fetchResetWord)
}

export default {
  postWord,
  resetWord,
};