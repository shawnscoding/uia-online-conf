import { all, call } from "redux-saga/effects";
import auth from "./auth/sagas";
import conference from "./conference/sagas";

export default function* rootSage() {
  yield all([call(auth), call(conference)]);
}
