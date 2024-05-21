import { createReducer } from "@reduxjs/toolkit";

import { deepCopy } from "../../utils/typeUtils";
import {
  appWindowClicked,
  closeAboutWindow,
  closeChessWindow,
  closeOldProjectsWindow,
  closePentrisWindow,
  closePepperWindow,
  closeSpotifyWindow,
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
  openSpotifyWindow,
} from "../actions/windows";
import { DEFAULT_WINDOWS_STORE_STATE } from "../types/windows";

const windows = createReducer(
  deepCopy(DEFAULT_WINDOWS_STORE_STATE),
  (builder) => {
    builder
      .addCase(openPepperWindow, (state) => {
        return { ...state, "pepper-pics": true };
      })
      .addCase(closePepperWindow, (state) => {
        return { ...state, "pepper-pics": false };
      })
      .addCase(openChessWindow, (state) => {
        return { ...state, chess: true };
      })
      .addCase(closeChessWindow, (state) => {
        return { ...state, chess: false };
      })
      .addCase(openPentrisWindow, (state) => {
        return { ...state, pentris: true };
      })
      .addCase(closePentrisWindow, (state) => {
        return { ...state, pentris: false };
      })
      .addCase(openOldProjectsWindow, (state) => {
        return { ...state, "old-projects": true };
      })
      .addCase(closeOldProjectsWindow, (state) => {
        return { ...state, "old-projects": false };
      })
      .addCase(openAboutWindow, (state) => {
        return { ...state, about: true };
      })
      .addCase(closeAboutWindow, (state) => {
        return { ...state, about: false };
      })
      .addCase(openSpotifyWindow, (state) => {
        return { ...state, spotify: true };
      })
      .addCase(closeSpotifyWindow, (state) => {
        return { ...state, spotify: false };
      })
      .addCase(appWindowClicked, (state, { payload }) => {
        const zOrder = [...state.appZOrder];
        const index = zOrder.indexOf(payload);
        if (index > -1) {
          zOrder.splice(index, 1);
          zOrder.push(payload);
        }
        return { ...state, appZOrder: zOrder };
      });
  }
);

export { windows };
