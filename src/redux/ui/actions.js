const DOCUMENT = "UI_";

const actions = {
  SHOW_ANALYZER: DOCUMENT + "SHOW_ANALYZER",
  HIDE_ANALYZER: DOCUMENT + "HIDE_ANALYZER",
  TOGGLE_TRACK_DROPDOWN: DOCUMENT + "TOGGLE_TRACK_DROPDOWN",
  SLIDE_IN_RIGHT: DOCUMENT + "SLIDE_IN_RIGHT",
  RESET_SLIDE_IN_RIGHT: DOCUMENT + "RESET_SLIDE_IN_RIGHT",
  UPDATE_DOWNLOAD_PROGRESS: DOCUMENT + "UPDATE_DOWNLOAD_PROGRESS",
  TOGGLE_MODAL: DOCUMENT + "TOGGLE_MODAL",
  TOGGLE_QUEUE: DOCUMENT + "TOGGLE_QUEUE",
  START_LOADING: DOCUMENT + "START_LOADING",
  FINISH_LOADING: DOCUMENT + "FINISH_LOADING",
  START_FADING: DOCUMENT + "START_FADING",
  STOP_FADING: DOCUMENT + "STOP_FADING",

  showAnalyzer: () => {
    return {
      type: actions.SHOW_ANALYZER
    };
  },
  hideAnalyzer: () => {
    return {
      type: actions.HIDE_ANALYZER
    };
  },
  toggleModal: (state = true) => {
    return {
      type: actions.TOGGLE_MODAL,
      state
    };
  },
  toggleTrackDropDown: (id, where) => {
    return {
      type: actions.TOGGLE_TRACK_DROPDOWN,
      dropDown: { activeId: id, where }
    };
  },
  toggleQueue: () => {
    return {
      type: actions.TOGGLE_QUEUE
    };
  },
  slideInRight: () => {
    return {
      type: actions.SLIDE_IN_RIGHT
    };
  },
  resetSlideInRight: () => {
    return {
      type: actions.RESET_SLIDE_IN_RIGHT
    };
  },
  updateDownloadProgress: (id, percent) => {
    return {
      type: actions.UPDATE_DOWNLOAD_PROGRESS,
      id,
      percent
    };
  },
  startLoading: () => {
    return {
      type: actions.START_LOADING
    };
  },
  finishLoading: () => {
    return {
      type: actions.FINISH_LOADING
    };
  },
  startFading: () => {
    return {
      type: actions.START_FADING
    };
  },
  stopFading: () => {
    return {
      type: actions.STOP_FADING
    };
  }
};

export default actions;
