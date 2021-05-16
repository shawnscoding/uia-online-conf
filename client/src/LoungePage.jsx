import React, { useState } from "react";
import PropTypes from "prop-types";
import Lounge from "./WebGL/Page/Lounge";
import Modal from "./layout/modal/Modal";
import UserListTable from "./components/table/UserListTable";
import AlertModal from "./layout/modal/AlertModal";
import { useEffect } from "react";
import { mainPaths, apiClient } from "./utils/data/api";
import SurveyModal from "./components/modalContents/SurveyModal";
import { connect, useDispatch } from "react-redux";
import { authrizationFailed } from "./redux/auth/actions";
import GlobalEvent from "./layout/modal/GlobalEvent";
import { detectTokenError } from "./utils/helper";
import LoungeGroupchat from "./components/modalContents/LoungeGroupchat";
import { OPEN_RESPONSE_ALERT } from "./redux/types";

const LoungePage = ({
  setLoadbarOpen,
  // user,
  // socket,
  // cancelOtherInvite,
  // openLoungeUprism,
}) => {
  const [count, setCount] = useState(null);
  const [groupUprism, setGroupUprism] = useState(null);
  const [openGroup, setOpenGroup] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const dispatch = useDispatch();
  const [userlistOpen, setUserlistOpen] = useState(false);
  const [list, setList] = useState([]);
  const [openSurvey, setOpenSurvey] = useState(false);

  const [gameAlert, setgameAlert] = useState({
    open: false,
    msg: "",
    header: "Alert",
  });

  // const handleInvite = (e, row) => {
  //   if (row.online_yn !== 1) return;
  //   const isReqeusting = list.find((user) => user.status === "ready");
  //   console.log("isReqeusting ::", isReqeusting);
  //   if (isReqeusting) {
  //     return;
  //   }
  //   console.log("row ::", row);
  //   // console.log("user ::", user);

  //   console.log("handleInvite socket ::", socket);
  //   if (!socket) return;

  //   const projectCode = "S1#"; // 사용자를 구분하기 위한 project code.
  //   const userid = projectCode + user.email;
  //   const targetid = projectCode + row.email;

  //   const msg = {
  //     type: "chat-invite",
  //     contents: "chat-invite..",
  //   };

  //   socket.emit("to", {
  //     msg: msg,
  //     sender: userid,
  //     targetUserId: targetid,
  //   });

  //   const newList = list.map((user) =>
  //     user.idx === row.idx
  //       ? {
  //           ...user,
  //           status: "ready",
  //         }
  //       : user
  //   );

  //   setList(newList);

  //   startWaitingTimer(newList);
  // };

  // useEffect(() => {
  //   if (openLoungeUprism) {
  //     console.log("openLoungeUprism :::", openLoungeUprism);
  //     // cancelOtherInvite(false);
  //     setUserlistOpen(false);
  //   }
  // }, [openLoungeUprism]);

  // const startWaitingTimer = (list) => {
  //   // + Progress
  //   setCount(20);
  //   const timer = setInterval(() => {
  //     setCount((prevCount) => {
  //       if (prevCount === 1) {
  //         console.log("runed");
  //         console.log(prevCount);
  //         setCount(null);

  //         const newList = list.map((user) =>
  //           user.status === "ready"
  //             ? {
  //                 ...user,
  //                 status: "finished",
  //               }
  //             : user
  //         );
  //         console.log(
  //           "test",
  //           list.map((user) => user.status || "not")
  //         );

  //         setList(newList);
  //         clearInterval(timer);
  //       }
  //       return prevCount - 1;
  //     });
  //   }, 1000);
  // };

  useEffect(() => {
    const getGroupUprism = async () => {
      try {
        // if (localStorage.token) {
        //   const config = {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.token}`,
        //     },
        //   };
        const res1 = await apiClient.get(mainPaths["getUprismInlounge"].get);
        setGroupUprism(res1.data);
        console.log("res ::: ", res1.data);
        // } else {
        // dispatch(authrizationFailed());
        // }
      } catch (err) {
        console.log("err");
        if (err.response !== null && err.response.data !== null) {
          const code = err.response.data.code;
          const msg = err.response.data.error;
          // if (detectTokenError(code)) {
          //   dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
          //   dispatch(authrizationFailed());
          // }
        } else {
          console.error("err response null");
          dispatch(authrizationFailed());
        }
      }
    };

    getGroupUprism();
  }, []);

  const onOpenUserlist = () => {
    setUserlistOpen(true);
  };

  const onCloseUserlist = () => {
    setUserlistOpen(false);
  };

  const onCloseGameAlert = () => {
    setgameAlert({
      ...gameAlert,
      open: false,
    });
  };

  return (
    <React.Fragment>
      <Modal
        count={count}
        // handleInvite={handleInvite}
        header={"1:1 Meetings with Delegates"}
        component={UserListTable}
        open={userlistOpen}
        // socket={socket}
        setOpen={onCloseUserlist}
        setList={setList}
        list={list}
      />

      <Modal
        header="Survey"
        component={SurveyModal}
        open={openSurvey}
        setOpen={setOpenSurvey}
        // surveyLink={
        //   "https://docs.google.com/forms/d/e/1FAIpQLSfXq4Q0epsxcSJqTA2rv1YclqZ2FunFG8fm4SPt6MuiBqis6Q/viewform?usp=sf_link"
        // }
      />

      {groupUprism && (
        <Lounge
          setOpenGame={setOpenGame}
          setSurvey={setOpenSurvey}
          setLoadbarOpen={setLoadbarOpen}
          setOpenUprism={setOpenGroup}
          setOpen={onOpenUserlist}
          setAPI={groupUprism}
        />
      )}

      <GlobalEvent
        alert={gameAlert}
        setAlert={setgameAlert}
        header={"Create your PLUS SEOUL membership"}
        open={openGame}
        setOpen={setOpenGame}
      />

      {groupUprism && (
        <Modal
          header="Welcome to Group Chat"
          component={LoungeGroupchat}
          open={openGroup}
          setOpen={setOpenGroup}
        />
      )}

      <AlertModal
        open={gameAlert.open}
        setOpen={onCloseGameAlert}
        header={gameAlert.header}
        msg={gameAlert.msg}
      />
    </React.Fragment>
  );
};

// LoungePage.propTypes = {};

// export default LoungePage;

const MemorizedLoungePage = React.memo(LoungePage);

export default MemorizedLoungePage;
// export default LoungePage;
