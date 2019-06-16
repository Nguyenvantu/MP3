import { all } from "redux-saga/effects";
import songSaga from "./song/saga";
import albumSaga from "./album/saga";
import artistSaga from "./artist/saga";
import chartSaga from "./chart/saga";
import authSaga from "./auth/saga";
import playlistSaga from "./user_playlist/saga";
import queueSaga from "./queue/saga";
import genresSaga from "./genres/saga";

export default function* rootSaga() {
  yield all([
    songSaga(),
    albumSaga(),
    artistSaga(),
    chartSaga(),
    authSaga(),
    playlistSaga(),
    queueSaga(),
    genresSaga()
  ]);
}
