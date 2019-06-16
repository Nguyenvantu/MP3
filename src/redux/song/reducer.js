import actions from "./actions";
// import { saveSongDataState, loadSongDataState } from "../../helpers/localStorage";

const initialState = {
  data: {},
  suggestedSongs: [],
  isFetching: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.RESET_SONG_DATA: {
      const newState = { ...state, data: {} };
      // saveSongDataState({ ...newState });
      return newState;
    }

    case actions.FETCH_SONG_SUCCESS: {
      const newState = {
        ...state,
        data: { ...state.data, ...action.data },
        isFetching: false
      };
      // saveSongDataState({ ...newState });
      return newState;
    }

    case actions.FETCH_SUGGESTED_SONG_SUCCESS: {
      const newState = {
        ...state,
        suggestedSongs: action.songs
      };
      // saveSongDataState({ ...newState });
      return newState;
    }

    case actions.FETCH_TEXT_LYRIC_SUCCESS: {
      const newState = {
        ...state,
        data: { ...state.data, text_lyrics: action.data }
      };
      // saveSongDataState({ ...newState });
      return newState;
    }

    case actions.FETCH_TEXT_LYRIC_FAILURE: {
      const newState = {
        ...state,
        data: { ...state.data, text_lyrics: [] }
      };
      // saveSongDataState({ ...newState });
      return newState;
    }

    case actions.START_FETCHING_SONG:
      return { ...state, isFetching: true };

    case actions.FETCH_SONG_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
}
