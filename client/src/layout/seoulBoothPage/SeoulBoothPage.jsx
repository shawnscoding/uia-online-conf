import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SeoulBooth from "../../WebGL/Page/SeoulBooth";
import Brochure from "../../components/modalContents/Brochure";
import Modal from "./../modal/Modal";
import { apiClient } from "../../utils/data/api";
import { authrizationFailed } from "./../../redux/auth/actions";
import { useDispatch } from "react-redux";
import { detectTokenError, detectTimeMatching } from "./../../utils/helper";
import { TOGGLE_EVENTLIST, OPEN_RESPONSE_ALERT } from "../../redux/types";
import SeoulUprism from "./../../components/modalContents/SeoulUprism";
import moment from "moment";

const SeoulBoothPage = ({ setLoadbarOpen }) => {
  // @@@webgl brochures contains brochures
  const [open, setOpen] = useState(false);
  const [qa, setQa] = useState({
    open: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // if (authenticated) {
    const getSeoulBooth = async () => {
      try {
        // if (localStorage.token) {
        //   const config = {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.token}`,
        //     },
        //   };
        // const res = await apiClient.get("/onlineQA");
        // console.log("res ::", res.data[0]);
        // setQa({ ...qa, ...res.data[0] });
        // } else {
        //   dispatch(authrizationFailed());
        // }
      } catch (err) {
        console.log(err, "err");
        if (err && err.response) {
          const code = err.response.data.code;
          const msg = err.response.data.error;
          if (detectTokenError(code)) {
            dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
            // dispatch(authrizationFailed());
          }
        }
      }
    };
    getSeoulBooth();
    // }
  }, []);

  const toggleEventlist = () => {
    dispatch({
      type: TOGGLE_EVENTLIST,
    });
  };

  const handleCloseGroupChat = () => {
    setQa({
      ...qa,
      open: false,
    });
  };

  const onOpenGroupChat = () => {
    // let groupChat;
    // setQa((prev) => {
    //   groupChat = prev;
    //   return { ...prev };
    // });

    // const isOperatingtime = detectTimeMatching(groupChat);

    // if (isOperatingtime) {
    setQa((prev) => ({
      ...prev,
      open: !prev.open,
    }));
    // } else {
    //   const { start_datetime, end_datetime } = groupChat;
    //   const startTime = moment.utc(start_datetime).local().format("HH:mm");
    //   const endTime = moment.utc(end_datetime).local().format("HH:mm");

    //   console.log("start", start_datetime);
    //   console.log("startTime", startTime);
    //   dispatch({
    //     type: OPEN_RESPONSE_ALERT,
    //     payload: {
    //       msg: `It's not operational time. \n Operating hours ${startTime} to ${endTime}`,
    //     },
    //   });
    // }
  };

  return (
    <React.Fragment>
      <Modal
        header="Brochures"
        component={Brochure}
        open={open}
        setOpen={setOpen}
      />

      <Modal
        header="MICE SEOUL VIDEO"
        component={SeoulUprism}
        open={qa.open}
        setOpen={handleCloseGroupChat}
      />

      <SeoulBooth
        setOpenEvent={toggleEventlist}
        setLoadbarOpen={setLoadbarOpen}
        open={open}
        setOpen={setOpen}
        setQaOpen={onOpenGroupChat}
      />
    </React.Fragment>
  );
};

SeoulBoothPage.propTypes = {};

const MemoizedSeoulboothPage = React.memo(SeoulBoothPage);

export default MemoizedSeoulboothPage;
