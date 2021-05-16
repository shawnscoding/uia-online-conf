import React, { useEffect, useState } from "react";
import { apiClient } from "../../utils/data/api";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment-timezone";
import { OPEN_ALERT_AND_SET_ITS_CONTENT } from "../../redux/types";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";

function ConferenceVideoListModal({
  openConferenceVideoList,
  setOpenConferenceVideoList,
}) {
  const dispatch = useDispatch();
  const [iframeSource, setIframeSource] = useState("about:blank");
  const [videoList, setVideoList] = useState(null);
  const [subject, setSubject] = useState("");
  const [openTime, setOpenTime] = useState("");

  useEffect(() => {
    const getConferenceVideo = async () => {
      try {
        const res = await apiClient.get("/conference/video");
        console.log("res ::", res);
        setVideoList(res.data);
      } catch (err) {
        console.log("err ::", err);
        if (err && err.response) {
          const code = err.response.data.code;
          if (code === -100) {
          }
        }
      }
    };
    getConferenceVideo();
  }, []);

  const handleVideoClick = () => {
    dispatch({
      type: OPEN_RESPONSE_ALERT,
      payload: {
        msg: "This is not available now",
      },
    });
  };

  // const handleVideo = (item) => {
  //   console.log("item ::", item);
  //   // 시간대를 비교해서 이전일 때만 가능하고 start_datetime 이 이후 인 경우 아직 진행되지 않은 section을 표시.
  //   const endDatetime = Date.parse(item.end_datetime);
  //   const now = Date.now();
  //   console.log("endDatetime ::", endDatetime);
  //   console.log("now ::", now);

  //   if (endDatetime >= now) {
  //     // 아직 끝나지 않은 section

  //     const messageInfo = {};

  //     messageInfo.popup_position = "center";
  //     messageInfo.header = "Notification";
  //     messageInfo.contents =
  //       "This session is still in process. Please check the program on the menu.\n\n";
  //     dispatch({
  //       type: OPEN_ALERT_AND_SET_ITS_CONTENT,
  //       payload: messageInfo,
  //     });
  //     return;
  //   }

  //   setIframeSource(item.action_link);
  //   setSubject(item.subject);
  //   setOpenTime(
  //     moment.tz(item.start_datetime, "Asia/Seoul").format("YYYY-MM-DD HH:mm") +
  //       " KST"
  //   );
  // };

  if (openConferenceVideoList !== true) return <></>;

  return (
    <div
      style={{
        zIndex: "100",
      }}
      className="popup modal"
    >
      <div className="pop-tb">
        <div className="pop-cell zoomIn">
          <div className="modal-box v-pop">
            <div className="modal-header">
              <h2>Conference Video List</h2>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setOpenConferenceVideoList(false);
                }}
              ></button>
            </div>
            <div className="pop-content">
              <div className="content-box">
                <div className="video-play">
                  <ul>
                    <li className="first">
                      <div className="video">
                        {iframeSource === "about:blank" ? (
                          <div
                            style={{ textAlign: "center", lineHeight: "400px" }}
                          >
                            <h1>Please select Video</h1>
                          </div>
                        ) : (
                          <iframe
                            width="100%"
                            height="100%"
                            src={iframeSource}
                            preload="auto"
                            className="embed-responsive-item"
                            allow="camera; microphone; autoplay; fullscreen"
                            allowFullScreen
                          />
                        )}
                      </div>
                      <div className="title">
                        <p>{subject}</p>
                        {/* <span>{openTime}</span> */}
                      </div>
                    </li>
                    <li className="last">
                      {videoList &&
                        videoList.map((item, index) => (
                          <div
                            key={index}
                            className="video"
                            style={{ cursor: "pointer" }}
                            onClick={handleVideoClick}
                          >
                            <img src={item.cover_link} alt="video cover link" />
                            <p className="tit">
                              {item.subject}
                              <br />
                              {/* {moment.tz(item.start_datetime, 'Asia/Seoul').format("YYYY-MM-DD HH:mm") + " KST"} */}
                            </p>
                          </div>
                        ))}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferenceVideoListModal;
