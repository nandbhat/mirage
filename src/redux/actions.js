import actionTypes from "./actionTypes";

export const login = (passCode) => {
  return { type: actionTypes.LOGIN, payload: passCode };
};
export const loginSuccess = () => {
  return { type: actionTypes.LOGIN_SUCCESS };
};
export const loginFailure = () => {
  return { type: actionTypes.LOGIN_FAILURE };
};

export const showLoader = () => {
  return { type: actionTypes.SHOW_LOADER };
};
export const hideLoader = () => {
  return { type: actionTypes.HIDE_LOADER };
};
