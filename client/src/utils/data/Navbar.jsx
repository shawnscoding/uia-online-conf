import React from "react";

import { v4 as uuidv4 } from "uuid";
import EventIcon from "@material-ui/icons/Event";
import NotificationsIcon from "@material-ui/icons/Notifications";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

export const content = {
  logo: "ULA Associations",
  title: "Virtual Round Table 2020",
};

export const mainRoutes = {
  lobby: {
    label: "Lobby",
    path: "/",
    link: "/",
    class: "lobby",
    id: uuidv4(),
  },
  conference: {
    label: "Conference Hall",
    path: "/conference",
    link: "/conference",
    class: "hall",
    id: uuidv4(),
  },
  roomOne: {
    label: "Workshop Room 1",
    path: "/workshop/:room",
    link: "/workshop/room1",
    class: "room",
    id: uuidv4(),
  },
  roomTwo: {
    label: "Workshop Room 2",
    path: "/workshop/:room",
    link: "/workshop/room2",
    class: "room",
    id: uuidv4(),
  },
  roomThree: {
    label: "Workshop Room 3",
    path: "/workshop/:room",
    link: "/workshop/room3",
    class: "room",
    id: uuidv4(),
  },
  theater: {
    label: "Theater",
    path: "/theater",
    link: "/theater",
    class: "theater",

    id: uuidv4(),
  },
  seoul: {
    label: "Seoul Booth",
    path: "/seoul",
    link: "/seoul",
    class: "booth",
    id: uuidv4(),
  },
  lounge: {
    label: "Lounge",
    path: "/lounge",
    link: "/lounge",
    class: "lounge",
    id: uuidv4(),
  },
};

export const infoRoutes = {
  programInfo: {
    label: "Programme Info",
    to: "info",
    icon: <EventIcon />,
    id: uuidv4(),
  },
  alert: {
    label: "Notice List",
    to: "notice",
    icon: <NotificationsIcon />,
    id: uuidv4(),
  },

  event: {
    label: "Event",
    to: "event",
    icon: <NotificationsIcon />,
    id: uuidv4(),
  },

  support: {
    label: "Tech Support",
    to: "support",
    open: false,
    icon: <QuestionAnswerIcon />,
    id: uuidv4(),
  },
};

export const redirect = {
  default: {
    path: "/",
    link: "/",
  },
};

export const userRoutes = {
  profile: {
    path: "/profile",
    link: "/profile",
  },
};
