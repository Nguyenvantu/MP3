const DOCUMENT = "SHARE_";

const actions = {
  SET_DATA: DOCUMENT + "SET_DATA",

  setData: (data) => {
    return {
      type: actions.SET_DATA,
      payload: data
    };
  }
};

export default actions;
