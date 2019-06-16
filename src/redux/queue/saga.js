import { all, takeEvery, put, select } from "redux-saga/effects";
import uiActions from "../ui/actions";
import songActions from "../song/actions";
import actions from "./actions";
import { removeById, changeAlias, isEmpty } from "../../utils/func";

const tweakSongs = songs => {
  const ids = [];
  songs = songs.map(song => {
    ids.push(song.id);
    return {
      id: song.id,
      name: song.title || song.name,
      artists: song.artists || [song.artist],
      alias: song.alias,
      ...(song.thumbnail && { thumbnail: song.thumbnail })
    };
  });

  return { songs, ids };
};

function* addSongToQueue({ payload }) {
  const { queueState } = yield select();
  yield put({ type: actions.ADD_SONG_TO_QUEUE, songs: [...payload] });
  if (queueState.queue.length === 0) {
    const { name, id } = payload[0];
    yield put(songActions.fetchSong(changeAlias(name), id));
  }
}

function* removeSongFromQueue({ payload: id }) {
  const { queueState } = yield select();
  const queue = [...queueState.queue]; // avoid mutating the state
  const newQueue = removeById(queue, id);
  const queueIds = removeById([...queueState.ids], id);

  if (queueIds.length === 0) {
    yield put(uiActions.toggleQueue());
    yield put(songActions.resetSongData());
  }
  yield put({
    type: actions.REMOVE_SONG_FROM_QUEUE,
    queue: newQueue,
    ids: queueIds
  });
}

function* replaceQueue({ payload: songs }) {
  const {
    songData: { data }
  } = yield select();
  // play the first song in the queue if there is no song playing
  if (isEmpty(data)) {
    const { alias, id, name } = songs[0];
    yield put({ type: actions.REPLACE_QUEUE, ...tweakSongs(songs) });
    yield put(songActions.fetchSong(alias || changeAlias(name), id));
  } else {
    yield put({ type: actions.REPLACE_QUEUE, ...tweakSongs(songs) });
  }
}

function* clearQueue() {
  yield put(uiActions.toggleQueue());
  yield put(songActions.resetSongData());
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ADD_SONG_TO_QUEUE_START, addSongToQueue),
    takeEvery(actions.REMOVE_SONG_FROM_QUEUE_START, removeSongFromQueue),
    takeEvery(actions.REPLACE_QUEUE_START, replaceQueue),
    takeEvery(actions.CLEAR_QUEUE, clearQueue)
  ]);
}
