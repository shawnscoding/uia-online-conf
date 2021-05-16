import { OPEN_ALERT_AND_SET_ITS_CONTENT } from "../types";
import store from "./../store";

export const modalActionTypes = {
  TOGGLE_VIDEO: "TOGGLE_VIDEO",
};

export const toggleVideoModal = () => ({
  type: modalActionTypes.TOGGLE_VIDEO,
});

export const openAlertAndSetItsContent = (payload) => ({
  type: OPEN_ALERT_AND_SET_ITS_CONTENT,
  payload,
});

export const getUserStatus = () => {
  const isOpen = store.getState().opener.inviteAlert;
  console.log(isOpen, "isOpen");
  return isOpen;
};
