// import { chunk } from "lodash";
// import { range } from "../../utils/func";
import actions from "./actions";

const initialState = {
  defaultAlbums: [],
  albums: [],
  total: 0,
  playlist: {},
  suggestedAlbums: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_DEFAULT_SUCCESS:
      return { ...state, defaultAlbums: action.defaultAlbums };

    case actions.FETCH_ALBUMS_SUCCESS:
      return { ...state, albums: action.albums, total: action.total };

    case actions.FETCH_ALBUM_PLAYLIST_SUCCESS:
      return { ...state, playlist: action.playlist };

    case actions.FETCH_SUGGESTED_ALBUMS_SUCCESS:
      return { ...state, suggestedAlbums: action.data };

    case actions.CLEAR_ALBUMS:
      return { ...state, albums: [] };

    case actions.CLEAR_PLAYLIST:
      return { ...state, playlist: {} };

    default:
      return state;
  }
}
