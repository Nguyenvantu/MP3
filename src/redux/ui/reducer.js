import actions from './actions';

const initialState = {
  showAnalyzer: false,
  dropDown: { activeId: '', show: false, where: '' },
  showQueue: false,
  slideInRight: false,
  showModal: false,
  isLoading: false,
  isFading: false,
  downloadProgress: {
    // isDownloading: false,
    // id: '',
    // percent: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SHOW_ANALYZER:
      return { ...state, showAnalyzer: true };

    case actions.HIDE_ANALYZER:
      return { ...state, showAnalyzer: false };

    case actions.TOGGLE_TRACK_DROPDOWN:
      return toggleTrackDropDown(state, action);

    case actions.TOGGLE_QUEUE:
      return { ...state, showQueue: !state.showQueue };

    case actions.TOGGLE_MODAL:
      return { ...state, showModal: action.state };

    case actions.SLIDE_IN_RIGHT:
      return { ...state, slideInRight: true };

    case actions.RESET_SLIDE_IN_RIGHT:
      return { ...state, slideInRight: false };

    case actions.START_FADING:
      return { ...state, isFading: true };

    case actions.STOP_FADING:
      return { ...state, isFading: false };

    case actions.UPDATE_DOWNLOAD_PROGRESS: {
      return { ...state, downloadProgress: { ...state.downloadProgress, [action.id]: action.percent } };
    }

    case actions.START_LOADING:
      return { ...state, isLoading: true };

    case actions.FINISH_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

function toggleTrackDropDown(state, action) {
  const { activeId, where } = action.dropDown;

  const checkId = activeId !== state.dropDown.activeId;

  return {
    ...state,
    dropDown: {
      where: where !== state.dropDown.where || checkId ? where : '',
      activeId: checkId ? activeId : '',
      show: checkId
    },
  };
}
