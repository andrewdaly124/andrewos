import { combineReducers } from "redux";

import ui from "./ui";
import windows from "./windows";

const reducers = combineReducers({
  ui,
  windows,
});

export default reducers;
