import actions from "./actions";
// import { findIndex } from "../../utils/func";

const initialState = {
  playlists: [],
  tmpSong: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.GET_PLAYLIST_COLLECTION_SUCCESS:
      return { ...state, playlists: action.playlists };

    case actions.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: action.playlists
      };

    case actions.DELETE_PLAYLIST_SUCCESS:
      return { ...state, playlists: action.playlists };

    case actions.ADD_SONG_TO_PLAYLIST_SUCCESS:
      return addSongToPlaylist(state, action);

    case actions.ADD_SONG_TO_STORE_TEMPORARILY:
      return { ...state, tmpSong: action.song };

    case actions.DELETE_SONG_FROM_PLAYLIST_SUCCESS:
      return { ...state, playlists: action.playlists };

    case actions.CLEAR_USER_PLAYLIST:
      return initialState;

    default:
      return state;
  }
}

function addSongToPlaylist(state, action) {
  const index = state.playlists.findIndex(pl => pl._id === action._id);
  const clonePlaylists = [...state.playlists];
  clonePlaylists.splice(index, 1, {
    _id: action._id,
    title: action.title,
    songs: [...state.playlists[index].songs, action.song]
  });

  return {
    ...state,
    playlists: clonePlaylists
  };
}
