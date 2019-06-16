import actions from "./actions";

const initialState = {
  pop: [],
  kpop: [],
  vpop: [],
  loading: false,
  activeChart: "pop"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_START:
      return { ...state, loading: true };
    case actions.FETCH_POP_CHART:
      return { ...state, pop: action.pop, activeChart: "pop", loading: false };
    case actions.FETCH_KPOP_CHART:
      return {
        ...state,
        kpop: action.kpop,
        activeChart: "kpop",
        loading: false
      };

    case actions.FETCH_VPOP_CHART:
      return {
        ...state,
        vpop: action.vpop,
        activeChart: "vpop",
        loading: false
      };

    case actions.CHANGE_ACTIVE_CHART:
      return { ...state, activeChart: action.activeChart };

    default:
      return state;
  }
}
