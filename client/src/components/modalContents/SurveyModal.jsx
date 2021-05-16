import React from "react";
import PropTypes from "prop-types";
import { iframeWidth, iframeHeight } from "../../styledComponent/Variables";

const SurveyModal = (props) => {
  return (
    <iframe
      style={{
        width: iframeWidth,
        height: "100%",
      }}
      src="https://docs.google.com/forms/d/e/1FAIpQLSfnlcBjKocEojYviIdeqn9QnxmGF8bbqIEQOZzhWs1Q3hokOg/viewform"
      allow="camera; microphone; autoplay; fullscreen"
      allowFullScreen
    />
  );
};

SurveyModal.propTypes = {};

export default SurveyModal;
