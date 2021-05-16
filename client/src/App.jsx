import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { CusGrid } from "./styledComponent/Layouts";
import { mainRoutes, redirect } from "./utils/data/Navbar";
import styled from "styled-components";
// import { loadUser } from "./redux/auth/actions";
import SupportPage from "./components/widget/SupportWidget";
import Navbar from "./layout/gnb/Navbar";
// import handleConnect from "./utils/websocket";
import Modal from "./layout/modal/Modal";
import ProgramInfoModal from "./components/modalContents/ProgramInfoModal";
import Loader from "./layout/loaders/Loader";
import NoticeListTable from "./components/table/NoticeListTable";
// import JoinAlertModal from "./layout/modal/JoinAlertModal";
import AdminPage from "./admin/AdminPage";
import MessageBox from "./layout/modal/MessageBox";
import LobbyPage from "./layout/lobbyPage/LobbyPage";
// import moment from "moment";
import {
  // SET_FILTERED_ALERTLIST,
  // FIRST_VALIDATION_RUNNED,
  CLOSE_STAMP,
  // CLOSE_ONE_TO_ONE_CHAT,
  TOGGLE_EVENTLIST,
  TOGGLE_INFO,
  // HANDLE_CLOSE_JOINALERT,
  CLOSE_SURVEY,
  // OPEN_ALERT_AND_SET_ITS_CONTENT,
  TOGGLE_GUIDE_MODAL,
  CLOSE_RESPONSE_ALERT,
  TOGGLE_TECH_SUPPORT,
  // OPEN_RESPONSE_ALERT,
} from "./redux/types";
import Eventlist from "./components/modalContents/Eventlist";
import Stamp from "./components/modalContents/Stamp";
// import { Profile } from "./components/modalContents/Profile";
// import ParticipantChatUprism from "./components/modalContents/ParticipantChatUprism";
import SurveyModal from "./components/modalContents/SurveyModal";
import Guide from "./components/modalContents/Guide";
import AlertModal from "./layout/modal/AlertModal";
import Techsupport from "./components/modalContents/Techsupport";
import GameBanner from "./layout/modal/GameBanner";
import { isMobile } from "./utils/helper";

const SeoulBoothPage = lazy(() =>
  import("./layout/seoulBoothPage/SeoulBoothPage")
);
const LoungePage = lazy(() => import("./LoungePage"));
const TheaterPage = lazy(() => import("./layout/theaterPage/TheaterPage"));
const ConferencePage = lazy(() =>
  import("./layout/conferencePage/ConferencePage")
);
const WorkshopPage = lazy(() => import("./layout/workshopPage/WorkshopPage"));

const Container = styled(CusGrid)`
  position: relative;
`;

const App = ({
  // loading,
  // alerts,
  // user,
  // numOfValidation,
  openStamp,
  openTechSupport,
  navbarLazyloader,
  openEventlist,
  responseAlert,
  openInfo,
  openSurvey,
  loadbarUnmounted,
  openAlertBox,
  alertContent,
  // inviteAlert,
  // openLoungeUprism,
  openGuideModal,
}) => {
  const { lobby, lounge, seoul, theater, conference, roomOne } = mainRoutes;
  const [widget, setWidget] = useState(0);
  // const { subLink } = roomOne;
  const [socket, setSocket] = useState(null);
  const [noticeOpen, setNoticeOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const isMobileNavigator = isMobile();

  // this is for chat in lounge
  // const [openLoungeUprism, setOpenLoungeUprism] = useState(false);
  // const [openProfile, setopenProfile] = useState(false);

  // useEffect(() => {
  //   document.cookie = "guideOpen=;";
  // });

  // const handleClickJoin = () => {
  //   console.log("object");
  //   const { sender, targetUserId } = inviteAlert;
  //   if (!sender || !targetUserId) {
  //     alert("something went wrong try again");
  //     return;
  //   }
  //   const msg = {};
  //   msg.type = "chat-accept";
  //   console.log("inviteAlert");
  //   console.log(inviteAlert);

  //   socket.emit("to", {
  //     msg: msg,
  //     sender: sender,
  //     targetUserId: targetUserId,
  //   });

  //   dispatch({
  //     type: HANDLE_CLOSE_JOINALERT,
  //   });
  // };
  // useEffect(() => {
  //   if (alerts && alerts.length && numOfValidation < 1) {
  //     console.log("called");
  //     const popup = alerts.find((alert) => {
  //       const popupTime = moment.utc(alert.popup_time).format();
  //       const addedTenMins = moment.utc(alert.popup_time).add(10, "m").format();
  //       // console.log("popuptitme ::", popupTime);
  //       // console.log("addedTenMins ::", addedTenMins);
  //       // console.log("utc time now", moment.utc().format());
  //       const isTrue = moment.utc().isBetween(popupTime, addedTenMins);
  //       if (isTrue) {
  //         return alert;
  //       }
  //     });

  //     dispatch({
  //       type: FIRST_VALIDATION_RUNNED,
  //     });

  //     if (popup) {
  //       // const allowedLocs = popup.popup_location.split(";");
  //       // console.log("allowedLocs");
  //       // console.log(allowedLocs);
  //       // const currentLoc = location.pathname;
  //       // const allowed = allowedLocs.find((loc) => `/${loc}` === currentLoc);
  //       // console.log("allowed :: ", allowed);
  //       // !!! this has to be fixed
  //       if (true) {
  //         // this is good cause if not allowed, it won't delete the popup for current
  //         const newList = alerts.filter((alert) => alert.idx !== popup.idx);

  //         dispatch({
  //           type: SET_FILTERED_ALERTLIST,
  //           payload: newList,
  //         });

  //         dispatch({
  //           type: OPEN_ALERT_AND_SET_ITS_CONTENT,
  //           payload: popup,
  //         });
  //       }
  //     }
  //   }
  // }, [alerts, location, numOfValidation]);

  // useEffect(() => {
  //   let myInterval;
  //   if (alerts && alerts.length) {
  //     // console.log("called in app");
  //     // console.log(alerts);
  //     myInterval = setInterval(() => {
  //       const popup = alerts.find((alert) => {
  //         const popupTime = moment
  //           .utc(alert.popup_time)
  //           // .subtract(10, "m")
  //           .format();
  //         const addedTenMins = moment
  //           .utc(alert.popup_time)
  //           .add(10, "m")
  //           .format();
  //         // console.log("popuptitme ::", popupTime);
  //         // console.log("addedTenMins ::", addedTenMins);
  //         // console.log("utc time now", moment.utc().format());
  //         const isTrue = moment.utc().isBetween(popupTime, addedTenMins);
  //         if (isTrue) {
  //           return alert;
  //         }
  //       });

  //       if (popup) {
  //         // const allowedLocs = popup.popup_location.split(";");
  //         // console.log("allowedLocs");
  //         // console.log(allowedLocs);
  //         // const currentLoc = location.pathname;
  //         // const allowed = allowedLocs.find((loc) => `/${loc}` === currentLoc);
  //         // console.log("allowed :: ", allowed);
  //         if (true) {
  //           // this is good cause if not allowed, it won't delete the popup for current
  //           const newList = alerts.filter((alert) => alert.idx !== popup.idx);

  //           dispatch({
  //             type: SET_FILTERED_ALERTLIST,
  //             payload: newList,
  //           });

  //           dispatch({
  //             type: OPEN_ALERT_AND_SET_ITS_CONTENT,
  //             payload: popup,
  //           });
  //         }
  //       }
  //     }, 60000);
  //   } else {
  //     clearInterval(myInterval);
  //   }

  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, [alerts, location]);

  // const functionWrapper = (messageInfo) => {
  //   const ran = Math.random();
  //   dispatch({
  //     type: OPEN_ALERT_AND_SET_ITS_CONTENT,
  //     payload: messageInfo,
  //   });
  // };

  // const checkUserStatus = () => {
  //   // note !!!
  //   // for some reason, this scope doesn't get updated state value,
  //   // which is really weird.
  //   // but I found two solutions
  //   // num 1 using redux
  //   const isJoinAlertOpen = store.getState().opener.inviteAlert.open;
  //   const isLoungeUprismOpen = store.getState().opener.openLoungeUprism;

  //   // num 2 get value by using setState ()
  //   // setOpenLoungeUprism((prev) => {
  //   //   test = prev;
  //   //   console.log("prev");
  //   //   console.log(prev);
  //   //   console.log(prev);
  //   //   console.log(prev);
  //   //   console.log(prev);
  //   //   return prev;
  //   // });

  //   if (isJoinAlertOpen) {
  //     return true;
  //   } else if (isLoungeUprismOpen) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const handleLoungeUprismClose = () => {
  //   dispatch({
  //     type: CLOSE_ONE_TO_ONE_CHAT,
  //   });
  // };

  // const onUserleft = () => {
  //   if (localStorage.getItem("staySignIn") === "true") {
  //     return;
  //   } else {
  //     localStorage.removeItem("token");
  //   }
  // };

  // // Setup the `beforeunload` event listener
  // const setupBeforeUnloadListener = () => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault();
  //     return onUserleft();
  //   });
  // };

  // useEffect(() => {
  //   setupBeforeUnloadListener();
  // }, []);

  // const onCloseJoinAlert = () => {
  //   dispatch({
  //     type: HANDLE_CLOSE_JOINALERT,
  //   });
  // };

  // const onCancelJoin = () => {
  //   dispatch({
  //     type: HANDLE_CLOSE_JOINALERT,
  //   });
  // };

  const onStampClose = () => {
    dispatch({
      type: CLOSE_STAMP,
    });
  };

  const handleCloseSurvey = () => {
    dispatch({
      type: CLOSE_SURVEY,
    });
  };

  const handleBackInSurvey = () => {
    dispatch({
      type: CLOSE_SURVEY,
    });
    dispatch({
      type: TOGGLE_EVENTLIST,
    });
  };

  const toggleEventlist = () => {
    dispatch({
      type: TOGGLE_EVENTLIST,
    });
  };

  const handleToggleInfo = () => {
    dispatch({
      type: TOGGLE_INFO,
    });
  };

  const handleBackInStamp = () => {
    dispatch({
      type: CLOSE_STAMP,
    });
    dispatch({
      type: TOGGLE_EVENTLIST,
    });
  };

  const handleCloseAlert = () => {
    dispatch({
      type: CLOSE_RESPONSE_ALERT,
    });
  };

  const handleCloseSupport = () => {
    dispatch({
      type: TOGGLE_TECH_SUPPORT,
    });
  };

  //   const handleLoadbarUnmounted = () => {

  //   };

  // const loaderUnmounted = () => {
  //   setLoad(true)
  // }

  // useEffect(() => {
  //   console.log("alert sent ");
  //   const ran = Math.random();
  //   setMessageInfo({
  //     popup_position: ran > 0.4 ? "center" : "right_top",
  //     idx: 61,
  //     popup_position: "center",
  //     contents:
  //       "Database Training Session begins at 11:00(KST). Click here to enter.",
  //     popup_location: "lobby;conference;workshop;theater;seoul;lounge",
  //     buttons: [
  //       {
  //         idx: 34,
  //         alert_idx: 61,
  //         type: "redirect",
  //         title: "go to conference",
  //         link: "/conference",
  //       },
  //     ],
  //   });
  //   setOpenMessageBox(true);
  // }, []);

  const handleCloseGuideModal = () => {
    dispatch({
      type: TOGGLE_GUIDE_MODAL,
    });
  };

  const [gameBannerOpen, setGameBannerOpen] = React.useState(true);

  const closeGameBanner = () => {
    setGameBannerOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Grid container justify="center">
        <Button onClick={handleLoadbarUnmounted}>
          handle LoadbarUnmounted
        </Button>
        <Button onClick={loaderUnmounted}>loaderUnmounted</Button>
      </Grid> */}
      <SupportPage widget={widget} />

      {loadbarUnmounted && (
        <MessageBox alertContent={alertContent} openAlertBox={openAlertBox} />
      )}
      <Switch>
        <Route path="/ping">
          <AdminPage />
        </Route>
        <Route
          path="/"
          render={() => (
            <Container>
              {navbarLazyloader.open && (
                <Navbar
                  // setopenProfile={setopenProfile}
                  seteventOpen={toggleEventlist}
                  setWidget={setWidget}
                  handleToggleInfo={handleToggleInfo}
                  setNoticeOpen={setNoticeOpen}
                  // user={user}
                  widget={widget}
                />
              )}
              {navbarLazyloader.open && !isMobileNavigator && (
                <GameBanner open={gameBannerOpen} onClose={closeGameBanner} />
              )}
              <Modal
                header={"Programme Info"}
                open={openInfo}
                setOpen={handleToggleInfo}
                component={ProgramInfoModal}
              />
              <Modal
                header={"User Guide"}
                open={openGuideModal}
                setOpen={handleCloseGuideModal}
                component={Guide}
              />
              <Modal
                header={"Notice"}
                open={noticeOpen}
                setOpen={setNoticeOpen}
                component={NoticeListTable}
              />
              <Modal
                header="VIRTUAL STAMP TOUR"
                open={openStamp}
                setOpen={onStampClose}
                setPrev={handleBackInStamp}
                component={Stamp}
              />
              <AlertModal
                open={responseAlert.open}
                setOpen={handleCloseAlert}
                msg={responseAlert.msg}
              />
              <Modal
                header={"Event"}
                open={openEventlist}
                component={Eventlist}
                setOpen={toggleEventlist}
              />
              {/* <Modal
                header={"Welcome to 1:1 chatting"}
                component={ParticipantChatUprism}
                open={openLoungeUprism}
                setOpen={handleLoungeUprismClose}
              /> */}

              {/* <JoinAlertModal
                setOpen={onCloseJoinAlert}
                open={inviteAlert.open}
                msg={inviteAlert.msg}
                join={handleClickJoin}
                cancel={onCancelJoin}
              /> */}

              <Modal
                header={"Tech Support"}
                open={openTechSupport}
                qaType="Tech Support"
                setOpen={handleCloseSupport}
                component={Techsupport}
              />

              <Modal
                header="Survey"
                setPrev={handleBackInSurvey}
                component={SurveyModal}
                open={openSurvey}
                setOpen={handleCloseSurvey}
              />
              {/* 
              <Modal
                header="PROFILE"
                // user={user}
                // open={openProfile}
                // setOpen={setopenProfile}
                component={Profile}
              /> */}
              <Suspense fallback={<div>loading..... .</div>}>
                <Switch>
                  <Route exact path={lobby.path} component={LobbyPage} />
                  <Route
                    exact
                    path={seoul.path}
                    render={() => <Loader component={SeoulBoothPage} />}
                  />

                  <Route
                    exact
                    path={theater.path}
                    render={() => <Loader component={TheaterPage} />}
                  />
                  <Route
                    exact
                    path={conference.path}
                    render={() => <Loader component={ConferencePage} />}
                  />
                  <Route
                    exact
                    // this contains /workshop/:id
                    path={`${roomOne.path}`}
                    render={() => <WorkshopPage />}
                  />

                  <Route
                    exact
                    path={`${lounge.link}`}
                    render={() => (
                      <Loader
                        openSurvey={openSurvey}
                        component={LoungePage}
                        // socket={socket}
                        // openLoungeUprism={openLoungeUprism}
                        // cancelOtherInvite={onCancelJoin}
                        // user={user}
                      />
                    )}
                  />

                  <Redirect to={redirect["default"].path} />
                </Switch>
              </Suspense>
            </Container>
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // loading: state.auth.loading,
  // alerts: state.auth.alerts,
  // numOfValidation: state.auth.numOfValidation,
  openStamp: state.opener.openStamp,
  openSurvey: state.opener.openSurvey,
  openEventlist: state.opener.openEventlist,
  navbarLazyloader: state.opener.navbarLazyloader,
  openInfo: state.opener.openInfo,
  loadbarUnmounted: state.loader.loadbarUnmounted,
  openAlertBox: state.opener.openAlertBox,
  alertContent: state.opener.alertContent,
  // inviteAlert: state.opener.inviteAlert,
  // openLoungeUprism: state.opener.openLoungeUprism,
  openGuideModal: state.opener.openGuideModal,
  responseAlert: state.opener.responseAlert,
  openTechSupport: state.opener.openTechSupport,
});

App.defaultProps = {
  user: null,
};

App.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(App);
