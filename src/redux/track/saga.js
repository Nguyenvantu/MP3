import { all, takeEvery, put, call } from "redux-saga/effects";
import uiActions from "../ui/actions";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import actions from "./actions";
import { pageQuery } from "../../utils/query";
import { compact, uniq } from "lodash";

function* fetchTracks({ payload: { page, id, isFading } }) {
  if (isFading) {
    yield put(uiActions.startFading()); // only fade when fetch new music type
  }
  const data = yield call(
    async () =>
      await client(true).get(`${apiUrl}/media/top100/${id}${pageQuery(page)}`)
  );
  if (data && data.data) {
    yield put({
      type: actions.FETCH_SUCCESS,
      tracks: uniq(compact(data.data.items), "id"),
      page,
      id
    });
  } else {
    yield put({ type: actions.FETCH_FAILURE });
  }
  if (isFading) {
    yield put(uiActions.stopFading());
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.FETCH_START, fetchTracks)]);
}
