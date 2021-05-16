export const conferenceActionTypes = {
  FETCH_MEETING_LIST_START: "FETCH_MEETING_LIST_START",
  FETCH_MEETING_LIST_SUCCESS: "FETCH_MEETING_LIST_SUCCESS",
  FETCH_MEETING_LIST_FAILURE: "FETCH_MEETING_LIST_FAILURE",
};

// payload might be needed
export const fetchMeetingListStart = () => ({
  type: conferenceActionTypes.FETCH_MEETING_LIST_START,
});

export const fetchMeetingListSuccess = () => ({
  type: conferenceActionTypes.FETCH_MEETING_LIST_SUCCESS,
});

export const fetchMeetingListFailure = () => ({
  type: conferenceActionTypes.FETCH_MEETING_LIST_FAILURE,
});
