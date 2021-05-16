import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { iframeWidth } from "../../styledComponent/Variables";
import { useDispatch, connect } from "react-redux";
import { authrizationFailed } from "../../redux/auth/actions";
import { storeStamp } from "../../utils/helper";
import { OPEN_UPRISM_GUIDE, CLOSE_UPRISM_GUIDE } from "../../redux/types";
import { detectCookieForGuide } from "./../../utils/helper";
import { videoWidth } from "./../../styledComponent/Variables";
import styled from "styled-components";

const Iframe = styled.iframe`
width: ${videoWidth};
height: 100%;


@media only screen and (max-width: 768px) {
  width: 100%;
  height: 100%;
`;

// this is used globally
const WorkshopUprism = () => {
  // const [noGuideAgainChecked, setchecked] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (topic) {
  //     const logUserOut = () => dispatch(authrizationFailed());
  //     const roomNum = topic.room_no;
  //     let body = {};
  //     if (roomNum === 1) {
  //       body.stamp_code = "WORK-RM-01";
  //     } else if (roomNum === 2) {
  //       body.stamp_code = "WORK-RM-02";
  //     } else if (roomNum === 3) {
  //       body.stamp_code = "WORK-RM-03";
  //     } else {
  //       return;
  //     }

  //     storeStamp({ logUserOut, body });
  //   }
  // }, [topic]);

  // useEffect(() => {
  //   const open = detectCookieForGuide();
  //   if (open) {
  //     dispatch({
  //       type: OPEN_UPRISM_GUIDE,
  //     });
  //   }
  // }, []);

  // const closeGuide = () => {
  //   if (noGuideAgainChecked) {
  //     document.cookie = "test=test";
  //     document.cookie = "guideOpen=false";
  //     console.log("document cookies ::", document.cookie);
  //   }
  //   dispatch({
  //     type: CLOSE_UPRISM_GUIDE,
  //   });
  // };

  // const onChange = () => {
  //   setchecked(!noGuideAgainChecked);
  // };

  return (
    <React.Fragment>
      {/* {renderGuide && (
        <div className="uprism_guide">
          <img
            src="https://d2lx5o5tt1uoj2.cloudfront.net/assets/uprism_guide.png"
            alt=""
            className="pc"
          />
          <img
            src="https://d2lx5o5tt1uoj2.cloudfront.net/assets/m_uprism_guide.png"
            alt=""
            className="mobile"
          />
          <p className="check-box">
            <label className="checks2">
              <input
                onChange={onChange}
                checked={noGuideAgainChecked}
                type="checkbox"
              />
              <span className="checkbox-txt">Do Not Open Again</span>
            </label>
            <button type="button" onClick={closeGuide}>
              Close
            </button>
          </p>
        </div>
      )} */}
      {/* {topic.uprism_link && ( */}
      <Iframe
        frameBorder="0"
        src="https://player.vimeo.com/video/465663751?autoplay=1&loop=1&title=0&byline=0&portrait=0"
        allow="camera; microphone; autoplay; fullscreen"
        allowFullScreen
      ></Iframe>
      {/* // )} */}
    </React.Fragment>
  );
};

WorkshopUprism.propTypes = {};

const mapStateToProps = (state) => ({
  renderGuide: state.opener.renderGuide,
});

export default connect(mapStateToProps)(WorkshopUprism);
