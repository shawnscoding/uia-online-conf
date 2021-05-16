export const authActionTypes = {
  LOAD_USER: "LOAD_USER",
  USER_LOGIN_START: "USER_LOGIN_START",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE: "USER_LOGIN_FAILURE",
  USER_LOGOUT: "USER_LOGOUT",
  USER_LOAD_SUCCESS: "USER_LOAD_SUCCESS",
  USER_LOAD_FAILURE: "USER_LOAD_FAILURE",
  USER_LOAD_FAILURE: "USER_LOAD_FAILURE",
  USER_AUTHRIZATION_FAILED: "USER_AUTHRIZATION_FAILED",
};

export const loadUser = () => ({
  type: authActionTypes.LOAD_USER,
});

export const authrizationFailed = () => ({
  type: authActionTypes.USER_AUTHRIZATION_FAILED,
});

export const loadUserfailure = () => ({
  type: authActionTypes.USER_LOAD_FAILURE,
});

export const userLoginStart = (payload) => ({
  type: authActionTypes.USER_LOGIN_START,
  payload,
});

export const userLoginSuccess = (user) => ({
  type: authActionTypes.USER_LOGIN_SUCCESS,
  payload: user,
});

export const userLoginfailure = (error) => ({
  type: authActionTypes.USER_LOGIN_FAILURE,
  payload: error,
});

export const userLogOut = () => ({
  type: authActionTypes.USER_LOGOUT,
});

export const userLoadSuccess = (payload) => ({
  type: authActionTypes.USER_LOAD_SUCCESS,
  payload,
});
