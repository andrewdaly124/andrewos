import { StoreState } from "../types";

export const getPepperWindowOpen = ({ windows }: StoreState) =>
  windows["pepper-pics"];

export const getChessWindowOpen = ({ windows }: StoreState) => windows.chess;

export const getPentrisWindowOpen = ({ windows }: StoreState) =>
  windows["pentris"];

export const getOldProjectsWindowOpen = ({ windows }: StoreState) =>
  windows["old-projects"];

export const getAboutWindowOpen = ({ windows }: StoreState) => windows.about;

export const getSpotifyWindowOpen = ({ windows }: StoreState) =>
  windows.spotify;

export const getAppZOrder = ({ windows }: StoreState) => windows.appZOrder;
