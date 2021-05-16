import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Lobby from "../../WebGL/Page/Lobby";
// import SignInModal from "../modal/SignInModal";
import IntroLoader from "../loaders/IntroLoader";
import { useDispatch, connect } from "react-redux";
import {
  LOBBY_SECOND_LOADER_CLOSE,
  LAZYLOAD_NAVBAR,
  CANCEL_DELAY_NAVBAR,
  LOBBY_LOADBAR_WILLMOUNT,
} from "./../../redux/types";
import Loadingbar from "../loaders/Loadingbar";
import Modal from "./../modal/Modal";
import VideoAd from "./../../components/modalContents/VideoAd";
// import { storeStamp } from "../../utils/helper";
// import { authrizationFailed } from "./../../redux/auth/actions";






const LobbyPage = ({
  // authenticated,
  introLoaderUnmounted,
  secondLoaderOpen,
}) => {
  const dispatch = useDispatch();
  const [loadProgress, setLoadProgress] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [loadingbarCount, setLoadingbarCount] = useState(20);
  const [skipClicked, setSkipClicked] = useState(false);
  const [arrivedToMap, setArrived] = useState(false);

  const loadbarCloseReady = () => {
    if (skipClicked) {
      // 이거 로비페이지에
      return true;
    } else if (loadingbarCount === 10) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch({ type: LOBBY_LOADBAR_WILLMOUNT });
    dispatch({ type: LAZYLOAD_NAVBAR });

    return () => {
      dispatch({ type: CANCEL_DELAY_NAVBAR });
    };
  }, []);

  // useEffect(() => {
  //   const enterByTimeout = authenticated && loadingbarCount === 10;
  //   const enterBySkip = authenticated && skipClicked;
  //   if (enterByTimeout || enterBySkip) {
  //     const body = {
  //       stamp_code: "LOB-01",
  //     };
  //     const logUserOut = () => dispatch(authrizationFailed());
  //     storeStamp({ logUserOut, body });
  //   }
  // }, [authenticated, loadingbarCount, skipClicked]);

  const onCloseSecondLoader = () => {
    dispatch({ type: LOBBY_SECOND_LOADER_CLOSE });
  };

  if (introLoaderUnmounted)
    return (
      <React.Fragment>
        {/* {!secondLoaderOpen && !authenticated && arrivedToMap && <SignInModal />} */}

        <Modal
          header={"Lobby Screen"}
          setOpen={setVideoModalOpen}
          open={videoModalOpen}
          component={VideoAd}
          video_link="https://player.vimeo.com/video/457991618?autoplay=1&loop=1&title=0&byline=0&portrait=0"
        />

        <Lobby
          videoModalOpen={videoModalOpen}
          // !!! introLoaderUnmounted 이것으 트루면 progress 말고
          //  setLoadbarOpen()만 실행시켜주세요 !
          setArrived={setArrived}
          introLoaderUnmounted={introLoaderUnmounted}
          setVideoModalOpen={setVideoModalOpen}
          // authenticated={authenticated}
          setLoadbarOpen={onCloseSecondLoader}
        />
        {secondLoaderOpen && <Loadingbar />}
      </React.Fragment>
    );
  return (
    <React.Fragment>
      {/* {loadbarCloseReady() && !authenticated && arrivedToMap && <SignInModal />} */}
      {loadbarCloseReady() && (
        <Modal
          header={"Lobby Screen"}
          setOpen={setVideoModalOpen}
          open={videoModalOpen}
          component={VideoAd}
          video_link="https://player.vimeo.com/video/457991618?autoplay=1&loop=1&title=0&byline=0&portrait=0"
        />
      )}
      <Lobby
        setArrived={setArrived}
        skipClicked={skipClicked}
        videoModalOpen={videoModalOpen}
        setVideoModalOpen={setVideoModalOpen}
        // authenticated={authenticated}
        setLoadbarOpen={onCloseSecondLoader}
        setLoadProgress={setLoadProgress}
        setSkipClicked={skipClicked}
        setSkipCounted={loadingbarCount}
      />
      {!loadbarCloseReady() && (
        <IntroLoader
          setLoadingbarCount={setLoadingbarCount}
          setSkipClicked={setSkipClicked}
          progress={loadProgress}
        />
      )}
    </React.Fragment>
  );
};

// LobbyPage.propTypes = {
//   // authenticated: PropTypes.bool.isRequired,
// };

const mapStateToProps = (state) => ({
  introLoaderUnmounted: state.loader.lobbySecondLoader.ready,
  secondLoaderOpen: state.loader.lobbySecondLoader.open,
});

export default connect(mapStateToProps)(LobbyPage);
