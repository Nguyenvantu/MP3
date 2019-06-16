import { all, takeLatest, put, call } from "redux-saga/effects";
import uiActions from "../ui/actions";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import actions from "./actions";

function* fetch() {
  yield put(uiActions.startLoading());
  const { data, error_code } = yield call(
    async () => await client().get(`${apiUrl}/categories/genres`)
  );
  yield put(uiActions.finishLoading());
  if (data && error_code === 0) {
    yield put({
      type: actions.FETCH_SUCCESS,
      payload: data
    });
  } else {
    yield put({
      type: actions.FETCH_SUCCESS,
      payload: []
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.FETCH_START, fetch)]);
}
