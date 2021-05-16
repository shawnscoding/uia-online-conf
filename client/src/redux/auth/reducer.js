import { authActionTypes } from "./actions";
import {
  SET_FILTERED_ALERTLIST,
  FETCH_ALERT,
  FIRST_VALIDATION_RUNNED,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  authenticated: false,
  error: null,
  signInModalOpen: true,
  loading: true,
  alerts: null,
  numOfValidation: 0,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authActionTypes.USER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
      };
    case authActionTypes.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        authenticated: true,
        signInModalOpen: false,
      };
    case FETCH_ALERT:
      return {
        ...state,
        alerts: payload,
      };
    case FIRST_VALIDATION_RUNNED:
      return {
        ...state,
        numOfValidation: (state.numOfValidation = state.numOfValidation + 1),
      };
    case SET_FILTERED_ALERTLIST:
      return {
        ...state,
        alerts: payload,
      };

    case authActionTypes.USER_LOGIN_FAILURE:
      localStorage.removeItem("token");
      localStorage.removeItem("staySignIn");
      return {
        ...state,
        token: null,
        user: null,
        error: payload.error,
        authenticated: false,
        loading: false,
        signInModalOpen: true,
      };
    case authActionTypes.USER_LOGOUT:
    case authActionTypes.USER_LOAD_FAILURE:
    case authActionTypes.USER_AUTHRIZATION_FAILED:
      localStorage.removeItem("token");
      localStorage.removeItem("staySignIn");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: false,
        loading: false,
        signInModalOpen: true,
      };
    default:
      return state;
  }
};

export default auth;
