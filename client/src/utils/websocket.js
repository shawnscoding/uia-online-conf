import socketio from "socket.io-client";
import { apiClient, mainPaths } from "./data/api";
import setAuthToken from "./setAuthToken";
import { HANDLE_OPEN_JOINALERT, OPEN_ONE_TO_ONE_CHAT } from "../redux/types";

const handleConnect = ({
  user,
  dispatch,
  functionWrapper,
  checkUserStatus,
}) => {
  const config = require("../config/config");
  const host = config.websocketServer;
  // console.log("user :: ", user);
  const projectCode = "S1#"; // 사용자를 구분하기 위한 project code.
  const userid = projectCode + user.email; //"abc@abc.com"; // localstorage 에서 가져와야함..$('#UserIdInputText').val();
  const pairUserId = projectCode + user.idx; //"abcd"; //$('#PairUserIdInputText').val();
  // console.log(
  // "connectionServer userid=" + userid + " pairUserId=" + pairUserId
  // );

  var supportsWebSockets = "WebSocket" in window || "MozWebSocket" in window;
  // console.log("supportsWebSockets ::", supportsWebSockets); // true
  // console.log("socketio :: ", socketio);
  if (supportsWebSockets) {
    let socket = socketio.connect(host, {
      transports: ["websocket"], // websocket만을 사용하도록 설정
      query: `userid=${userid}&pair_userid=${pairUserId}`, // user id, pair userid
    });

    socket.on("event", function (data) {
      // console.log("event receiveed..");
      // console.log(data);
      // console.log("type=" + typeof data);

      const msg = data.msg;
      // console.log(typeof msg); // object
      if (typeof msg === "object") {
        const type = msg.type; // notice, invite
        // console.log(type, "type");

        if (type === "notice") {
          // alert('call~~');
          // console.log('functionWrapper ::', functionWrapper);
          // const ran = Math.random();
          // console.log("alert sent ", dispatch);
          // dispatch({
          //   type: OPEN_ALERT_AND_SET_ITS_CONTENT,
          //   payload: {
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
          //   },
          // });
          // setOpenMessageBox(true);
          functionWrapper(msg);
        } else if (type === "chat-invite") {
          const userBusy = checkUserStatus();
          if (userBusy) {
            return;
          }
          dispatch({
            type: HANDLE_OPEN_JOINALERT,
            payload: {
              msg: "someone is inviting you, would you like to join ?",
              open: true,
              sender: data.targetUserId,
              targetUserId: data.sender,
            },
          });
        } else if (type === "chat-accept") {
          // alert("chat accepted.");

          // 방 만들기.
          const getVideoChat = async () => {
            if (localStorage.token) {
              setAuthToken(localStorage.token);

              console.log("getVideoChat :: ", data);
              const response = await apiClient.post(
                mainPaths["videochatRequest"].post,
                { hostEmail: data.targetUserId, guestEmail: data.sender }
              );
              console.log("response :: ", response);
              const payload = response.data;
              console.log("payload ::", payload);

              const joinUrl = payload.joinUrl;
              // setIframe(joinUrl);
              const msg = {};

              dispatch({
                type: OPEN_ONE_TO_ONE_CHAT,
                payload: joinUrl,
              });

              msg.type = "chat-join";
              msg.joinUrl = joinUrl;

              socket.emit("to", {
                msg: msg,
                sender: data.targetUserId,
                targetUserId: data.sender,
              });
            }
          };

          getVideoChat(); // !!!
        } else if (type === "chat-join") {
          // console.log("chat-join  ::", data);
          // console.log(msg.joinUrl);
          dispatch({
            type: OPEN_ONE_TO_ONE_CHAT,
            payload: msg.joinUrl,
          });
        }
      } else if (typeof msg === "string") {
      }
    });

    socket.on("error", function (data) {
      console.log("message recived..");
      console.log(data);

      if (data.error && data.error === "user not found") {
        // invite 했는데 사용자가 없는 경우.
        // alert(
        //   "접속된 사용자가 아닙니다.!! 목록에서 접속된 사용자만 표시하도록 수정중."
        // );
        return;
      }
    });

    return socket;
  }

  return null;
};

// export const mySocket = socket;

export default handleConnect;
// export {
//   handleConnect,
//   getSocket
// }
