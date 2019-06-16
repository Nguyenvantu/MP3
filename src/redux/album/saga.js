import { all, takeLatest, put, call } from "redux-saga/effects";
import { history } from "../store";
import uiActions from "../ui/actions";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import actions from "./actions";

function* fetchDefaultAlbums() {
  yield put(uiActions.startLoading());
  const { data, error_code } = yield call(
    async () => await client().get(`${apiUrl}/media/album/default`)
  );
  yield put(uiActions.finishLoading());
  if (error_code === 0 && data) {
    yield put({
      type: actions.FETCH_DEFAULT_SUCCESS,
      defaultAlbums: data
    });
    yield put(actions.clearAlbums()); // clear the albums data
  } else {
    yield put({
      type: actions.FETCH_DEFAULT_SUCCESS,
      defaultAlbums: []
    });
    yield history.replace("/notfound/albums");
  }
}

function* fetchAlbums({ payload: { genre, id, page } }) {
  const pageQuery = page ? `&page=${page}` : "";
  yield put(uiActions.startLoading());
  const { data, error_code } = yield call(
    async () =>
      await client().get(
        `${apiUrl}/media/album?genre=${genre}&id=${id}${pageQuery}`
      )
  );
  if (error_code === 0 && data) {
    yield put({
      type: actions.FETCH_ALBUMS_SUCCESS,
      albums: data.data,
      total: data.count
    });
  }
  yield put(uiActions.finishLoading());
}

function* fetchSuggestedAlbums({ payload: { id, artistId } }) {
  const { data, error_code }  = yield call(
    async () =>
      await client().get(
        `${apiUrl}/media/album/suggested?id=${id}&artistId=${artistId || ''}`
      )
  );
  yield put({
    type: actions.FETCH_SUGGESTED_ALBUMS_SUCCESS,
    data: error_code === 0 && data ? data : []
  });
}

function* fetchAlbumPlaylist({ payload: { title, id } }) {
  const { data, error_code } = yield call(
    async () =>
      await client().get(
        `${apiUrl}/media/album/playlist?title=${title}&id=${id}`
      )
  );
  if (data && error_code === 0) {
    const artistId =
      data.artists[0] && data.artists[0].id;
    yield put(actions.fetchSuggestedAlbums(id, artistId));
    yield put({ type: actions.FETCH_ALBUM_PLAYLIST_SUCCESS, playlist: data });
  } else {
    history.replace("/notfound/album");
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.FETCH_DEFAULT_START, fetchDefaultAlbums),
    takeLatest(actions.FETCH_ALBUMS_START, fetchAlbums),
    takeLatest(actions.FETCH_SUGGESTED_ALBUMS_START, fetchSuggestedAlbums),
    takeLatest(actions.FETCH_ALBUM_PLAYLIST_START, fetchAlbumPlaylist)
  ]);
}
