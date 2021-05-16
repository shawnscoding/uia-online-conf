import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, Redirect, useLocation } from "react-router-dom";
import { apiClient } from "../../utils/data/api";
import Workshop from "./../../WebGL/Page/Workshop";
import Modal from "./../modal/Modal";
import AlertModal from "./../modal/AlertModal";
import moment from "moment";
import Loadingbar from "../loaders/Loadingbar";
import { redirect } from "../../utils/data/Navbar";
import { useDispatch, connect } from "react-redux";
import { authrizationFailed } from "./../../redux/auth/actions";
import {
  SET_LOBBY_LOADER_READY,
  OPEN_ROOM_LOADER,
  CLOSE_ROOM_LOADER,
  OPEN_RESPONSE_ALERT,
} from "./../../redux/types";
import WorkshopUprism from "./../../components/modalContents/WorkshopUprism";
import { detectTokenError } from "./../../utils/helper";

const findTopicBytime = (topics) => {
  if (!topics && !topics.length) return;
  const topic = topics.find((topic) => {
    const { start_datetime, end_datetime } = topic;
    const isTrue = moment.utc().isBetween(start_datetime, end_datetime);
    // console.log(isTrue, "isTrue");
    // console.log("topic :", topic);
    // console.log("start_datetime :", start_datetime);
    // console.log("end_datetime :", end_datetime);
    // console.log("moment :", moment.utc().format());
    if (isTrue) {
      return topic;
    }
  });

  return topic;
};

const WorkshopPage = ({ roomLoaderOpen }) => {
  // !!!webgl 님 topic 에 커버 이미지 있습니다
  const [openUprism, setOpenUprism] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // !!! setOpen 가져가서 버튼 클릭시 setOpen(true) 로 만들어 주세요 !
  // const [topic, setTopic] = useState(null);
  const [notMatched, setnotMatched] = useState({
    defaultImg:
      "https://d2lx5o5tt1uoj2.cloudfront.net/workshop/workshop_break.png",
    status: false,
  });
  // const [loadbarOpen, setLoadbarOpen] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: OPEN_ROOM_LOADER });
  }, [location.pathname]);

  useEffect(() => {
    dispatch({ type: SET_LOBBY_LOADER_READY });
  }, []);

  const onCloseLoader = () => {
    dispatch({ type: CLOSE_ROOM_LOADER });
  };

  // useEffect(() => {
  //   // if (authenticated) {
  //   const getWorshopTopics = async () => {
  //     try {
  //       // if (localStorage.token) {
  //       //   const config = {
  //       //     headers: {
  //       //       Authorization: `Bearer ${localStorage.token}`,
  //       //     },
  //       //   };
  //       const res = await apiClient.get("/workshop");
  //       const topics = res.data;
  //       console.log("topics");
  //       console.log(topics);
  //       let topic;
  //       if (params.room === "room1") {
  //         const topicsArr = topics.filter((topic) => topic.room_no === 1);
  //         topic = findTopicBytime(topicsArr);
  //       } else if (params.room === "room2") {
  //         const topicsArr = topics.filter((topic) => topic.room_no === 2);
  //         topic = findTopicBytime(topicsArr);
  //       } else if (params.room === "room3") {
  //         const topicsArr = topics.filter((topic) => topic.room_no === 3);
  //         topic = findTopicBytime(topicsArr);
  //       } else {
  //         throw Error();
  //       }
  //       if (!topic) {
  //         console.log("runeed  ::", topic);

  //         setnotMatched({
  //           ...notMatched,
  //           status: true,
  //         });
  //       } else {
  //         setTopic(topic);
  //       }
  //       // } else {
  //       //   dispatch(authrizationFailed());
  //       // }
  //     } catch (err) {
  //       console.log(err, "err");
  //       if (err && err.response) {
  //         const code = err.response.data.code;
  //         const msg = err.response.data.error;
  //         if (detectTokenError(code)) {
  //           dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
  //           dispatch(authrizationFailed());
  //         }
  //       }
  //     }
  //   };
  //   getWorshopTopics();
  //   // }
  // }, [params]);

  const handleModalOpen = () => {
    setOpenUprism(true);
    // const startDate = moment.utc("2020-07-28T05:08:17.000Z").format();
    // const endDate = moment.utc("2020-07-28T12:08:17.000Z").format();
    // console.log("startDate  endDate");
    // console.log(startDate);
    // console.log(endDate);
    // console.log(moment.utc().format());
    //   if (notMatched.status) {
    //     dispatch({
    //       type: OPEN_RESPONSE_ALERT,
    //       payload: {
    //         msg:
    //           "There is no session at the moment.\nPlease check the program on the menu.",
    //       },
    //     });
    //     return;
    //   }
    //   const { start_datetime, end_datetime } = topic;
    //   const isTrue = moment.utc().isBetween(start_datetime, end_datetime);
    //   if (isTrue) {
    //     setOpenUprism(true);
    //   } else {
    //     setOpenAlert(true);
    //   }
    // };
    // const renderContents = () => {
    //   if (topic || notMatched.status) {
    //     return true;
    //   } else {
    //     return false;
    //   }
  };

  // if (!loading && !authenticated)
  //   return <Redirect to={redirect["default"].link} />;
  return (
    <>
      {roomLoaderOpen && <Loadingbar />}
      <Modal
        header="PLUS SEOUL VIDEO"
        component={WorkshopUprism}
        open={openUprism}
        setOpen={setOpenUprism}
      />

      {/* {renderContents() && ( */}
      <Workshop
        setLoadbarOpen={onCloseLoader}
        setOpen={handleModalOpen}
        // topic={topic}
        params={params}
        notMatched={notMatched}
      />
      {/* )} */}
    </>
  );
};

WorkshopPage.propTypes = {};

const mapStateToProps = (state) => ({
  roomLoaderOpen: state.loader.roomLoaderOpen,
});

export default connect(mapStateToProps)(WorkshopPage);
