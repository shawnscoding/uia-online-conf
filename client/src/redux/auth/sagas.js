import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  authActionTypes,
  userLoginSuccess,
  userLoginfailure,
  userLoadSuccess,
  loadUserfailure,
  loadUser as loadUserAciton,
} from "./actions";
import { apiClient, authPaths, mainPaths } from "./../../utils/data/api";
import { FETCH_ALERT } from "./../types";

// api
export function* loadUser(action) {
  try {
    if (localStorage.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const res = yield apiClient.get(`${authPaths["load"].get}`, config);

      yield put(userLoadSuccess({ user: res.data }));

      const alerts = yield apiClient.get(
        `${mainPaths["getAlerts"].get}`,
        config
      );

      yield put({ type: FETCH_ALERT, payload: alerts.data });
    } else {
      yield put(loadUserfailure());
    }
  } catch (err) {
    console.log("err");
    console.log(err);

    if (err.response.data.errors) {
      const { errors } = err.response.data;
      console.log(errors[0].message, "in loaduser");
    }
    yield put(loadUserfailure());
  }
}

export function* logUserIn({ payload }) {
  const { form, staySignIn } = payload;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(form);
  try {
    const res = yield apiClient.post(
      `${authPaths["login"].post}`,
      body,
      config
    );
    console.log("res ::", res);
    console.log("res");
    if (res.data.token) {
      if (staySignIn) {
        yield localStorage.setItem("staySignIn", JSON.stringify(true));
      }
      yield put(userLoginSuccess({ token: res.data.token }));

      yield put(loadUserAciton());
    }
  } catch (err) {
    console.log("err.response : ", err.response);
    const error = err.response.data.error || 'Please check your ID or password again.'
    // if (err.response.data.error) {
    //   const { error } = err.response.data;
    //   alert(error);
    // }
    yield put(
      userLoginfailure({ error })
    );
  }
}

// listeners

export function* onLoginUser() {
  yield takeLatest(authActionTypes.USER_LOGIN_START, logUserIn);
}

export function* onIfUserLoggedIn() {
  yield takeLatest(authActionTypes.LOAD_USER, loadUser);
}

// compose

export default function* auth() {
  yield all([call(onLoginUser), call(onIfUserLoggedIn)]);
}

