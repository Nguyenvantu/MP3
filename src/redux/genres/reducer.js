
import actions from "./actions";

const initialState = {
  loading: false,
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_START:
      return {
        ...state,
        loading: true
      };

    case actions.FETCH_SUCCESS:
      return {
        loading: false,
        data: action.payload
      };

    default:
      return state;
  }
}
