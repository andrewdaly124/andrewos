import { put, takeEvery } from "redux-saga/effects";

import {
  appWindowClicked,
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
} from "../actions";

function* bumpPepperPics() {
  yield put(appWindowClicked("pepper-pics"));
}

function* bumpChess() {
  yield put(appWindowClicked("chess"));
}

function* bumpPentris() {
  yield put(appWindowClicked("pentris"));
}

function* bumpOldProjects() {
  yield put(appWindowClicked("old-projects"));
}

function* bumpAbout() {
  yield put(appWindowClicked("about"));
}

export default function* WindowStoreSaga() {
  yield takeEvery(openPepperWindow, bumpPepperPics);
  yield takeEvery(openChessWindow, bumpChess);
  yield takeEvery(openPentrisWindow, bumpPentris);
  yield takeEvery(openOldProjectsWindow, bumpOldProjects);
  yield takeEvery(openAboutWindow, bumpAbout);
}
