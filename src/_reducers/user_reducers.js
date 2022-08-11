import {
  AUTH_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case USER_REGISTER:
      return { ...state, register: action.payload };
      break;
    case USER_LOGIN:
      return { ...state, loginSuccess: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    case USER_LOGOUT:
      return { ...state };
      break;
    default:
      return state;
  }
}
