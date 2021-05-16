import React from "react";
import PropTypes from "prop-types";

const ProgramInfoModal = (props) => {
  return (
    <>
      <iframe
        frameBorder="0"
        style={{
          width: "100%",
          height: "100%",
        }}
        src="https://sto-1st.s3.ap-northeast-2.amazonaws.com/program/program.html"
      ></iframe>
    </>
  );
};

ProgramInfoModal.propTypes = {};

export default ProgramInfoModal;
