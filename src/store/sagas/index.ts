import { all, spawn } from "redux-saga/effects";

import { ui } from "./ui";
import { windows } from "./windows";

const sagaMap = [ui, windows];

export function* rootSaga() {
  yield all(sagaMap.map((saga) => spawn(saga)));
}
