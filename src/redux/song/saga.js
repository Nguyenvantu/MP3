import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";
import { history } from "../store";
import queueActions from "../queue/actions";
import uiActions from "../ui/actions";
import apiUrl, { ROOT_URL } from "../../settings";
import client from "../../helpers/client";
import axios from "axios";
import actions from "./actions";
import { message } from "antd";
import FileSaver from "file-saver";
import { store } from "../store";

function* fetchSong({ payload: { name, id, fetchSuggest } }) {
  yield put({ type: actions.RESET_SONG_DATA });
  const { data } = yield call(() =>
    client().get(`${apiUrl}/media/song?name=${name}&id=${id}`)
  );
  if (data && data.id && data.source) {
    data.cover = data.artist
      ? data.artist.cover
      : data.artists[0]
      ? data.artists[0].cover
      : "";
    data.artistId = data.artist
      ? data.artist.id
      : data.artists[0]
      ? data.artists[0].id
      : "";
    delete data.artist;
    const ids = {
      songId: data.id,
      artistId: data.artistId
    };
    if (fetchSuggest) {
      yield put(actions.fetchSuggestedSongs(ids));
    }
    yield put(actions.fetchLyricsSong(id));
    yield put(queueActions.togglePushRoute(false));
    const { queueState } = yield select();
    if (!queueState.ids.includes(id))
      yield put(
        queueActions.addSongToQueue([
          {
            name: data.name,
            id,
            artists: data.artists,
            thumbnail: data.thumbnail
          }
        ])
      );
    yield put({ type: actions.FETCH_SONG_SUCCESS, data });
  } else {
    yield put({ type: actions.FETCH_SONG_FAILURE });
    yield put(queueActions.removeSongFromQueue(id));
    history.push("/notfound/song");
  }
}

function* fetchSuggestedSongs({ payload: { songId, artistId } }) {
  const { error_code, data } = yield call(
    async () =>
      await client(true).get(
        `${apiUrl}/media/song/suggested?artistId=${artistId}&songId=${songId}`
      )
  );
  if (data && error_code === 0) {
    yield put({
      type: actions.FETCH_SUGGESTED_SONG_SUCCESS,
      songs: data,
      songId
    });
  }
}

function* download({ payload: { songName, id, filename } }) {
  const { auth } = yield select();
  if (!auth.authenticated) {
    message.warn("Bạn phải đăng nhập để sử dụng chức năng này!");
    return history.push(`/dang-nhap`);
  }
  yield put(uiActions.updateDownloadProgress(id, 0));
  const url = filename
    ? `${ROOT_URL}/download/song/${songName}/${id}/${filename}`
    : `${ROOT_URL}/download/song/${songName}/${id}`;
  const data = yield call(() =>
    client().get(url, {
      responseType: "arraybuffer",
      onDownloadProgress: progressEvent => {
        // const percentCompleted = Math.floor(
        //   (progressEvent.loaded * 100) / progressEvent.total
        // );
        // console.log({progressEvent, e});
        const completed = progressEvent.loaded / (1024 * 1024);
        store.dispatch(
          uiActions.updateDownloadProgress(id, completed.toFixed(2))
        );
      }
    })
  );
  if (data) {
    yield FileSaver.saveAs(
      new Blob([data], { type: "audio/mpeg" }),
      `${songName}.mp3`
    );
    yield put(uiActions.updateDownloadProgress(id, -1));
  } else {
    yield put(uiActions.updateDownloadProgress(id, -1));
    message.error(`Không thể tải ${songName}. Vui lòng thử lại sau!`);
  }
}

function* fetchLyricsSong({ payload: { songId } }) {
  try {
    const { data } = yield call(() =>
      axios.get(`https://mp3.zing.vn/xhr/lyrics/get-lyrics?media_id=${songId}`)
    );
    if (data) {
      yield put({
        type: actions.FETCH_TEXT_LYRIC_SUCCESS,
        data: data.data ? data.data : [],
        songId
      });
    }
  } catch (e) {
    yield put({
      type: actions.FETCH_TEXT_LYRIC_FAILURE,
      songId
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.START_FETCHING_SONG, fetchSong),
    takeLatest(actions.FETCH_SUGGESTED_SONG_START, fetchSuggestedSongs),
    takeEvery(actions.START_DOWNLOAD, download),
    takeLatest(actions.FETCH_TEXT_LYRIC_START, fetchLyricsSong)
  ]);
}
