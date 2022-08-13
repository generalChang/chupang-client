import axios from "axios";
import { USER_SERVER } from "../components/Config";
import {
  ADD_TO_CART,
  AUTH_USER,
  GET_CART_ITEMS,
  REMOVE_FROM_CART,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "./types";

export function register(body) {
  const request = axios
    .post(`${USER_SERVER}/register`, body)
    .then((result) => result.data);

  return {
    type: USER_REGISTER,
    payload: request,
  };
}

export function login(body) {
  const request = axios
    .post(`${USER_SERVER}/login`, body)
    .then((result) => result.data);

  return {
    type: USER_LOGIN,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((result) => result.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logout() {
  const request = axios
    .get(`${USER_SERVER}/register`)
    .then((result) => result.data);

  return {
    type: USER_LOGOUT,
    payload: request,
  };
}

export function addToCart(id) {
  const request = axios
    .post(`${USER_SERVER}/addToCart`, { productId: id })
    .then((result) => result.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItemsId, cart) {
  const request = axios
    .get(`/api/product/productById?type=array&id=${cartItemsId}`)
    .then((result) => {
      cart.forEach((cartItem, index) => {
        result.data.products.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            result.data.products[index].quentity = cartItem.quentity;
          }
        });
      });

      return result.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeProductFromCart(productId) {
  const request = axios
    .get(`${USER_SERVER}/removeFromCart?productId=${productId}`)
    .then((result) => {
      result.data.cart.forEach((item, index) => {
        result.data.productInfo.forEach((product, index) => {
          if (product._id === item.id) {
            result.data.productInfo[index].quentity = item.quentity;
          }
        });
      });

      return result.data;
    });

  return {
    type: REMOVE_FROM_CART,
    payload: request,
  };
}
