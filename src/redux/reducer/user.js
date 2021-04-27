import { produce } from "immer";
import { initialUserData } from "../API/data";
import { USER_SIGN, USER_VERIFY, USER_LOGIN } from "../actions/index";

function user(state = initialUserData, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case USER_SIGN:
        draft.signed = true;
        draft.method = "sign-up";
        draft.token = action.payload.token;
        draft.data = action.payload.user;
        draft.id = action.payload.user.id;
        break;

      case USER_VERIFY:
        draft.signed = true;
        draft.method = "verify";
        draft.token = action.payload.token;
        draft.data = action.payload.data;
        draft.id = action.payload.data.id;
        break;

      case USER_LOGIN:
        draft.signed = true;
        draft.method = "login";
        draft.token = action.payload.token;
        draft.data = action.payload.user;
        break;

      default:
        return draft;
    }
  });
}

export default user;
