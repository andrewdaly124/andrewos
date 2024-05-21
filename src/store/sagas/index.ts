import { all, spawn } from "redux-saga/effects";

import { api } from "./api";
import { ui } from "./ui";
import { windows } from "./windows";

const sagaMap = [api, ui, windows];

export function* rootSaga() {
  yield all(sagaMap.map((saga) => spawn(saga)));
}
