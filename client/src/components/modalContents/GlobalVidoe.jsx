import React from "react";
import PropTypes from "prop-types";

import { videoWidth, videoHeight } from "../../styledComponent/Variables";
// this is used globally
const GlobalVideo = ({ video_link }) => {
  return (
    <React.Fragment>
      <div></div>
      <iframe
        src={video_link}
        style={{
          width: videoWidth,
          height: videoHeight,
        }}
        frameBorder="0"
        allow="camera; microphone; autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </React.Fragment>
  );
};

GlobalVideo.propTypes = {
  currentContent: PropTypes.object.isRequired,
};

export default GlobalVideo;
