const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  LOGOUT: "LOGOUT",
  REPLACE_INFO: "REPLACE_INFO",
  CLEAR_ERROR: "CLEAR_ERROR",

  login: data => ({
    type: actions.LOGIN_REQUEST,
    data
  }),
  logout: () => {
    localStorage.removeItem("user");
    return {
      type: actions.LOGOUT
    };
  },
  signup: data => ({
    type: actions.SIGNUP_REQUEST,
    payload: data
  }),
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  replaceInfo: data => ({
    type: actions.REPLACE_INFO,
    payload: data
  }),
  clearErrors: () => ({ type: actions.CLEAR_ERROR })
};

export default actions;
