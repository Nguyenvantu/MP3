import actions from "./actions";

const initialState = {
  authenticated: false,
  user: {},
  errors: {},
  isProcessing: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        isProcessing: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        authenticated: true,
        isProcessing: false
      };

    case actions.LOGIN_ERROR:
      return {
        ...state,
        signing: false,
        errors: action.err,
        isProcessing: false
      };
    case actions.CLEAR_ERROR:
      return {
        ...state,
        errors: {}
      };
    case actions.REPLACE_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
