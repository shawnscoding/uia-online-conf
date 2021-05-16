import React from "react";
import PropTypes from "prop-types";
import { iframeWidth } from "../../styledComponent/Variables";

const Guidemodal = (props) => {
  return (
    <>
      <iframe
        style={{
          width: iframeWidth,
          height: "100%",
        }}
        frameBorder="0"
        src="https://player.vimeo.com/video/457584529?autoplay=1&loop=1&title=0&byline=0&portrait=0"
        allow="camera; microphone; autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </>
  );
};

Guidemodal.propTypes = {};

export default Guidemodal;
