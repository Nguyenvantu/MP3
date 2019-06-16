import actions from "./actions";

const initialState = {
  isOpen: false,
  url: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
