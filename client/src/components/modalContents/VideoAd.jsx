import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { videoWidth, videoHeight } from "./../../styledComponent/Variables";
import { useDispatch } from "react-redux";
import { authrizationFailed } from "./../../redux/auth/actions";
import { storeStamp } from "../../utils/helper";
import styled from "styled-components";

const Iframe = styled.iframe`
width: ${videoWidth};
height: 100%;


@media only screen and (max-width: 768px) {
  width: 100%;
  height: 100%;
`;

const VideoAd = ({ video_link }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const logUserOut = () => dispatch(authrizationFailed());
    const body = {
      stamp_code: "LOB-02",
    };

    storeStamp({ logUserOut, body });
  }, []);

  return (
    <Iframe
      src={video_link}
      frameBorder="0"
      allow="camera; microphone; autoplay; fullscreen"
      allowFullScreen
    ></Iframe>
  );
};

VideoAd.propTypes = {};

export default VideoAd;
