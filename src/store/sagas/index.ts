import { all, spawn } from "redux-saga/effects";

import { api } from "./api";
import { spotify } from "./spotify";
import { ui } from "./ui";
import { windows } from "./windows";

const sagaMap = [api, spotify, ui, windows];

export function* rootSaga() {
  yield all(sagaMap.map((saga) => spawn(saga)));
}
