import * as types from './actionTypes';

export function getUsers() {
  return {type: types.GET_USERS};
}

export function getUsersSuccess(users) {
  return {type: types.GET_USERS_SUCCESS, users};
}

export function getUsersFailure(error) {
  return {type: types.GET_USERS_FAILURE, error};
}