import { put, takeEvery } from "redux-saga/effects";

import {
  appWindowClicked,
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
  openSpotifyWindow,
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

function* bumpSpotify() {
  yield put(appWindowClicked("spotify"));
}

export function* windows() {
  yield takeEvery(openPepperWindow, bumpPepperPics);
  yield takeEvery(openChessWindow, bumpChess);
  yield takeEvery(openPentrisWindow, bumpPentris);
  yield takeEvery(openOldProjectsWindow, bumpOldProjects);
  yield takeEvery(openAboutWindow, bumpAbout);
  yield takeEvery(openSpotifyWindow, bumpSpotify);
}
