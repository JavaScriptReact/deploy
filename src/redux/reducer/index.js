import { combineReducers } from "redux";
import user from "./user";
import room from "./room";

const Reducer = combineReducers({
  user,
  room,
});

export default Reducer;
