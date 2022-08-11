import axios from "axios";
import { USER_SERVER } from "../components/Config";
import { AUTH_USER, USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "./types";

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
