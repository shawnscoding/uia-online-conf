import axios from "axios";

const config = require("../../config/config");
const baseURL = config.apiBaseUrl;

export const theaterPaths = {
  // 소현님 5개 카테고리 이미지 랜더링
  getAllCategoryImgs: {
    get: "/theater",
  },
  // !!! 소현님 setOpen 과 함께 사용해야됨
  // setApi({ get:  "/theater/1" })
  // 내용물이 이 value 가 되도록 세팅해주시면 됩니다 !
  getCategoryOneInTheater: {
    get: "/theater/1",
  },
  getCategoryTwoInTheater: {
    get: "/theater/2",
  },
  getCategoryThreeInTheater: {
    get: "/theater/3",
  },
  getCategoryFourInTheater: {
    get: "/theater/4",
  },
  getCategoryFiveInTheater: {
    get: "/theater/5",
  },
};

export const mainPaths = {
  stamp: {
    get: "/stamp",
    post: "/stamp",
  },
  getBrochures: {
    get: "/brochure",
  },
  conference: {
    get: "/conference",
  },
  notice: {
    get: "/notice",
  },
  getProgramImgLinks: {
    get: "/program",
  },

  getTopics: {
    get: "/workshop",
  },
  getAlerts: {
    get: "/alert",
  },
  getUprismInlounge: {
    get: "/lounge",
  },
  getSurveyLink: {
    get: "/survey",
  },
  videochatRequest: {
    post: "/chat/userVideoChat",
  },
  joinChatQA: {
    post: "/chat/qaVideoChat",
  },
  getUserList: {
    get: "/user",
  },
};

export const authPaths = {
  login: {
    post: "/login",
  },
  load: {
    get: "/me",
  },
  resetPassword: {
    post: "/user/resetPassword",
  },
  changePassword: {
    post: "/user/changePassword",
  },
};

export const apiClient = axios.create({
  baseURL: baseURL,
});
