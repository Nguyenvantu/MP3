import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import { loadUserData } from "../../helpers/localStorage";
// import axios from "axios";
import actions from "./actions";
import jwtDecode from "jwt-decode";
import { message } from "antd";

function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function*(payload) {
    try {
      const { data, error_code } = yield call(() =>
        client().post(`${apiUrl}/user/login`, {
          ...payload.data
        })
      );
      // console.log()
      if (error_code === 0) {
        if (data.active) {
          localStorage.setItem("user", JSON.stringify(data));
          return yield put({
            type: actions.LOGIN_SUCCESS,
            user: data
          });
        } else {
          message.warn("Tài khoản của bạn đã bị khóa!");
        }
      }
      yield put({
        type: actions.LOGIN_ERROR
      });
    } catch (err) {
      yield put({
        type: actions.LOGIN_ERROR
      });
    }
  });
}

function* signup() {
  yield takeEvery(actions.SIGNUP_REQUEST, function*({ payload }) {
    try {
      const data = yield call(
        async () => await client().post(`${apiUrl}/user/signup`, payload)
      );
      if (data.error_code === 0) {
        localStorage.setItem("user", JSON.stringify(data.data));
        yield put({ type: actions.LOGIN_SUCCESS, user: data.data });
      } else {
        // yield put({ type: actions.LOGIN_ERROR, err: data.error_msg });
      }
    } catch (err) {
      yield put({
        type: actions.LOGIN_ERROR,
        err: { username: "Lỗi mạng!" }
      });
    }
  });
}

function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const user = loadUserData();
    if (user && user.access_token) {
      const userDecoded = jwtDecode(user.access_token);
      if (userDecoded.exp && userDecoded.exp < Date.now().valueOf() / 1000) {
        yield put(actions.logout());
      } else {
        const { data, error_code } = yield call(() =>
          client().get(`${apiUrl}/user/${user._id}`)
        );
        if (error_code === 0) {
          if (data.active) {
            yield put({
              type: actions.LOGIN_SUCCESS,
              user: data
            });
          } else {
            message.warn("Tài khoản của bạn đã bị khóa!");
          }
        }
      }
    }
  });
}

export default function* rootSaga() {
  yield all([fork(loginRequest), fork(signup), fork(checkAuthorization)]);
}
