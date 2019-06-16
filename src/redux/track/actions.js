const DOCUMENT = "TRACK_";

let cachedId = "ZWZB969E";

const actions = {
  FETCH_START: DOCUMENT + "FETCH_START",
  FETCH_SUCCESS: DOCUMENT + "FETCH_SUCCESS",
  FETCH_FAILURE: DOCUMENT + "FETCH_FAILURE",

  fetchTracks: (page, id = "ZWZB969E") => {
    if (cachedId !== id) {
      cachedId = id;
      return {
        type: actions.FETCH_START,
        payload: {
          page,
          id,
          isFading: true
        }
      };
    }
    return {
      type: actions.FETCH_START,
      payload: {
        page,
        id,
        isFading: false
      }
    };
  }
};

export default actions;
