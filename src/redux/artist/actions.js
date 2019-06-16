const DOCUMENT = "ARITST_";

const actions = {
  FETCH_SINGLE_ARTIST_START: DOCUMENT + "FETCH_SINGLE_ARTIST_START",
  FETCH_SINGLE_ARTIST_SONGS: DOCUMENT + "FETCH_SINGLE_ARTIST_SONGS",
  FETCH_SINGLE_ARTIST_ALBUMS: DOCUMENT + "FETCH_SINGLE_ARTIST_ALBUMS",
  FETCH_SINGLE_ARTIST_BIOGRAPHY: DOCUMENT + "FETCH_SINGLE_ARTIST_BIOGRAPHY",

  FETCH_ARTISTS_START: DOCUMENT + "FETCH_ARTISTS_START",
  FETCH_ARTISTS_SUCCESS: DOCUMENT + "FETCH_ARTISTS_SUCCESS",

  FETCH_DEFAULT_ARTISTS_START: DOCUMENT + "FETCH_DEFAULT_ARTISTS_START",
  FETCH_DEFAULT_ARTISTS_SUCCESS: DOCUMENT + "FETCH_DEFAULT_ARTISTS_SUCCESS",

  FETCH_SUGGESTED_ARTISTS_START: DOCUMENT + "FETCH_SUGGESTED_ARTISTS_START",
  FETCH_SUGGESTED_ARTISTS_SUCSESS: DOCUMENT + "FETCH_SUGGESTED_ARTISTS_SUCSESS",

  CLEAR_ARTIST: DOCUMENT + "CLEAR_ARTIST",
  CLEAR_ARTISTS: DOCUMENT + "CLEAR_ARTISTS",

  setNumberOfPages: numberOfPages => {
    return {
      type: actions.SET_NUMBER_OF_PAGES,
      numberOfPages
    };
  },

  clearArtist: () => {
    return {
      type: actions.CLEAR_ARTIST
    };
  },

  clearArtists: () => {
    return {
      type: actions.CLEAR_ARTISTS
    };
  },

  fetchDefaultArtists: () => {
    return { type: actions.FETCH_DEFAULT_ARTISTS_START };
  },

  fetchArtists: (genre, id, page) => {
    return {
      type: actions.FETCH_ARTISTS_START,
      payload: {
        genre,
        id,
        page
      }
    };
  },

  fetchSuggestedArtists: dataFetch => {
    return {
      type: actions.FETCH_SUGGESTED_ARTISTS_START,
      payload: { dataFetch }
    };
  },

  fetchArtist: (data, type = "songs", page) => {
    return {
      type: actions.FETCH_SINGLE_ARTIST_START,
      payload: { data, type, page }
    };
  },

  fetchSong: data => {
    return {
      type: actions.FETCH_SINGLE_ARTIST_SONGS,
      ...data
    };
  },

  fetchAlbum: data => {
    return {
      type: actions.FETCH_SINGLE_ARTIST_ALBUMS,
      ...data
    };
  },

  fetchBio: data => {
    return {
      type: actions.FETCH_SINGLE_ARTIST_BIOGRAPHY,
      payload: data
    };
  }
};
export default actions;
