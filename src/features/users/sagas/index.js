import { call, put, takeLatest } from "redux-saga/effects";

import axios from "../../../state/axios";
import {
  FIND_ME_FAILURE,
  FIND_ME_REQUEST,
  FIND_ME_SUCCESS,
  FIND_USER_BY_USERNAME_FAILURE,
  FIND_USER_BY_USERNAME_REQUEST,
  FIND_USER_BY_USERNAME_SUCCESS
} from "../actions";

const findMeApi = () => {
  return axios.get(`/users/me`);
};

const findByUsernameApi = username => {
  return axios.get(`/users/${username}`);
};

function* findMe(action) {
  try {
    const data = yield call(findMeApi);
    yield put({ type: FIND_ME_SUCCESS, payload: data.data });
  } catch (error) {
    yield put({ type: FIND_ME_FAILURE, error });
  }
}

function* findByUsername(action) {
  try {
    const { username } = action.payload;
    const data = yield call(findByUsernameApi, username);
    yield put({ type: FIND_USER_BY_USERNAME_SUCCESS, payload: data.data });
  } catch (error) {
    yield put({ type: FIND_USER_BY_USERNAME_FAILURE, error });
  }
}

export function* watchFindMeRequest() {
  yield takeLatest(FIND_ME_REQUEST, findMe);
}

export function* watchFindByUsernameRequest() {
  yield takeLatest(FIND_USER_BY_USERNAME_REQUEST, findByUsername);
}
