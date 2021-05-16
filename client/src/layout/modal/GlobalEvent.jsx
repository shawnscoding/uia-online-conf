import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as html2canvas from "html2canvas";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { CusGrid as Grid } from "../../styledComponent/Layouts";
import { detectIe, storeStamp } from "../../utils/helper";
import useProgressiveImage from "./../../components/useLazyLoadImg";
import { apiClient } from "./../../utils/data/api";
import { downloadURI } from "../../utils/helper";
import moment from "moment";
import {
  cardWidth,
  cardHeight,
  modalIconWidth,
  modalIconHeight,
  eventModalWidth,
} from "../../styledComponent/Variables";
import { NameBoxBeforeSave } from "./../../components/event/Eventstyle";
import { dictionaryList, setLang } from "./../../utils/data/locale";
import { useDispatch } from "react-redux";
import { authrizationFailed } from "./../../redux/auth/actions";
import { detectTokenError } from "./../../utils/helper";
import Webcam from "react-webcam";
import { Text } from "./../../styledComponent/Text";

// const restCard =
//   "https://drj0cvukrat6h.cloudfront.net/assets/event/MembershipCard_BG3.png"; //
// const firstCard = "https://drj0cvukrat6h.cloudfront.net/assets/event/MembershipCardFinal.png"; // canvas
const firstCard =
  "https://d2lx5o5tt1uoj2.cloudfront.net/assets/event/MembershipCardFinal.png"; // canvas
// const MembershipCard_Back =
//   "https://drj0cvukrat6h.cloudfront.net/assets/event/MembershipCard_Back-4.png"; // canvas

const HiddenFrontCard = styled.img`
  width: 100%;
  height: 100%;
`;

const FrontCardBox = styled.div`
  width: ${cardWidth};
  height: 610px;
  /* background: #fff; */
  background: transparent;
  position: fixed;
  // top: 330px;
  // left: 930px;
  // z-index: 100;
  top: 0px;
  left: -1000px;
  .en-name {
    @media only screen and (max-width: 830px) {
      font-size: ${(props) => props.enNameSz} !important;
      margin: 12px 0 0 0 !important;
    }
  }

  #Date {
    position: absolute;
    font-size: 20px;
    top: 39rem;
    left: 34rem;
    border: 1px solid #fff;
    width: 600px;
    font-weight: normal;
    letter-spacing: -1px;
  }
`;

const HiddenBackCard = styled.img`
  width: ${cardWidth};
  height: ${cardHeight};
  background: transparent;
  position: fixed;
  top: 0;
  right: 0;
  // z-index: 100;
`;

const EventModal = ({ alert, setAlert, open, setOpen }) => {
  const allLang = setLang[dictionaryList[0].label];
  const lang = allLang["Event"];
  const [page, setPage] = useState(1);
  const [englishName, setEnglishName] = useState("");
  const [koreanName, setKoreanName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [savedPhotos, setSavedPhotos] = useState({
    front: null,
    back: null,
  });

  const [hasCam, sethasCam] = useState(false);

  const dispatch = useDispatch();

  const videoConstraints = {
    width: 324,
    height: 380,
    facingMode: "user",
  };

  useEffect(() => {
    if (open) {
      setPage(1);
      setEnglishName("");
      setKoreanName("");
      setPhotoPreview("");
    }
  }, [open]);

  const handleClickJoin = () => {
    setPage(2);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    console.log("page", page);
    if (page === 2) {
      setPage(1);
    } else if (page === 3) {
      setPage(2);
    } else if (page === 4) {
      setPage(2);
    } else {
      return;
    }
  };

  const logUserOut = () => dispatch(authrizationFailed());

  const handleClickName = () => {
    setPage(4);
  };

  const handleClickPhoto = () => {
    setPage(3);
  };

  function detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then((devices) => {
      callback(devices.some((device) => "videoinput" === device.kind));
    });
  }

  useEffect(() => {
    detectWebcam(function (hasWebcam) {
      console.log("hasWebcam:::", hasWebcam);

      sethasCam(hasWebcam);
    });
  }, []);

  useEffect(() => {
    if (photoPreview) {
      const body = { stamp_code: "LOU-GAME-02" };

      storeStamp({ logUserOut, body });
    }
  }, [photoPreview]);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setAlert({
        ...alert,
        open: true,
        msg: "Oops! Please take the picture again.",
      });
      return;
    }
    setPhotoPreview(imageSrc);
    setPage(2);
  }, [webcamRef]);

  const handleChangeFile = (e) => {
    let file = e.target.files[0]; // TODO : ie 11 지원 확인 필요.
    const type = file.type;
    if (type.includes("image") === false) {
      setAlert({ ...alert, open: true, msg: "only image format is allowed" });

      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
    };
    setPage(2);
  };

  const onClickTranslate = (e) => {
    if (englishName.length > 30) {
      setAlert({
        ...alert,
        open: true,
        msg: "English name is not allowed to be more than 30 charaters long",
      });
      return;
    }
    try {
      // if (localStorage.token) {
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.token}`,
      //     },
      //   };
      apiClient.post("/event/translate", { englishName }).then((response) => {
        const korean = response.data.koreanName;
        console.log("korean");
        console.log(korean);
        if (korean.length > 14) {
          return;
        }

        const body = { stamp_code: "LOU-GAME-01" };

        // storeStamp({ logUserOut, body });
        setKoreanName(response.data.koreanName);
        setPage(2);
      });
      // } else {
      //   dispatch(authrizationFailed());
      // }
    } catch (err) {
      console.log("err");
      console.log(err);
      if (err.response && err.response.data) {
        const code = err.response.data;
        if (detectTokenError(code)) {
          dispatch(authrizationFailed());
        }
      }
    }
  };

  const onEnglishnameChange = (e) => {
    setEnglishName(e.target.value);
  };

  // const callForCardBack = (photoBack) => {
  //   setTimeout(() => {
  //     html2canvas(photoBack, {
  //       allowTaint: true,
  //       backgroundColor: "rgba(0,0,0,0)",
  //     }).then((canvas) => {
  //       console.log("canvas ::", canvas);
  //       const imgData = canvas.toDataURL("image/png");

  //       setSavedPhotos((prev) => {
  //         return {
  //           ...prev,
  //           back: imgData,
  //         };
  //       });
  //     });
  //   }, 1000);
  // };
  useEffect(() => {
    if (savedPhotos.front) {
      downloadURI(savedPhotos.front, "card.png");
      const body = { stamp_code: "LOU-GAME-03" };
      storeStamp({ logUserOut, body });
      apiClient.post("/log/event", { eventId: 1, eventOption: "front" });
    }
    // setTimeout(() => {
    // downloadURI(savedPhotos.back, "card-back.png");
    // apiClient.post("/log/event", { eventId: 1, eventOption: "back" }); // 통계
    // }, 1500);
  }, [savedPhotos]);

  const savePhoto = () => {
    const bool = detectIe();
    if (bool) {
      setAlert({
        ...alert,
        open: true,
        msg: "This program is best compatible with Chrome.",
      });
      return;
    }
    const photoIdPreview = document.getElementById("hiddenCardFront");
    // const photoIdPreview = document.getElementsByClassName(
    //   "membership-wrap"
    // )[0];
    // photoIdPreview.style.width = "960px";
    // photoIdPreview.style.height = "610px";
    console.log("photoIdPreview ::", photoIdPreview);
    html2canvas(photoIdPreview, {
      allowTaint: true,
      backgroundColor: "rgba(0,0,0,0)",
      width: 960,
      height: 610,
      ignoreElements: (node) => {
        return node.style["background-image"].indexOf("image/svg") !== -1;
      },
    }).then((canvas) => {
      console.log("canvas ::", canvas);
      const imgData = canvas.toDataURL("image/png");
      console.log("imgData--------");
      console.log(imgData);
      setSavedPhotos({ ...savedPhotos, front: imgData });
    });
  };

  const firstPageCard = useProgressiveImage(firstCard, true); // for canvas
  // const backPageCard = useProgressiveImage(MembershipCard_Back, true); // for canvas
  // const restPageCard = useProgressiveImage(restCard);

  const date = moment.utc().format();

  const local = moment.utc(date).local().format("YYYY-MM-DD");
  if (!open) return <></>;
  return (
    <React.Fragment>
      <div className={`popup modal ${page === 1 ? "ps-membership" : null}`}>
        <FrontCardBox id="hiddenCardFront">
          <HiddenFrontCard
            enNameSz={englishName.length < 22 ? "14px" : "12px"}
            style={{ position: "relative" }}
            src={firstPageCard}
            crossOrigin="anonymous"
          ></HiddenFrontCard>
          {photoPreview && (
            <img
              style={{
                height: "258px",
                width: "226px",
                position: "relative",
                top: "-446px",
                left: "50px",
                border: "2px solid rgb(0, 106, 178)",
                borderRadius: "11px",
              }}
              className="photo-preview"
              crossOrigin="anonymous"
              src={photoPreview}
            />
          )}

          {koreanName && (
            <NameBoxBeforeSave
              className="event-name"
              style={{
                position: "absolute",
                top: "160px",
                left: "300px",
              }}
            >
              <span
                style={{
                  color: "#29294b",
                  fontSize: "1.8rem",
                  lineHeight: "4rem",
                  position: "absolute",
                  marginTop: "6px",
                }}
              >
                Name
              </span>
              <Text
                // textalign="center"
                id="koreanName"
                // m={koreanName.length > 8 ? "-1px 0 37px 0" : "-1px 0 37px 0"}?
                cr="rgb(0, 83, 145)"
                sz={koreanName.length > 8 ? "39px" : "55px"}
                style={{
                  // color: "#005391",
                  // fontFamily: `"Noto Sans KR", sans-serif`,
                  // fontweight: "700",

                  paddingBottom: "1rem",
                  color: "#006ab2",
                  fontSize: "4.8rem",
                  fontWeight: "700",
                  paddingLeft: "7rem",
                }}
              >
                {koreanName}
              </Text>
              <Text
                m="0"
                // textalign="center"
                cr="rgba(0, 0, 0, 0.8)"
                // sz="30px"
                style={{
                  color: "#777",
                  fontSize: "2.6rem",
                  fontWeight: "500",
                  paddingLeft: "7rem",
                }}
              >
                {englishName}
              </Text>
            </NameBoxBeforeSave>
          )}

          <Text
            m="0"
            cr="rgba(0, 0, 0, 0.8)"
            sz="18px"
            id="Date"
            style={{
              letterSpacing: "unset",
              color: "#666",
              fontSize: "2.1rem",
              fontWeight: "300",
            }}
          >
            Date of issue: {local}
          </Text>
        </FrontCardBox>

        <div className="pop-tb">
          <div className="pop-cell zoomIn">
            <div className="modal-box">
              <div className="modal-header">
                {page !== 1 && (
                  <button onClick={handleBack} className="prev">
                    prev
                  </button>
                )}
                <h2>Game Event</h2>
                <button onClick={handleClose} className="close">
                  close
                </button>
              </div>

              {page === 1 ? (
                <div
                  className="pop-content data-table"
                  style={{ padding: "40px 0 0 0" }}
                >
                  <div className="content-box profile">
                    <div className="plus-seoul">
                      <div className="title" style={{ padding: "0 0 10px 0" }}>
                        Create your
                        <br />
                        ‘PLUS SEOUL Membership’
                      </div>

                      <div className="membership-wrap">
                        <h3>
                          <span>logo</span>
                        </h3>
                        <div className="membership-content">
                          <div className="photo">
                            {/* <img
                              src="./assets/201712051103026710_1.jpg"
                              alt=""
                            /> */}
                          </div>
                          <div className="membership-profile">
                            <div className="mb-profile">
                              <span className="name">Nmae</span>
                              <p className="kor">미란다 커</p>
                              <p className="eng">Miranda Kerr</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hand"></div>
                      <div className="event_icon">
                        <ul>
                          <li>
                            <button className="event_hangeul">hangeul</button>
                          </li>
                          <li>
                            <button className="event_smile">smile</button>
                          </li>
                          <li>
                            <button className="event_share">share</button>
                          </li>
                        </ul>
                      </div>
                      <div className="btn-picture">
                        <button onClick={handleClickJoin}>Get Yours Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : page === 2 ? (
                <div className="pop-content data-table">
                  <div
                    className={`content-box ${photoPreview ? "profile" : null}`}
                  >
                    <div className="plus-seoul">
                      {photoPreview && koreanName ? (
                        <div className="title" style={{ padding: "30px" }}>
                          <h2>Congratulations!</h2>
                          PLUS SEOUL Membership card issued.
                        </div>
                      ) : (
                        <div
                          className="title"
                          style={{ padding: "0 0 20px 0" }}
                        >
                          Create a membership card by
                          <br />
                          entering your name and taking pictures.
                        </div>
                      )}

                      <div className="membership-wrap">
                        <h3>{/* <span>logo</span> */}</h3>
                        <div className="membership-content">
                          <div
                            style={{
                              cursor: "pointer",
                              border: "2px solid #006ab2",
                            }}
                            onClick={handleClickPhoto}
                            className="photo"
                          >
                            {photoPreview ? (
                              <img src={photoPreview} />
                            ) : (
                              <>Take a Picture</>
                            )}
                          </div>
                          <div className="membership-profile">
                            {koreanName.length > 0 ? (
                              <>
                                <div className="mb-profile">
                                  <span className="name">Name</span>
                                  <p className="kor">{koreanName}</p>
                                  <p className="eng">{englishName}</p>
                                </div>
                                <div className="profile-edit">
                                  <button onClick={() => setPage(4)}></button>
                                </div>
                              </>
                            ) : (
                              <label>
                                <span>Name</span>
                                <input
                                  readOnly
                                  onClick={handleClickName}
                                  value=""
                                  type="text"
                                  className="type2"
                                  style={{ cursor: "pointer" }}
                                  placeholder="Please enter a name."
                                />
                              </label>
                            )}
                          </div>
                          <div className="add-date">
                            Date of issue : {local}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {koreanName && photoPreview && (
                    <div className="btn-picture">
                      <button onClick={savePhoto}>Save Picture</button>
                    </div>
                  )}
                </div>
              ) : page === 3 ? (
                <div className="pop-content">
                  <div className="content-box profile">
                    <div className="plus-seoul">
                      <div className="title">
                        Please adjust the guideline and press the filming
                        button.
                      </div>
                      {hasCam ? (
                        <div
                          style={{ position: "relative" }}
                          className="camera-box"
                        >
                          <Webcam
                            // style={{
                            //   position: "absolute",
                            //   left: 0,
                            //   top: 0,
                            //   zIndex: "200",
                            // }}
                            audio={false}
                            width="324px"
                            height="380px"
                            ref={webcamRef}
                            screenshotQuality="1"
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                          />
                        </div>
                      ) : (
                        <div
                          style={{ position: "relative" }}
                          className="camera-box not"
                        >
                          camera not found
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="btn-take">
                    <button
                      onClick={capture}
                      className={hasCam ? "on" : null}
                      disabled={hasCam ? false : true}
                    >
                      Take a Picture
                    </button>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleChangeFile}
                    />

                    <label
                      style={{
                        cursor: "pointer",
                      }}
                      htmlFor="contained-button-file"
                      className="upload"
                    >
                      Upload Picture
                    </label>
                  </div>
                  <div className="camera-mg">
                    If you don't have a camera, upload a picture from your
                    device.
                    <br />
                    we only accept image files of 210X246px, 10MB or less.
                  </div>
                </div>
              ) : (
                <div className="pop-content">
                  <div className="content-box profile">
                    <div className="plus-seoul">
                      <div className="title">
                        Please enter a name and press the Convert button.
                      </div>
                      <div className="message">
                        <input
                          type="text"
                          style={{
                            border: "1px solid #000",
                            width: "100%",
                            height: "65px",
                            fontSize: "2rem",
                            textAlign: "center",
                          }}
                          value={englishName}
                          onChange={onEnglishnameChange}
                        ></input>
                      </div>
                    </div>
                    {/* <div className="error-dp">Error message DP</div> */}
                  </div>
                  <div className="btn-take">
                    <button onClick={onClickTranslate} className="on">
                      Transform
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

EventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default EventModal;
