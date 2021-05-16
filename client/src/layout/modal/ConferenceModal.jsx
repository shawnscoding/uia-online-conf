import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { videoWidth, videoHeight } from "../../styledComponent/Variables";
import { useDispatch } from "react-redux";
import { authrizationFailed } from "../../redux/auth/actions";
import { storeStamp } from "../../utils/helper";
import Modal from "./Modal";
import ConferenceUprism from "./../../components/modalContents/ConferenceUprism";
import { OPEN_RESPONSE_ALERT } from "../../redux/types";
import { TOGGLE_CONFERENCE_MODAL } from "./../../redux/types";
import styled from "styled-components";

const Iframe = styled.iframe`
width: ${videoWidth};
height: ${videoHeight};


@media only screen and (max-width: 768px) {
  width: 100%;
  height: 100%;
`;

const Contents = ({ content }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const type = content && content.type;
    if (type === "video") {
      const body = { stamp_code: "CONF-01" };
      const logUserOut = () => dispatch(authrizationFailed());
      storeStamp({ logUserOut, body });
    }
  }, [content]);
  const handleClose = () => {
    dispatch({
      type: TOGGLE_CONFERENCE_MODAL,
    });
  };

  const renderContent = (content) => {
    if (content.type === "video") {
      console.log("content.start_datetime ::", content.start_datetime);
      console.log("content.action_link ::", content.action_link);
      const startTime = Date.parse(content.start_datetime);
      const now = Date.now();
      const gap = now - startTime;
      const min = Math.floor((gap / 1000 / 60) << 0);
      const sec = Math.floor((gap / 1000) % 60);
      const skipTag = min + "m" + sec + "s";
      const actionLink = content.action_link + "&controls=0#t=" + skipTag;
      console.log("actionLink :: ", actionLink);
      return (
        <div className="pop-content data-table">
          <Iframe
            src={actionLink}
            frameBorder="0"
            allow="camera; microphone; autoplay; fullscreen"
            allowFullScreen
          ></Iframe>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="popup">
      <div className="pop-tb schedule event">
        <div className="pop-cell zoomIn">
          <div className="login-box">
            <div className="schedule-header">
              <span className="ico-mg"></span>
              <h2> {content ? content.subject : "Alert"} </h2>
              <button className="close" onClick={handleClose}>
                close
              </button>
            </div>
            {renderContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
};
// if (!content) {
//   return (
//     <div className="pop-content alert">
//       <div
//         style={{
//           padding: "1rem 3rem",
//         }}
//         className="alert-mess"
//       >
//         <p
//         className={classes.text}
//         ></p>
//       </div>
//     </div>
//   );
// }

const ConferenceModal = ({ open }) => {
  const dispatch = useDispatch();

  const handleCloseUprism = () => {
    dispatch({
      type: TOGGLE_CONFERENCE_MODAL,
    });
  };

  // useEffect(() => {
  //   if (open && content) {
  //     // if (!content) {
  //     //   dispatch({
  //     //     type: OPEN_RESPONSE_ALERT,
  //     //     payload: { msg: "Sorry, Currently no conference is proceeding" },
  //     //   });
  //     //   return;
  //     // }
  //     // this is for terminating modal whend it currentContent type change to break
  //     if (content.type === "break") {
  //       dispatch({
  //         type: TOGGLE_CONFERENCE_MODAL,
  //       });
  //       dispatch({
  //         type: OPEN_RESPONSE_ALERT,
  //         payload: { msg: "There is no session at the moment.\nPlease check the program on the menu." },
  //       });
  //       return;
  //     }
  //   }
  // }, [open, content]);

  // const type = content && content.type

  if (!open) return <></>;
  // if(!content) return  <></>;
  // if (content && content.type === "live")
  return (
    <Modal
    // header={content.subject}
    // component={ConferenceUprism}
    // open={open}
    // setOpen={handleCloseUprism}
    // uprism_link={content.action_link}
    />
  );

  // return <Contents content={content}></Contents>;
};

ConferenceModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ConferenceModal;
