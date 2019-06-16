const DOCUMENT = "QUEUE_";

const actions = {
  ADD_SONG_TO_QUEUE_START: DOCUMENT + "ADD_SONG_TO_QUEUE_START",
  ADD_SONG_TO_QUEUE: DOCUMENT + "ADD_SONG_TO_QUEUE",

  TOGGLE_QUEUE: DOCUMENT + "TOGGLE_QUEUE",

  REPLACE_QUEUE_START: DOCUMENT + "REPLACE_QUEUE_START",
  REPLACE_QUEUE: DOCUMENT + "REPLACE_QUEUE",
  CLEAR_QUEUE: DOCUMENT + "CLEAR_QUEUE",

  REMOVE_SONG_FROM_QUEUE_START: DOCUMENT + "REMOVE_SONG_FROM_QUEUE_START",
  REMOVE_SONG_FROM_QUEUE: DOCUMENT + "REMOVE_SONG_FROM_QUEUE",
  PLAY_USER_PLAYLIST: DOCUMENT + "PLAY_USER_PLAYLIST",
  TOGGLE_PUSH_ROUTE: DOCUMENT + "TOGGLE_PUSH_ROUTE",
  SORT_QUEUE: DOCUMENT + "SORT_QUEUE",

  addSongToQueue: songs => {
    return {
      type: actions.ADD_SONG_TO_QUEUE_START,
      payload: songs
    };
  },

  removeSongFromQueue: id => {
    return {
      type: actions.REMOVE_SONG_FROM_QUEUE_START,
      payload: id
    };
  },

  togglePushRoute: bool => {
    return {
      type: actions.TOGGLE_PUSH_ROUTE,
      flag: bool
    };
  },

  replaceQueue: songs => {
    return {
      type: actions.REPLACE_QUEUE_START,
      payload: songs
    };
  },

  clearQueue: () => {
    return { type: actions.CLEAR_QUEUE };
  },

  playUserPlaylist: songs => {
    return {
      type: actions.PLAY_USER_PLAYLIST,
      ids: songs.map(song => song.id),
      queue: songs
    };
  },

  sortQueue: newData => {
    return {
      type: actions.SORT_QUEUE,
      ...newData
    };
  }
};

export default actions;
