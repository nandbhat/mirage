import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import logger from "redux-logger";
import createSageMiddleware from "redux-saga";
import rootSaga from "./sagas";
const sagaMiddleWare = createSageMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(sagaMiddleWare),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleWare.run(rootSaga);
