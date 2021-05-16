import {
  OPEN_STAMP,
  CLOSE_STAMP,
  TOGGLE_EVENTLIST,
  OPEN_NAVBAR,
  LAZYLOAD_NAVBAR,
  CANCEL_DELAY_NAVBAR,
  TOGGLE_INFO,
  OPEN_ALERT_AND_SET_ITS_CONTENT,
  OPEN_SURVEY,
  CLOSE_SURVEY,
  CLOSE_ALERT_AND_DELETE_ITS_CONTENT,
  HANDLE_CLOSE_JOINALERT,
  HANDLE_OPEN_JOINALERT,
  OPEN_ONE_TO_ONE_CHAT,
  CLOSE_ONE_TO_ONE_CHAT,
  CLOSE_UPRISM_GUIDE,
  OPEN_UPRISM_GUIDE,
  TOGGLE_GUIDE_MODAL,
  OPEN_RESPONSE_ALERT,
  CLOSE_RESPONSE_ALERT,
  TOGGLE_TECH_SUPPORT,
} from "./../types";
import { detectCookieForGuide } from "./../../utils/helper";

const initialState = {
  openTechSupport: false,
  openStamp: false,
  openEventlist: false,
  openInfo: false,
  openSurvey: false,
  openGuideModal: false,
  navbarLazyloader: {
    open: true,
  },
  openAlertBox: false,
  alertContent: null,
  inviteAlert: {
    open: false,
    msg: "someone is inviting you, would you like to join ?",
    sender: null,
    targetUserId: null,
  },
  openLoungeUprism: false,
  loungeUprism_link: null,
  renderGuide: detectCookieForGuide(),
  responseAlert: {
    open: false,
    msg: null,
    header: "Alert",
  },
};

const opener = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_GUIDE_MODAL:
      return {
        ...state,
        openGuideModal: !state.openGuideModal,
      };

    case TOGGLE_TECH_SUPPORT:
      return {
        ...state,
        openTechSupport: !state.openTechSupport,
      };
    case CLOSE_RESPONSE_ALERT:
      return {
        ...state,
        responseAlert: {
          open: false,
          msg: null,
          header: "Alert",
        },
      };

    case OPEN_RESPONSE_ALERT:
      return {
        ...state,
        responseAlert: {
          open: true,
          msg: payload.msg,
          header: payload.header || "Alert",
        },
      };
    case CLOSE_UPRISM_GUIDE:
      return {
        ...state,
        renderGuide: false,
      };
    case OPEN_UPRISM_GUIDE:
      return {
        ...state,
        renderGuide: true,
      };
    case TOGGLE_INFO:
      return {
        ...state,
        openInfo: !state.openInfo,
      };
    case OPEN_ALERT_AND_SET_ITS_CONTENT:
      return {
        ...state,
        openAlertBox: true,
        alertContent: payload,
      };
    case CLOSE_ALERT_AND_DELETE_ITS_CONTENT:
      return {
        ...state,
        openAlertBox: false,
        alertContent: null,
      };
    case LAZYLOAD_NAVBAR:
      return {
        ...state,
        navbarLazyloader: {
          open: false,
        },
      };
    case OPEN_NAVBAR: {
      return {
        ...state,
        navbarLazyloader: {
          open: true,
        },
      };
    }
    case CANCEL_DELAY_NAVBAR:
      return {
        ...state,
        navbarLazyloader: {
          open: true,
        },
      };

    case OPEN_STAMP:
      return {
        ...state,
        openStamp: true,
        openEventlist: false,
      };
    case CLOSE_STAMP:
      return {
        ...state,
        openStamp: false,
      };
    case OPEN_SURVEY:
      return {
        ...state,
        openSurvey: true,
        openEventlist: false,
      };
    case CLOSE_SURVEY:
      return {
        ...state,
        openSurvey: false,
      };
    case TOGGLE_EVENTLIST:
      return {
        ...state,
        openEventlist: !state.openEventlist,
      };

    case HANDLE_CLOSE_JOINALERT:
      return {
        ...state,
        inviteAlert: {
          ...state.inviteAlert,
          sender: null,
          targetUserId: null,
          open: false,
        },
      };
    case HANDLE_OPEN_JOINALERT:
      return {
        ...state,
        inviteAlert: {
          ...state.inviteAlert,
          sender: payload.sender,
          targetUserId: payload.targetUserId,
          open: true,
        },
      };
    case OPEN_ONE_TO_ONE_CHAT:
      return {
        ...state,
        openLoungeUprism: true,
        loungeUprism_link: payload,
      };
    case CLOSE_ONE_TO_ONE_CHAT:
      return {
        ...state,
        openLoungeUprism: false,
        loungeUprism_link: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default opener;
