import { createAction } from "@reduxjs/toolkit";

function windowsActionType(type: string) {
  return `WINDOWS_${type}`;
}

// HI PEPPER
export const openPepperWindow = createAction<void>(
  windowsActionType("open_pepper_window")
);
export const closePepperWindow = createAction<void>(
  windowsActionType("close_pepper_window")
);

// CHESS
export const openChessWindow = createAction<void>(
  windowsActionType("open_chess_window")
);
export const closeChessWindow = createAction<void>(
  windowsActionType("close_chess_window")
);

// PENTRIS
export const openPentrisWindow = createAction<void>(
  windowsActionType("open_pentris_window")
);

export const closePentrisWindow = createAction<void>(
  windowsActionType("close_pentris_window")
);

// OLD PROJECTS
export const openOldProjectsWindow = createAction<void>(
  windowsActionType("open_old_projects_window")
);

export const closeOldProjectsWindow = createAction<void>(
  windowsActionType("close_old_projects_window")
);

// ABOUT
export const openAboutWindow = createAction<void>(
  windowsActionType("open_about_window")
);

export const closeAboutWindow = createAction<void>(
  windowsActionType("close_about_window")
);
