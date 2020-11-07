import axios from "axios";
import { getBaseUrl } from "../helpers/apis/urls";
import normalizeUrl from "normalize-url";
import { put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./actions";
import actionTypes from "./actionTypes";

function* loginSaga(action) {
  console.log("Log NB login");
  try {
    const res = yield axios.post(
      // TODO use redirect api when netlify redirect is fixed
      normalizeUrl(`${getBaseUrl()}/.netlify/functions/pass`),
      {
        passCode: action.payload,
      }
    );
    if (res?.status === 200) {
      yield put(loginSuccess());
    } else {
      yield put(loginFailure());
    }
  } catch (e) {
    console.error(e);
    yield put(loginFailure());
  }
}

export default function* rootSaga() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}
