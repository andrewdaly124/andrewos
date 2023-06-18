import createSagaMiddleware from "redux-saga";

import { configureStore } from "@reduxjs/toolkit";

import { Immutable, deepCopy } from "../utils/typeUtils";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { DEFAULT_STORE_STATE, StoreState } from "./types";

export function makeStore(
  initialState: Immutable<StoreState> = DEFAULT_STORE_STATE
) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
    ],
    reducer: rootReducer,
    preloadedState: deepCopy(initialState),
    devTools: process.env.NODE_ENV !== "production",
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
