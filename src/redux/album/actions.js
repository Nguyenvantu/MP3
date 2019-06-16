const DOCUMENT = "ALBUMS_";

const actions = {
  FETCH_DEFAULT_START: DOCUMENT + "FETCH_DEFAULT_START",
  FETCH_DEFAULT_SUCCESS: DOCUMENT + "FETCH_DEFAULT_SUCCESS",

  FETCH_ALBUMS_START: DOCUMENT + "FETCH_ALBUMS_START",
  FETCH_ALBUMS_SUCCESS: DOCUMENT + "FETCH_ALBUMS_SUCCESS",

  FETCH_SUGGESTED_ALBUMS_START: DOCUMENT + "FETCH_SUGGESTED_ALBUMS_START",
  FETCH_SUGGESTED_ALBUMS_SUCCESS: DOCUMENT + "FETCH_SUGGESTED_ALBUMS_SUCCESS",

  FETCH_ALBUM_PLAYLIST_START: DOCUMENT + "FETCH_ALBUM_PLAYLIST_START",
  FETCH_ALBUM_PLAYLIST_SUCCESS: DOCUMENT + "FETCH_ALBUM_PLAYLIST_SUCCESS",

  CLEAR_ALBUMS: DOCUMENT + "CLEAR",
  SET_NUMBER_OF_PAGES: DOCUMENT + " SET_NUMBER_OF_PAGES",
  CHANGE_ACTIVE_PAGE: DOCUMENT + "CHANGE_ACTIVE_PAGE",
  CHANGE_PAGE_CHUNK_INDEX: DOCUMENT + "CHANGE_PAGE_CHUNK_INDEX",
  CLEAR_PLAYLIST: DOCUMENT + "CLEAR_PLAYLIST",

  clearAlbums: () => {
    return {
      type: actions.CLEAR_ALBUMS
    };
  },

  setNumberOfPages: numberOfPages => {
    return {
      type: actions.SET_NUMBER_OF_PAGES,
      numberOfPages
    };
  },

  changePageChunkIndex: pageChunkIndex => {
    return {
      type: actions.CHANGE_PAGE_CHUNK_INDEX,
      pageChunkIndex
    };
  },

  fetchDefaultAlbums: () => {
    return {
      type: actions.FETCH_DEFAULT_START
    };
  },

  fetchAlbums: (genre, id, page) => {
    return {
      type: actions.FETCH_ALBUMS_START,
      payload: {
        genre,
        id,
        page
      }
    };
  },

  fetchSuggestedAlbums: (id, artistId) => {
    return {
      type: actions.FETCH_SUGGESTED_ALBUMS_START,
      payload: {
        id,
        artistId
      }
    };
  },

  fetchAlbumPlaylist: (title, id) => {
    return {
      type: actions.FETCH_ALBUM_PLAYLIST_START,
      payload: {
        id,
        title
      }
    };
  },

  clearPlaylist: () => {
    return { type: actions.CLEAR_PLAYLIST };
  }
};
export default actions;
