import { loadUserData } from "../../helpers/localStorage";
let cachedUser = {
  username: "",
  access_token: ""
};

function getUser() {
  if (cachedUser.username && cachedUser.access_token) {
    return cachedUser;
  }

  const user = loadUserData();
  if (user && user.username && user.access_token) {
    cachedUser.username = user.username;
    cachedUser.access_token = user.access_token;
  }
  return cachedUser;
}
const DOCUMENT = "UPL_";

const actions = {
  GET_PLAYLIST_COLLECTION_START: DOCUMENT + "GET_PLAYLIST_COLLECTION_START",
  GET_PLAYLIST_COLLECTION_SUCCESS: DOCUMENT + "GET_PLAYLIST_COLLECTION_SUCCESS",

  CREATE_PLAYLIST_START: DOCUMENT + "CREATE_PLAYLIST_START",
  CREATE_PLAYLIST_SUCCESS: DOCUMENT + "CREATE_PLAYLIST_SUCCESS",

  ADD_SONG_TO_PLAYLIST_START: DOCUMENT + "ADD_SONG_TO_PLAYLIST_START",
  ADD_SONG_TO_PLAYLIST_SUCCESS: DOCUMENT + "ADD_SONG_TO_PLAYLIST_SUCCESS",

  DELETE_SONG_FROM_PLAYLIST_START: DOCUMENT + "DELETE_SONG_FROM_PLAYLIST_START",
  DELETE_SONG_FROM_PLAYLIST_SUCCESS:
    DOCUMENT + "DELETE_SONG_FROM_PLAYLIST_SUCCESS",

  DELETE_PLAYLIST_START: DOCUMENT + "DELETE_PLAYLIST_START",
  DELETE_PLAYLIST_SUCCESS: DOCUMENT + "DELETE_PLAYLIST_SUCCESS",

  ADD_SONG_TO_STORE_TEMPORARILY: DOCUMENT + "ADD_SONG_TO_STORE_TEMPORARILY",
  CLEAR_USER_PLAYLIST: DOCUMENT + "CLEAR_USER_PLAYLIST",

  getPlaylistCollection: () => {
    const { username } = getUser();
    return {
      type: actions.GET_PLAYLIST_COLLECTION_START,
      payload: {
        username
      }
    };
  },

  createPlaylist: title => {
    const { username } = getUser();
    return {
      type: actions.CREATE_PLAYLIST_START,
      payload: { title, username }
    };
  },

  addSongToPlaylist: (playlist, songObj) => {
    const { username } = getUser();
    return {
      type: actions.ADD_SONG_TO_PLAYLIST_START,
      payload: {
        username,
        playlist,
        songObj
      }
    };
  },

  addSongToStoreTemporarily: song => {
    return {
      type: actions.ADD_SONG_TO_STORE_TEMPORARILY,
      song
    };
  },

  deleteSong: (playlistTitle, id) => {
    const { username } = getUser();
    return {
      type: actions.DELETE_SONG_FROM_PLAYLIST_START,
      payload: {
        username,
        playlistTitle,
        id
      }
    };
  },

  deletePlaylist: playlistTitle => {
    const { username } = getUser();
    return {
      type: actions.DELETE_PLAYLIST_START,
      payload: {
        username,
        playlistTitle
      }
    };
  },

  clearUserPlaylist: () => {
    cachedUser = {
      username: "",
      access_token: ""
    };
    return {
      type: actions.CLEAR_USER_PLAYLIST
    };
  }
};

export default actions;
