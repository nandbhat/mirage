import actionTypes from "./actionTypes";

const initialState = {
  isAuthenticated: false,
  loadingCount: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case actionTypes.LOGIN_FAILURE:
      return { ...state, isAuthenticated: false };
    case actionTypes.SHOW_LOADER:
      return { ...state, loadingCount: state.loadingCount + 1 };
    case actionTypes.HIDE_LOADER:
      return { ...state, loadingCount: state.loadingCount - 1 };
    default:
      return state;
  }
};

export default rootReducer;
