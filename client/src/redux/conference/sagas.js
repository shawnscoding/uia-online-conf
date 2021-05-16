import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  conferenceActionTypes,
  fetchMeetingListSuccess,
  fetchMeetingListFailure,
} from "./actions";
import { apiClient } from "./../../utils/data/api";

export function* requestFetch() {
  try {
    const res = yield apiClient.get("/conference");
    yield put(fetchMeetingListSuccess({ meetingList: res.data }));
  } catch (err) {
    // haven't decided how to deal with error
    console.log(err);
    yield put(fetchMeetingListFailure({ error: err }));
  }
}

export function* onFetchMeetingList() {
  yield takeLatest(
    conferenceActionTypes.FETCH_MEETING_LIST_START,
    requestFetch
  );
}

export default function* conference() {
  yield all([call(onFetchMeetingList)]);
}
