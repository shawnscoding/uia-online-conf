import React, { useState, useEffect } from "react";
import { apiClient } from "../../utils/data/api";
import { mainPaths } from "./../../utils/data/api";
import Conference from "../../WebGL/Page/Conference";
import moment from "moment";
import ConferenceModal from "../modal/ConferenceModal";
import LecturerModal from "../modal/LecturerModal";
import ConferenceVideoListModal from "../modal/ConferenceVideoListModal";
import { authrizationFailed } from "./../../redux/auth/actions";
import { useDispatch, connect } from "react-redux";
import {
  SET_CURRENT_CONTENT,
  TOGGLE_CONFERENCE_MODAL,
  OPEN_RESPONSE_ALERT,
  SET_CONTENTS,
  ON_LEAVE_CONFERENCE_ROOM,
} from "../../redux/types";
import store from "./../../redux/store";
import { detectTokenError } from "./../../utils/helper";
import ConferenceUprism from "./../../components/modalContents/ConferenceUprism";
import Modal from "./../modal/Modal";

const ConferencePage = ({
  // contents,
  open,
  // currentContent,
  // authenticated,
  setLoadbarOpen,
}) => {
  // const [contents, setContents] = useState(null);
  // const [currentContent, setCurrentContent] = useState(null);
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (authenticated) {
  //     const getConference = async () => {
  //       try {
  //         if (localStorage.token) {
  //           const config = {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.token}`,
  //             },
  //           };

  //           const res = await apiClient.get(
  //             mainPaths["conference"].get,
  //             config
  //           );
  //           const contents = res.data;

  //           // // this is for test
  //           // const today = moment().format();
  //           // const test = today.slice(5, 10);
  //           // const tests = contents.map((content) => {
  //           //   const {
  //           //     start_datetime,
  //           //     action_link,
  //           //     subject,
  //           //     idx,
  //           //     type,
  //           //   } = content;
  //           //   let firstPart = start_datetime.substr(0, 5);
  //           //   let lastPart = start_datetime.substr(10);

  //           //   let newString = firstPart + test + lastPart;
  //           //   return { idx, action_link, type, start_datetime };
  //           // });

  //           // console.log("convent to today for test------");
  //           // console.log(tests);

  //           // const formattedContent = contents.map((content) => {
  //           //   const { start_datetime, end_datetime } = content;
  //           //   const firstPart = start_datetime.substr(0, 5);
  //           //   const lastPart = start_datetime.substr(10);

  //           //   const newString = firstPart + test + lastPart;

  //           //   const first = end_datetime.substr(0, 5);
  //           //   const last = end_datetime.substr(10);

  //           //   const newEnd = first + test + last;
  //           //   return {
  //           //     ...content,
  //           //     start_datetime: newString,
  //           //     end_datetime: newEnd,
  //           //   };
  //           // });
  //           dispatch({
  //             type: SET_CONTENTS,
  //             payload: contents,
  //           });
  //           // setContents(contents);

  //           const content = getCurrentContentByTime(contents);

  //           if (content) {
  //             dispatch({
  //               type: SET_CURRENT_CONTENT,
  //               payload: content,
  //             });
  //             // setCurrentContent(content);
  //           }
  //         } else {
  //           dispatch(authrizationFailed());
  //         }
  //       } catch (err) {
  //         console.log(err, "err");
  //         if (err && err.response) {
  //           const code = err.response.data.code;
  //           const msg = err.response.data.error;
  //           if (detectTokenError(code)) {
  //             dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
  //             dispatch(authrizationFailed());
  //           }
  //         }
  //       }
  //     };
  //     getConference();
  //   }
  // }, [authenticated]);

  // let intervalVar;

  // const getCurrentContentByTime = (contents) => {
  //   // console.log("contents-------");
  //   // console.log(contents);
  //   const content = contents.find((content) => {
  //     const { start_datetime, end_datetime } = content;

  //     const startDate = moment.utc(start_datetime).format();
  //     const endDate = moment.utc(end_datetime).format();
  //     // console.log("startDate  endDate");
  //     // console.log(startDate);
  //     // console.log(endDate);
  //     // console.log(moment.utc().format());
  //     const isTrue = moment.utc().isBetween(startDate, endDate);
  //     // console.log("isTrue");
  //     // console.log(isTrue);
  //     if (isTrue) {
  //       return content;
  //     }
  //   });
  //   return content;
  // };

  // const setTimer = () => {
  //   if (contents && contents.length) {
  //     intervalVar = setInterval(() => {
  //       for (let i = 0; i < contents.length; i++) {
  //         const { start_datetime, end_datetime } = contents[i];
  //         const startDate = moment.utc(start_datetime).format();
  //         const endDate = moment.utc(end_datetime).format();
  //         const isTrue = moment.utc().isBetween(startDate, endDate);
  //         // console.log("startDate ::", startDate);
  //         // console.log("endDate ::", endDate);
  //         // console.log("utc time now", moment.utc().format());
  //         // console.log("isTrue ::", isTrue);
  //         if (isTrue) {
  //           dispatch({
  //             type: SET_CURRENT_CONTENT,
  //             payload: contents[i],
  //           });
  //         }
  //       }

  //       // const startDate = moment.utc(from).format();
  //       // const endDate = moment.utc(to).format();
  //       // const isTrue = moment.utc().isBetween(startDate, endDate);
  //       // const TR = moment.utc().isBetween(fromfr, toto);
  //       // console.log("called", i);
  //       // if (TR) {
  //       //   console.log("called 2");
  //       //   return contents[4];

  //       //   // console.log("picked content", contents[4]);
  //       //   // return contents[0];
  //       // }
  //       // if (result) {
  //       //   // dispatch({
  //       //   //   type: SET_CURRENT_CONTENT,
  //       //   //   payload: result,
  //       //   // });
  //       //   // setCurrentContent(content);
  //       //   // setCurrentContent(contents[2]);
  //       // } else {
  //       //   // matching content 가 있다가 없으면 setConrrentContent null 로 세팅
  //       //   // 유저 시청중 시간이 끝날 경우 강제종료
  //       //   // setOpen(false);
  //       //   // setCurrentContent(null);
  //       // }
  //       // !!!! editing
  //     }, 60000);
  //   }
  // };

  // useEffect(() => {
  //   if (contents) {
  //     console.log("currentContent in useEff");
  //     console.log(currentContent);
  //     setTimer();
  //   }
  //   return () => {
  //     console.log("called in useEffect return");
  //     clearInterval(intervalVar);
  //     // dispatch({
  //     //   type: ON_LEAVE_CONFERENCE_ROOM,
  //     // });
  //   };
  // }, [contents]);

  useEffect(() => {
    return () => {
      dispatch({
        type: ON_LEAVE_CONFERENCE_ROOM,
      });
    };
  }, []);

  const handleModalOpen = () => {
    window.open(
      "https://zoom.us/j/94294059063?pwd=d1l2azN1UXpkcTFCUXY2OUxGcktKQT09 ",
      "_blank"
    );
    // dispatch({
    //   type: TOGGLE_CONFERENCE_MODAL,
    // });
    // let copiedContent;
    // setCurrentContent((prev) => {
    //   copiedContent = prev;
    //   return prev;
    // });
    // const currentContent = store.getState().conference.currentContent;
    // if (!currentContent) {
    //   dispatch({
    //     type: OPEN_RESPONSE_ALERT,
    //     payload: { msg: "Sorry, All conference has been completed" },
    //   });
    //   return;
    // }
    // if (currentContent.type === "break") {
    //   dispatch({
    //     type: OPEN_RESPONSE_ALERT,
    //     payload: {
    //       msg:
    //         "There is no session at the moment.\nPlease check the program on the menu.",
    //     },
    //   });
    //   return;
    // } else {
    //   dispatch({
    //     type: TOGGLE_CONFERENCE_MODAL,
    //   });
    // }
    // if (!currentContent) {
    //   setnoMacthContent(true);
    //   return;
    // }
    // const { type } = currentContent;
    // console.log("currentContent:   ", currentContent);
    // console.log("type  :: ", type);
    // console.log("utc time now :   ", moment.utc().format());
    // if (type === "break") {
    //   setAlertOpen(true);
    // } else if (type === "live") {
    //   setOpen(true);
    // } else if (type === "video") {
    //   setOpen(true);
    // } else if (type === "notice") {
    //   setAlertOpen(true);
    // } else {
    //   throw Error();
    // }
  };

  const handleToggleInfo = () => {
    // 지난 비디오 보기로 재정의.

    // alert('program info');
    setOpenConferenceVideoList(true);
    // dispatch({
    //   type: OPEN_RESPONSE_ALERT,
    //   payload: {
    //     msg: "This is not available now",
    //   },
    // });
  };

  const setOpenLecturer = (bool) => {
    setOpenLecturerModal(true);
    console.log("openLecturerModal ::", openLecturerModal);
  };

  // for welgl test
  // const setNextContent = () => {
  //   console.log("contents");
  //   console.log(contents);
  //   setCurrentContent({
  //     action_link: "https://player.vimeo.com/video/276012526?autoplay=1&loop=1",
  //     cover_link:
  //       "https://d2lx5o5tt1uoj2.cloudfront.net/conference/cover/video12.png",
  //     end_datetime: "2020-08-21T05:05:00.000Z",
  //     idx: 67,
  //     start_datetime: "2020-08-21T05:00:00.000Z",
  //     subject: "Round Table 3 / ('20) Mr Ryan Brubaker - 발표",
  //     type: "video",
  //   });
  // };

  const [openConferenceVideoList, setOpenConferenceVideoList] = useState(false);
  const [openLecturerModal, setOpenLecturerModal] = useState(false);

  const handleCloseUprism = () => {
    dispatch({
      type: TOGGLE_CONFERENCE_MODAL,
    });
  };

  return (
    <React.Fragment>
      <Conference
        setLoadbarOpen={setLoadbarOpen}
        setOpen={handleModalOpen}
        // currentContent={currentContent}
        handleToggleInfo={handleToggleInfo}
        setOpenLecturer={setOpenLecturer}
      />

      <Modal
        header="AFTER MOVIE"
        component={ConferenceUprism}
        open={open}
        setOpen={handleCloseUprism}
        // uprism_link={content.action_link}
      />
      {openLecturerModal && (
        <LecturerModal
          openLecturerModal={openLecturerModal}
          setOpenLecturerModal={setOpenLecturerModal}
        />
      )}

      {openConferenceVideoList && (
        <ConferenceVideoListModal
          openConferenceVideoList={openConferenceVideoList}
          setOpenConferenceVideoList={setOpenConferenceVideoList}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  contents: state.conference.contents,
  currentContent: state.conference.currentContent,
  open: state.conference.openConference,
});

ConferencePage.propTypes = {};

export default connect(mapStateToProps)(ConferencePage);
