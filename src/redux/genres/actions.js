const DOCUMENT = "GENRES_";

const actions = {
  FETCH_START: DOCUMENT + "FETCH_START",
  FETCH_SUCCESS: DOCUMENT + "FETCH_SUCCESS",

  fetch: () => {
    return {
      type: actions.FETCH_START
    };
  }
};
export default actions;
