// import { chunk } from "lodash";
// import { range } from "../../utils/func";
import actions from "./actions";

const initialState = {
  defaultArtists: [],
  artists: [],
  // pageChunkIndex: 0,
  // pageChunks: [],
  total: 0,
  suggestedArtists: [],
  artist: {
    song: {
      numberOfPages: 0,
      songs: []
    },
    album: {
      numberOfPages: 0,
      albums: []
    },
    cover: "",
    artistName: "",
    thumbnail: "",
    biography: "",
    dateOfBirth: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_SINGLE_ARTIST_SONGS:
      return {
        ...state,
        artist: {
          ...state.artist,
          // cover: action.cover,
          // avatar: action.avatar,
          // artistName: action.artistName,
          song: { songs: action.songs }
        }
      };

    case actions.FETCH_SINGLE_ARTIST_BIOGRAPHY:
      return {
        ...state,
        artist: {
          ...state.artist,
          ...action.payload
        }
      };

    case actions.FETCH_SINGLE_ARTIST_ALBUMS:
      return {
        ...state,
        artist: {
          ...state.artist,
          album: { albums: action.albums }
        }
      };
    case actions.FETCH_DEFAULT_ARTISTS_SUCCESS:
      return { ...state, defaultArtists: action.defaultArtists, artists: [] };

    case actions.FETCH_ARTISTS_SUCCESS:
      return {
        ...state,
        artists: action.artists,
        total: action.total
      };
    case actions.CLEAR_ARTIST:
      return {
        ...state,
        artist: {
          song: { songs: [] },
          album: { albums: [] },
          cover: "",
          artistName: "",
          thumbnail: "",
          biography: "",
          dateOfBirth: ""
        }
      };

    case actions.CLEAR_ARTISTS:
      return { ...state, artists: [] };

    case actions.FETCH_SUGGESTED_ARTISTS_SUCSESS:
      return {
        ...state,
        suggestedArtists: action.data.length
          ? [...action.data]
          : [...state.suggestedArtists]
      };

    default:
      return state;
  }
}
