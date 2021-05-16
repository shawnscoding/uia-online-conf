import React from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
const classes = {
  text: {
    display: "block",
    fontSize: "2.5rem",
    lineHeight: "3rem",
  },
};
const AlertModal = ({ open, setOpen, msg, header }) => {
  // const utc = moment.utc("2020-07-28T12:08:17.000Z").format();

  // const local = moment.utc(utc).local().format("HH: mm");
  if (!open) return <></>;
  return (
    <React.Fragment>
      <div
        style={{
          zIndex: 999999,
        }}
        className="popup"
      >
        <div className="pop-tb schedule event">
          <div className="pop-cell zoomIn">
            <div className="login-box">
              <div className="schedule-header">
                <span
                  style={{
                    background: "none",
                  }}
                  className="ico-mg"
                ></span>
                <h2>{header}</h2>
                <button
                  className="close"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  close
                </button>
              </div>
              <div className="pop-content alert">
                <div
                  style={{
                    padding: "1rem 3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="alert-mess"
                >
                  <div>
                    {msg.split("\n").map((line, index) => {
                      return (
                        <p
                          style={
                            classes.text
                            //  textAlign: "center",
                            // verticalAlign: middle;
                          }
                          key={index}
                        >
                          {line}
                          <br />
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

AlertModal.propType = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

AlertModal.defaultProps = {
  header: "Alert",
};

export default AlertModal;
