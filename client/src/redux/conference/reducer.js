import { SET_CURRENT_CONTENT, SET_CONTENTS } from "../types";
import { TOGGLE_CONFERENCE_MODAL, ON_LEAVE_CONFERENCE_ROOM } from "./../types";

const initialState = {
  contents: null,
  currentContent: null,
  openConference: false,
};

const conference = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CONTENTS:
      return {
        ...state,
        contents: payload,
      };
    case SET_CURRENT_CONTENT:
      return {
        ...state,
        currentContent: payload,
      };
    case TOGGLE_CONFERENCE_MODAL:
      return {
        ...state,
        openConference: !state.openConference,
      };
    case ON_LEAVE_CONFERENCE_ROOM:
      return {
        ...state,
        contents: null,
        currentContent: null,
        openConference: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default conference;
