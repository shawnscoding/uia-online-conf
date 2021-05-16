import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { detectTokenError } from "../../utils/helper";
import { authrizationFailed } from "../../redux/auth/actions";
import { useDispatch } from "react-redux";
import { apiClient } from "../../utils/data/api";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";
const gift_1 = "https://d2lx5o5tt1uoj2.cloudfront.net/assets/1winner.jpg";
const gift_2 = "https://d2lx5o5tt1uoj2.cloudfront.net/assets/2winner.jpg";
const gift_3 = "https://d2lx5o5tt1uoj2.cloudfront.net/assets/3winner.jpg";

const style = {
  stamp: {
    width: "5.5rem",
    height: "5.5rem",
  },
  text: {
    width: "38rem",
    marginRight: "1rem",
    fontSize: "1.7rem",
  },
};

const Stamp = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [list, setList] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const currentList = useRef(null);
  const innerWidth = window.innerWidth;

  useEffect(() => {
    const getStampInfo = async () => {
      try {
        const res = await apiClient.get("/stamp");

        console.log("res ::", res);
        const list = res.data.list;
        setList(list);
        setIsLoaded(true);

        currentList.current = list; // to access from non-rendering function.
        const _totalScore = getTotalScore();
        setTotalScore(_totalScore);
      } catch (err) {
        console.log(err);
        if (err && err.response) {
          const code = err.response.data.code;
          const msg = err.response.data.error;
          if (detectTokenError(code)) {
            dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
          }
        }
      }
    };

    getStampInfo();
  }, []);

  const getTotalScore = () => {
    const list = currentList.current;
    console.log("list ::", list);
    let totalScore = 0;

    if (includes("LOB-01")) totalScore += 1;
    if (includes("LOB-02")) totalScore += 1;
    if (includes("CONF-01")) totalScore += 1;
    if (
      includes("WORK-RM-01") &&
      includes("WORK-RM-02") &&
      includes("WORK-RM-03")
    )
      totalScore += 1;
    if (includes("SB-01")) totalScore += 3; // Uprism 참여 시 3개
    if (includes("SB-02")) totalScore += 1; // Download brochures
    if (
      includes("LOU-GAME-01") &&
      includes("LOU-GAME-02") &&
      includes("LOU-GAME-03")
    )
      totalScore += 3;
    if (includes("LOU-01")) {
      const cnt = includes("LOU-01").cnt;
      if (cnt === 1) {
        totalScore += 1;
      } else if (cnt >= 2) {
        totalScore += 2;
      }
    }
    if (includes("LOU-02")) {
      const cnt = includes("LOU-02").cnt;
      if (cnt === 1) {
        totalScore += 1;
      } else if (cnt >= 2) {
        totalScore += 2;
      }
    }

    if (includes("T01-V01") && includes("T01-V02") && includes("T01-V03"))
      totalScore += 1;
    if (
      includes("T02-V01") &&
      includes("T02-V02") &&
      includes("T02-V03") &&
      includes("T02-V04")
    )
      totalScore += 1;
    if (
      includes("T03-V01") &&
      includes("T03-V02") &&
      includes("T03-V03") &&
      includes("T03-V04")
    )
      totalScore += 1;
    if (includes("T04-V01") && includes("T04-V02")) totalScore += 1;
    if (includes("T05-V01") && includes("T05-V02") && includes("T05-V03"))
      totalScore += 1;
    console.log("totalScore ::", totalScore);
    return totalScore;
  };

  const includes = (keyword) => {
    const list = currentList.current; // to access from non-rendering function.
    // console.log("keyword ::", keyword);
    // console.log("list ::", list);
    if (!list) return null;

    const stamp = list.filter((item) => {
      if (item.stamp_code.includes(keyword)) {
        return true;
      } else {
        return false;
      }
    });
    // console.log("keyword :: stamp :: ", keyword, stamp);
    if (stamp.length > 0) return stamp[0];
    return null;
  };
  // console.log('isLoaded ::', isLoaded);
  if (isLoaded === false) return <h1>Loading</h1>;

  return (
    <div className="stamp-box" style={{ overflowX: "hidden" }}>
      <div className="title">
        <h2>Surprise Gifts!</h2>
        For delegates collecting all stamps
      </div>

      <div className="gift-list">
        <div className="first">
          <div className="img">
            <img src={gift_1} alt="" />
          </div>
          <p>
            <span>1 Winners</span>Galaxy Book S(LTE)
          </p>
        </div>
        <div className="two">
          <div className="img">
            <img src={gift_2} alt="" />
          </div>
          <p>
            <span>3 Winners</span>iPAD 7<sup>th</sup> Gen
          </p>
        </div>
        <div className="last">
          <div className="img">
            <img src={gift_3} alt="" />
          </div>
          <p>
            <span>10 Winners</span>Airpod 2nd Gen
          </p>
        </div>
      </div>
      <div className="txt-rigt">
        * The prize will be delivered to the winners
      </div>
      <div className="gift-step">
        <ul>
          <li className={totalScore >= 5 ? "clear" : ""}>
            <p className="top">
              <span className="star">5</span>
            </p>
            <p className="bottom">5$ Amazon gift card</p>
          </li>
          <li className={totalScore >= 10 ? "clear" : ""}>
            <p className="top">
              <span className="star">10</span>
            </p>
            <p className="bottom">15$ Amazon gift card</p>
          </li>
          <li className={totalScore >= 20 ? "clear" : ""}>
            <p className="top">
              <span className="star">20</span>
            </p>
            <p className="bottom">
              30$ Amazon gift card{" "}
              <span>+ Take your best chance to win prize!!</span>
            </p>
          </li>
        </ul>
      </div>
      <div className="stamp-list">
        <li>
          <dl>
            <dt>LOBBY</dt>
            <label style={{ display: "none" }}>LOB-01 / max 1</label>
            <dd className="txt" style={style.text}>
              Welcome to Virtual Seoul! Welcome stamp
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={includes("LOB-01") ? "on" : ""}
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>LOBBY</dt>
            <label style={{ display: "none" }}>LOB-02 / max 1</label>
            <dd className="txt" style={style.text}>
              Click Lobby Screen and Watch Seoul
              <br />
              Promotional Video
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={includes("LOB-02") ? "on" : ""}
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Conference hall</dt>
            <label style={{ display: "none" }}>CONF-01 / max 1</label>
            <dd className="txt" style={style.text}>
              Watch 'E-Conference' at Conference Hall
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={includes("CONF-01") ? "on" : ""}
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>workshop room</dt>
            <label style={{ display: "none" }}>
              WORK-RM-01, WORK-RM-02, WORK-RM-03 모두 있을 때 1개
            </label>
            <dd className="txt" style={style.text}>
              Participate in a Workshop Session
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={
                  includes("WORK-RM-01") &&
                  includes("WORK-RM-02") &&
                  includes("WORK-RM-03")
                    ? "on"
                    : ""
                }
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>seoul booth</dt>
            <label style={{ display: "none" }}>
              SB-01 - Uprism 참여 시 3개 / max 3
            </label>
            <dd className="txt" style={style.text}>
              Click on the Screen! Say Hello to STO
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={includes("SB-01") ? "on" : ""}
              ></span>
              <span
                style={style.stamp}
                className={includes("SB-01") ? "on" : ""}
              ></span>
              <span
                style={style.stamp}
                className={includes("SB-01") ? "on" : ""}
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>seoul booth</dt>
            <label style={{ display: "none" }}>SB-02 / max 1</label>
            <dd className="txt" style={style.text}>
              Download brochures (or click open)
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={includes("SB-02") ? "on" : ""}
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Lounge</dt>
            <label style={{ display: "none" }}>
              LOU-GAME-01, LOU-GAME-02, LOU-GAME-03 모두 진행하면 3개 한번에
              지급 / max 3
            </label>
            <dd className="txt" style={style.text}>
              Create ‘PLUS SEOUL Membership’ in Korean
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={
                  includes("LOU-GAME-01") &&
                  includes("LOU-GAME-02") &&
                  includes("LOU-GAME-03")
                    ? "on"
                    : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("LOU-GAME-01") &&
                  includes("LOU-GAME-02") &&
                  includes("LOU-GAME-03")
                    ? "on"
                    : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("LOU-GAME-01") &&
                  includes("LOU-GAME-02") &&
                  includes("LOU-GAME-03")
                    ? "on"
                    : ""
                }
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Lounge</dt>
            <label style={{ display: "none" }}>LOU-01 / max 2</label>
            <dd className="txt" style={style.text}>
              Open Chat with Other Participants
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={
                  includes("LOU-01") && includes("LOU-01").cnt >= 1 ? "on" : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("LOU-01") && includes("LOU-01").cnt >= 2 ? "on" : ""
                }
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Lounge</dt>
            <label style={{ display: "none" }}>LOU-02 / max 2</label>
            <dd className="txt" style={style.text}>
              1:1 Chat with Other Participants
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={
                  includes("LOU-02") && includes("LOU-02").cnt >= 1 ? "on" : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("LOU-02") && includes("LOU-02").cnt >= 2 ? "on" : ""
                }
              ></span>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Theater</dt>
            <label style={{ display: "none" }}>
              T01-V01, T01-V02, T01-V03 = 1 / T02-V01, T02-V02, T02-V03, T02-V04
              = 1 / T03-V01, T03-V02, T03-V03, T03-V04 = 1 / T04-V01, T04-V02 =
              1 / T05-V01, T05-V02, T05-V03 = 1
            </label>
            <dd className="txt" style={style.text}>
              Watch Seoul VR Tour
              {innerWidth > 450 && <br />}
              (1 stamp for each categories)
            </dd>
            <dd className="stamp">
              <span
                style={style.stamp}
                className={
                  includes("T01-V01") &&
                  includes("T01-V02") &&
                  includes("T01-V03")
                    ? "on"
                    : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("T02-V01") &&
                  includes("T02-V02") &&
                  includes("T02-V03") &&
                  includes("T02-V04")
                    ? "on"
                    : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("T03-V01") &&
                  includes("T03-V02") &&
                  includes("T03-V03") &&
                  includes("T03-V04")
                    ? "on"
                    : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("T04-V01") && includes("T04-V02") ? "on" : ""
                }
              ></span>
              <span
                style={style.stamp}
                className={
                  includes("T05-V01") &&
                  includes("T05-V02") &&
                  includes("T05-V03")
                    ? "on"
                    : ""
                }
              ></span>
            </dd>
          </dl>
        </li>
      </div>
    </div>
  );
};

Stamp.propTypes = {};

export default Stamp;
