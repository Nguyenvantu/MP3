import { all, takeEvery, put, call, select } from "redux-saga/effects";
// import { notification } from "antd";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import actions from "./actions";
import { history } from "../store";
import { message } from "antd";
import uiActions from "../ui/actions";

function* getPlaylistCollection({ payload }) {
  const { username } = payload;
  const data = yield call(
    async () => await client().get(`${apiUrl}/playlist/${username}`)
  );
  if (data) {
    yield put({
      type: actions.GET_PLAYLIST_COLLECTION_SUCCESS,
      playlists: data.playlists || data
    });
  }
}

function* createPlaylist({ payload: { username, title } }) {
  const { data, error_code } = yield call(
    async () =>
      await client(true).post(`${apiUrl}/playlist/${username}`, { title })
  );
  if (error_code === 0 && data) {
    yield put({
      type: actions.CREATE_PLAYLIST_SUCCESS,
      playlists: data.playlists
    });
  } else message.warning("Danh sách này đã tồn tại!");
}

function* addSongToPlaylist({ payload }) {
  const { username, playlist, songObj } = payload;
  const { error_code } = yield call(
    async () =>
      await client(true).put(
        `${apiUrl}/playlist/${username}/${playlist._id}`,
        songObj
      )
  );
  if (error_code === 0) {
    yield put({
      type: actions.ADD_SONG_TO_PLAYLIST_SUCCESS,
      song: songObj,
      _id: playlist._id,
      title: playlist.title
    });
    message.success(`${songObj.name} đã được thêm vào danh sách`);
  } else message.warn(`${songObj.name} đã có sẵn trong danh sách!`);
}

function* deleteSong({ payload }) {
  const { username, playlistTitle, id } = payload;
  const data = yield call(
    async () =>
      await client().delete(
        `${apiUrl}/playlist/${username}/${playlistTitle}/${id}`
      )
  );
  if (data) {
    yield put({
      type: actions.DELETE_SONG_FROM_PLAYLIST_SUCCESS,
      playlists: data
    });
  }
}

function* deletePlaylist({ payload }) {
  const { username, playlistTitle } = payload;
  const { data, error_code } = yield call(
    async () =>
      await client().delete(`${apiUrl}/playlist/${username}/${playlistTitle}`)
  );
  if (error_code === 0 && data) {
    yield put({
      type: actions.DELETE_PLAYLIST_SUCCESS,
      playlists: data
    });
  }
}

function* addSongToTemp() {
  const { auth } = yield select();
  if (!auth.authenticated) {
    message.warn("Bạn phải đăng nhập để sử dụng chức năng này!");
    return history.push(`/dang-nhap`);
  } else {
    yield put(uiActions.toggleModal());
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_PLAYLIST_COLLECTION_START, getPlaylistCollection),
    takeEvery(actions.CREATE_PLAYLIST_START, createPlaylist),
    takeEvery(actions.ADD_SONG_TO_PLAYLIST_START, addSongToPlaylist),
    takeEvery(actions.DELETE_SONG_FROM_PLAYLIST_START, deleteSong),
    takeEvery(actions.DELETE_PLAYLIST_START, deletePlaylist),
    takeEvery(actions.ADD_SONG_TO_STORE_TEMPORARILY, addSongToTemp)
  ]);
}
