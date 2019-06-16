import { all, takeEvery, put, call } from "redux-saga/effects";
import apiUrl from "../../settings";
// import { clearToken } from "../../helpers/localStorage";
// import axios from "axios";
import actions from "./actions";
import client from "../../helpers/client";

function* getChart({ payload: { popType, key } }) {
  const { data, error_code } = yield call(
    async () => await client().get(`${apiUrl}/media/chart/${key}`)
  );
  if (data && error_code === 0) {
    switch (popType) {
      case "pop":
        yield put({ type: actions.FETCH_POP_CHART, pop: data });
        break;

      case "kpop":
        yield put({ type: actions.FETCH_KPOP_CHART, kpop: data });
        break;

      case "vpop":
        yield put({ type: actions.FETCH_VPOP_CHART, vpop: data });
        break;

      default:
        break;
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_START, getChart)
    // takeLatest(actions.FETCH_ARTISTS_START, fetchArtists),
  ]);
}
