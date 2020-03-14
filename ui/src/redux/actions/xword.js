import * as types from './actionTypes';

export function getXword() {
  return {type: types.GET_XWORD};
}

export function getXwordSuccess(xword) {
  return {type: types.GET_XWORD_SUCCESS, xword};
}

export function getXwordFailure(error) {
  return {type: types.GET_XWORD_FAILURE, error};
}

export function getCheckXword() {
  return {type: types.GET_CHECK_XWORD};
}

export function getCheckXwordSuccess() {
  return {type: types.GET_CHECK_XWORD_SUCCESS};
}

export function getCheckXwordFailure(error) {
  return {type: types.GET_CHECK_XWORD_FAILURE, error}
}

export function xwordElementChange(value) {
  return {type: types.XWORD_ELEMENT_CHANGE, value}
}

export function xwordIndexChange(id) {
  return {type: types.XWORD_INDEX_CHANGE, id}
}

export function xwordDirectionChange() {
  return {type: types.XWORD_DIRECTION_CHANGE}
}