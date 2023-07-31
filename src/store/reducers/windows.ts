import { createReducer } from "@reduxjs/toolkit";

import { deepCopy } from "../../utils/typeUtils";
import {
  closeAboutWindow,
  closeChessWindow,
  closeOldProjectsWindow,
  closePentrisWindow,
  closePepperWindow,
  openAboutWindow,
  openChessWindow,
  openOldProjectsWindow,
  openPentrisWindow,
  openPepperWindow,
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
      });
  }
);

export default windows;
