import { produce } from "immer";
import { initialRoomData } from "../API/data";
import { ROOM_CREATE, ROOM_JOIN } from "../actions/index";

function roomReducer(state = initialRoomData, action) {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case ROOM_CREATE:
        draft.admin = payload.admin;
        draft.createAt = new Date().getTime();
        draft.name = payload.name;
        draft.members.push(payload.member);
        break;

      default:
        return draft;
    }
  });
}

export default roomReducer;
