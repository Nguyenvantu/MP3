import { all, takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { history } from "../store";
import uiActions from "../ui/actions";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import actions from "./actions";

function* fetchDefaultArtists() {
  yield put(uiActions.startLoading());
  const { data, error_code } = yield call(
    async () => await client().get(`${apiUrl}/media/artist/default`)
  );
  yield put(uiActions.finishLoading());
  if (error_code === 0 && data) {
    yield put({
      type: actions.FETCH_DEFAULT_ARTISTS_SUCCESS,
      defaultArtists: data
    });
  } else {
    history.push("/notfound");
  }
}

function* fetchArtists({ payload: { genre, id, page } }) {
  const pageQuery = page ? `&page=${page}` : "";
  yield put(uiActions.startLoading());
  const { data, error_code } = yield call(
    async () =>
      await client(true).get(
        `${apiUrl}/media/artist?genre=${genre}&id=${id}${pageQuery}`
      )
  );
  yield put(uiActions.finishLoading());
  if (data && error_code === 0)
    yield put({
      type: actions.FETCH_ARTISTS_SUCCESS,
      artists: data.data,
      total: data.count
    });
  else {
    history.push("/notfound");
  }
}

function* fetchSuggestedArtists({ payload: { dataFetch } }) {
  const { data, error_code } = yield call(
    async () =>
      await client(true).get(
        `${apiUrl}/media/artist/suggested?name=${dataFetch.name ||
          ""}&id=${dataFetch.id || ""}`
      )
  );
  yield put({
    type: actions.FETCH_SUGGESTED_ARTISTS_SUCSESS,
    data: error_code === 0 && data ? data || [] : []
  });
}

function* fetchArtist({ payload: { data: dataFetch, type } }) {
  const { data, error_code } = yield call(
    async () =>
      await client(true).get(
        `${apiUrl}/media/artist/${dataFetch.name}/${type}?id=${dataFetch.id ||
          ""}`
      )
  );
  if (error_code === 0 && data) {
    switch (type) {
      case "songs":
        yield put(actions.fetchSong(data));
        yield put(actions.fetchSuggestedArtists(dataFetch));
        break;
      case "albums":
        yield put(actions.fetchAlbum(data));
        break;
      case "biography":
        yield put(actions.fetchBio(data));
        break;
      default:
    }
  } else {
    // history.replace("/notfound");
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.FETCH_DEFAULT_ARTISTS_START, fetchDefaultArtists),
    takeEvery(actions.FETCH_ARTISTS_START, fetchArtists),
    takeEvery(actions.FETCH_SUGGESTED_ARTISTS_START, fetchSuggestedArtists),
    takeEvery(actions.FETCH_SINGLE_ARTIST_START, fetchArtist)
  ]);
}
