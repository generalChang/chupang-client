import {
  ADD_TO_CART,
  AUTH_USER,
  GET_CART_ITEMS,
  REMOVE_FROM_CART,
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
        // cart값을 언제든 빼다쓸수있다.
      };
      break;
    case GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload.products,
        // cartDetail을 어디서든 빼다쓸수있다.
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartDetail: action.payload.productInfo,
        userData: { ...state.userData, cart: action.payload.cart },
      };
    default:
      return state;
  }
}
