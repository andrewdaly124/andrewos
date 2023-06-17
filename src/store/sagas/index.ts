import { all, spawn } from "redux-saga/effects";

import ui from "./ui";

const sagaMap = [ui];

export default function* rootSaga() {
  yield all(sagaMap.map((saga) => spawn(saga)));
}
