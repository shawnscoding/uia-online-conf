import React from "react";
import PropTypes from "prop-types";
import { Text } from "./../../styledComponent/Text";

const LoadingMsg = ({ ...rest }) => {
  return <Text {...rest}>Loading...</Text>;
};

LoadingMsg.propTypes = {};

LoadingMsg.defaultProps = {
  sz: "2rem",
  m: "2rem",
};

export default LoadingMsg;
