import * as types from './actionTypes';

export function postWord(word, definition, wordLen) {
  return {type: types.POST_WORD, word, definition, wordLen};
}

export function postWordSuccess() {
  return {type: types.POST_WORD_SUCCESS};
}

export function postWordFailure(error) {
  return {type: types.POST_WORD_FAILURE, error};
}

export function changeWord(name, value) {
  return {type: types.CHANGE_WORD, name, value}
}

export function resetWord() {
  return {type: types.RESET_WORD};
}
