import {
  ADD_TO_CART,
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
    case ADD_TO_CART:
      return {
        ...state,
        userData: { ...state.userData, cart: action.payload.cart },
      };
      break;
    default:
      return state;
  }
}
