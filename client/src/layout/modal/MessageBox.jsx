import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import handleConnect from "../../utils/websocket";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CLOSE_ALERT_AND_DELETE_ITS_CONTENT } from "./../../redux/types";
import styled from "styled-components";

const classes = {
  topModalText: {
    display: "block",
    fontSize: "1.8rem",
    lineHeight: "3rem",
  },
  centerModalText: {
    display: "block",
    fontSize: "2.5rem",
    lineHeight: "3rem",
  },
  header: {
    fontSize: "2.5rem",
  },
};

const CenterAlertContainer = styled.div`
  max-width: 65rem !important;

  @media screen and (max-width: 450px) {
    max-width: 56rem !important;
  }
`;

const CenterAlertText = styled.span`
  font-size: 1.8rem !important;

  @media screen and (max-width: 450px) {
    font-size: 1.5rem !important;
  }
`;

const TopMsgBox = styled.div`
  @keyframes down {
    from {
      top: -500px;
    }
    to {
      top: 0;
    }
  }

  width: 460px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 500;
  background: white;
  animation-name: down;
  animation-duration: 1s;
`;

const MessageBox = ({ openAlertBox, alertContent }) => {
  // console.log("openAlertBox ::", openAlertBox);
  // console.log("alertContent ::", alertContent);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleBtnClick = (btn) => {
    history.push(btn.link);
    dispatch({ type: CLOSE_ALERT_AND_DELETE_ITS_CONTENT });
  };

  if (openAlertBox !== true) return <></>;

  const position = alertContent.popup_position;
  // const local = moment
  //   .utc(alertContent.popup_time)
  //   .local()
  //   .format("MMMM Do, h:mm a");
  const renderContentsInCenterPopper = () => {
    if (alertContent.buttons && alertContent.buttons.length) {
      const btn = alertContent.buttons[0];
      if (btn.type === "video") {
        return (
          <div className="btn-event">
            <iframe
              src={btn.link}
              style={{
                width: "420px",
                height: "236px",
              }}
              frameBorder="0"
              allow="camera; microphone; autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        );
      } else {
        return (
          <div className="btn-event">
            {alertContent.buttons &&
              alertContent.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleBtnClick(button);
                  }}
                >
                  {button.title}
                </button>
              ))}
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

  const renderContents = () => {
    if (alertContent.buttons && alertContent.buttons.length) {
      const btn = alertContent.buttons[0];
      if (btn.type === "video") {
        return (
          <iframe
            src={btn.link}
            style={{
              width: "420px",
              height: "236px",
            }}
            frameBorder="0"
            allow="camera; microphone; autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        );
      } else {
        return (
          <div className="pop-content data-table">
            <div className="btn-hall">
              {alertContent.buttons &&
                alertContent.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleBtnClick(button);
                    }}
                  >
                    {button.title}
                  </button>
                ))}
            </div>
          </div>
        );
      }
    } else {
      // no btn
      return <></>;
    }
  };

  if (position === "center") {
    return (
      <div className="popup messagebox">
        <CenterAlertContainer className="pop-tb schedule event">
          {/* <!-- zoomIn은 팝업 띄우는 애니메이션 --> */}
          <div className="pop-cell zoomIn">
            <div className="login-box">
              <div className="schedule-header">
                <span
                  style={{
                    background: "none",
                  }}
                  className="ico-mg"
                ></span>
                <h2>
                  {alertContent.header !== undefined
                    ? alertContent.header
                    : "Schedule of events"}
                </h2>
                <button
                  className="close"
                  onClick={() => {
                    dispatch({ type: CLOSE_ALERT_AND_DELETE_ITS_CONTENT });
                  }}
                >
                  close
                </button>
              </div>
              <div className="pop-content data-table">
                <div className="mess" style={{ lineHeight: "30px" }}>
                  {alertContent.contents.split("\n").map((line, index) => {
                    return (
                      <CenterAlertText key={index}>
                        {line}
                        <br />
                      </CenterAlertText>
                    );
                  })}
                </div>

                {renderContentsInCenterPopper()}
              </div>
            </div>
          </div>
        </CenterAlertContainer>
      </div>
    );
  } else if (position === "right_top") {
    return (
      <TopMsgBox className="login-box">
        <div className="schedule-header">
          <h2 style={classes.header}>
            {alertContent.header !== undefined
              ? alertContent.header
              : "Schedule of events"}
          </h2>
          <p
            style={{
              padding: "15px 40px",
              lineHeight: "20px",
            }}
            className="mg-txt"
          >
            {alertContent.contents.split("\n").map((line, index) => {
              return (
                <span style={classes.topModalText} key={index}>
                  {line}
                  <br />
                </span>
              );
            })}
          </p>
          <button
            className="close"
            onClick={() => {
              dispatch({ type: CLOSE_ALERT_AND_DELETE_ITS_CONTENT });
            }}
          >
            close
          </button>
        </div>
        {renderContents()}

        {/* if video, run video in sch-event div, if not render btns */}
      </TopMsgBox>
    );
  }
};

export default MessageBox;
