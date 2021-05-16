import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { iframeWidth, iframeHeight } from "../../styledComponent/Variables";
import { useDispatch, connect } from "react-redux";
import { authrizationFailed } from "../../redux/auth/actions";
import { storeStamp } from "../../utils/helper";
import { CLOSE_UPRISM_GUIDE } from "../../redux/types";
import { detectCookieForGuide } from "./../../utils/helper";
import { OPEN_UPRISM_GUIDE } from "./../../redux/types";
import styled from "styled-components";
import { videoWidth } from "./../../styledComponent/Variables";

const Iframe = styled.iframe`
width: ${videoWidth};
height: 100%;


@media only screen and (max-width: 768px) {
  width: 100%;
  height: 100%;
`;

// this is used globally
const ConferenceUprism = () => {
  // const [noGuideAgainChecked, setchecked] = useState(false);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const body = { stamp_code: "CONF-01" };
  //   const logUserOut = () => dispatch(authrizationFailed());
  //   storeStamp({ logUserOut, body });
  // }, []);

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

      <Iframe
        frameBorder="0"
        src=" https://player.vimeo.com/video/465656357?autoplay=1&loop=1&title=0&byline=0&portrait=0"
        allow="camera; microphone; autoplay; fullscreen"
        allowFullScreen
      ></Iframe>
    </React.Fragment>
  );
};

ConferenceUprism.propTypes = {};

// const mapStateToProps = (state) => ({
//   renderGuide: state.opener.renderGuide,
// });

export default ConferenceUprism;
