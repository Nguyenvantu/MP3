import actions from './actions';

const initialState = {
  playedPercent: undefined,
  lyric1: '',
  lyric2: '',
  per1: 0,
  per2: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_LYRIC:
      return action.lyrics;

    case actions.UPDATE_LYRIC_PERCENT:
      return Object.assign({}, state, action.payload);

    case actions.UPDATE_PLAYED_PERCENT:
      return { ...state, playedPercent: action.playedPercent };

    default:
      return state;
  }
}
