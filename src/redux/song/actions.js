const DOCUMENT = "SONG_";

const actions = {
  RESET_SONG_DATA: DOCUMENT + "RESET_SONG_DATA",

  START_FETCHING_SONG: DOCUMENT + "START_FETCHING_SONG",
  FETCH_SONG_SUCCESS: DOCUMENT + "FETCH_SONG_SUCCESS",
  FETCH_SONG_FAILURE: DOCUMENT + "FETCH_SONG_FAILURE",

  FETCH_SUGGESTED_SONG_START: DOCUMENT + "FETCH_SUGGESTED_SONG_START",
  FETCH_SUGGESTED_SONG_SUCCESS: DOCUMENT + "FETCH_SUGGESTED_SONG_SUCCESS",

  START_DOWNLOAD: DOCUMENT + "START_DOWNLOAD",

  FETCH_TEXT_LYRIC_START: DOCUMENT + "FETCH_TEXT_LYRIC_START",
  FETCH_TEXT_LYRIC_SUCCESS: DOCUMENT + "FETCH_TEXT_LYRIC_SUCCESS",
  FETCH_TEXT_LYRIC_FAILURE: DOCUMENT + "FETCH_TEXT_LYRIC_FAILURE",

  fetchSong: (name, id, fetchSuggest = true) => {
    return {
      type: actions.START_FETCHING_SONG,
      payload: {
        name,
        id,
        fetchSuggest
      }
    };
  },

  resetSongData: () => {
    return { type: actions.RESET_SONG_DATA };
  },

  fetchSuggestedSongs: ({ songId, artistId }) => {
    return {
      type: actions.FETCH_SUGGESTED_SONG_START,
      payload: {
        songId,
        artistId
      }
    };
  },

  download: ({ songName, id, filename }) => {
    return {
      type: actions.START_DOWNLOAD,
      payload: {
        songName,
        id,
        filename
      }
    };
  },

  fetchLyricsSong: songId => {
    return {
      type: actions.FETCH_TEXT_LYRIC_START,
      payload: { songId }
    };
  }
};

export default actions;
