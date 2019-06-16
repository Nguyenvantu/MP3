import actions from './actions';

const initialState = {
  activeId: '',
  tracks: [],
  pageLoaded: 1,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_START:
      return { ...state, isLoading: true };

    case actions.FETCH_SUCCESS:
      return fetchTrackSuccess(state, action);

    case actions.FETCH_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

function fetchTrackSuccess(state, action) {
  let tracks = state.tracks;
  if (state.tracks.length && (state.tracks[0] !== action.tracks[0])) {
    tracks = tracks.concat(action.tracks);
  }
  let pageLoaded = action.page ? action.page : state.pageLoaded;

  if (action.id !== state.activeId) {
    tracks = action.tracks;
    pageLoaded = 1;
  }

  return {
    ...state,
    tracks,
    pageLoaded,
    activeId: action.id,
    isLoading: false,
  };
}
