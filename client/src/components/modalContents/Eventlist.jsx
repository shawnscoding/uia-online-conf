import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { OPEN_SURVEY, OPEN_STAMP } from "../../redux/types";

const Eventlist = () => {
  const dispatch = useDispatch();

  const onStampOpen = () => {
    dispatch({
      type: OPEN_STAMP,
    });
  };

  const handleOpenSurvey = () => {
    dispatch({
      type: OPEN_SURVEY,
    });
  };

  return (
    // <div className="event-list">
    //   <ul>
    //     <li>
    //       <button onClick={onStampOpen}>Open Virtual Stamp Tour</button>
    //     </li>
    //     <li>
    //       <button></button>
    //     </li>
    //     <li>
    //       <button></button>
    //     </li>
    //   </ul>
    // </div>

    <div className="event-list">
      <ul>
        <li>
          <div className="check">
            <p
            style={{
              fontSize: "25px",
    color: "#ff6b6b"
            }}
            >Unfortunately, this event has ended.</p>
            <h3>
              <span
              style={{
                padding: '3rem 4rem 0'
              }}
              >VIRTUAL STAMP TOUR</span>
            </h3>

            <p className="txt">
              Check your stamp mission and collect your stamp!
              <br />
              The <span>more stamps</span> you collect,
              <span>the bigger</span> your prizes will be.
            </p>
            <p className="btn-eventlist">
              <button type="button" onClick={onStampOpen}>
                Check My Stamp Mission
              </button>
            </p>
          </div>
        </li>
        <li>
          <div className="survey">
            <h3>
              <span>SURVEY EVENT</span>
            </h3>
            <p className="txt">
              Submit <span>your opinion</span> about Virtual UIA Round Table
              <br />
              and get $5 Amazon gift card!
            </p>
            <p className="btn-eventlist">
              <button onClick={handleOpenSurvey} type="button">
                Go to Survey
              </button>
            </p>
          </div>
        </li>
        <li>
          <div className="sns" style={{ padding: "0", height: "225px" }}>
            <h3>
              <span>SNS #HASHTAG EVENT</span>
            </h3>
            <p className="txt">
              Post your screen images you are enjoying in Virtual UIA Round
              Table on your SNS with below #hashtags!
              <br />
              Selected winners will get $15 Amazon gift card!
            </p>
            <p className="txt-fill" style={{ padding: "1.4rem 4rem" }}>
              #SEOUL #UIA20AP #VIRTUALCONFERENCE
            </p>
            <p className="btn-eventlist">
              <a
                style={{ cursor: "pointer", marginLeft: "5px" }}
                target="_blank"
                href="https://www.instagram.com/"
                className="instagram"
              >
                instagram
              </a>
              <a
                style={{ cursor: "pointer", marginLeft: "5px" }}
                target="_blank"
                href="https://twitter.com/"
                className="twitter"
              >
                twitter
              </a>
              <a
                style={{ cursor: "pointer", marginLeft: "5px" }}
                target="_blank"
                href="https://www.facebook.com/"
                className="facebook"
              >
                facebook
              </a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

Eventlist.propTypes = {};

export default Eventlist;
