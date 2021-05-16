import {
  LOBBY_SECOND_LOADER_CLOSE,
  SET_LOBBY_LOADER_READY,
  CLOSE_ROOM_LOADER,
  OPEN_ROOM_LOADER,
  INTROLOADBAR_UNMOUNTED,
  LOBBY_LOADBAR_WILLMOUNT,
} from "../types";

const initalState = {
  lobbySecondLoader: {
    ready: false,
    open: true,
  },
  loadbarUnmounted: false,
  roomLoaderOpen: true,
};

const loader = (state = initalState, action) => {
  const { type } = action;
  switch (type) {
    case LOBBY_SECOND_LOADER_CLOSE:
      return {
        ...state,
        lobbySecondLoader: {
          ...state.lobbySecondLoader,
          open: false,
        },
      };
    case SET_LOBBY_LOADER_READY:
      return {
        ...state,
        lobbySecondLoader: {
          ready: true,
          open: true,
        },
      };
    case INTROLOADBAR_UNMOUNTED:
      return {
        ...state,
        loadbarUnmounted: true,
      };
    case LOBBY_LOADBAR_WILLMOUNT:
      return {
        ...state,
        loadbarUnmounted: false,
      };
    case CLOSE_ROOM_LOADER:
      return {
        ...state,
        roomLoaderOpen: false,
        loadbarUnmounted: true,
      };
    case OPEN_ROOM_LOADER:
      return {
        ...state,
        roomLoaderOpen: true,
        loadbarUnmounted: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default loader;
