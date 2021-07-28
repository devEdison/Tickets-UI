import * as types from "../action-types";
import { getToken, getUser} from "@/utils/auth";

const initUserInfo = {
  name: "",
  userName: getUser(),
  role: "",
  avatar:"",
  token: getToken(),
  email:"",
};
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token,
        userName: action.userName
      };
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        name: action.name,
        role: action.roles[0].rolName,
        avatar: action.image,
        email: action.email,
      };
    case types.USER_RESET_USER:
      return {};
    default:
      return state;
  }
}
