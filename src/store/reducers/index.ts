import { combineReducers } from "redux";

import { ui } from "./ui";
import { windows } from "./windows";

const rootReducer = combineReducers({
  ui,
  windows,
});

export { rootReducer };
