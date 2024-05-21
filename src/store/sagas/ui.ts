import { takeEvery } from "redux-saga/effects";

import { setQuoteOfTheDay } from "../actions";

// function* quoteWasChangedSaga({ payload }: { payload: string }) {
function quoteWasChangedSaga({ payload }: { payload: string }) {
  if (payload) {
    // yield put(action(prop));
    console.log("Quote was changed!", payload);
  }
}

export function* ui() {
  yield takeEvery(setQuoteOfTheDay, quoteWasChangedSaga);
}
