import { store } from "../store";

const DOCUMENT = "CHART_";
const popTypes = {
  pop: "IWZ9Z08O",
  kpop: "IWZ9Z08W",
  vpop: "IWZ9Z08I"
};

const actions = {
  FETCH_START: DOCUMENT + "FETCH_START",
  FETCH_POP_CHART: DOCUMENT + "FETCH_POP_CHART",
  FETCH_KPOP_CHART: DOCUMENT + "FETCH_KPOP_CHART",
  FETCH_VPOP_CHART: DOCUMENT + "FETCH_VPOP_CHART",
  CHANGE_ACTIVE_CHART: DOCUMENT + "CHANGE_ACTIVE_CHART",

  getChart: popType => {
    return {
      type: actions.FETCH_START,
      payload: {
        popType,
        key: popTypes[popType]
      }
    };
  },

  changeActiveChart: popType => {
    const state = store.getState();
    if (state.chartState[popType].length) {
      return { type: actions.CHANGE_ACTIVE_CHART, activeChart: popType };
    } else {
      return actions.getChart(popType);
    }
  }
};

export default actions;
