import React from "react";
import PropTypes from "prop-types";
import { Fab } from "@material-ui/core";
import { mainRoutes } from "../../utils/data/Navbar";
import { useHistory, useLocation } from "react-router-dom";
// import { userLogOut } from "../../redux/auth/actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import map_360 from "../../assets/help/map_360.png";
import { TOGGLE_GUIDE_MODAL, TOGGLE_TECH_SUPPORT } from "./../../redux/types";
import { handleDownloadGame, mapObjToArr } from "./../../utils/helper";
import RESOURCE from "./../../utils/imgs-1010/imgs";
import { CDN_HOST } from "../../config/define";
const GobackBtnContainer = styled.div`
  position: fixed;
  bottom: 60px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  position: fixed;
  width: 80px;
  height: 80px;
  margin-left: 340px;
  margin-top: 10px;

  @media only screen and (max-width: 800px) {
    margin-left: 90px;
    margin-top: 10px;
  }
`;

const NavbarBtn = styled.button`
  background-color: ${(props) =>
    props.active === "active" && `rgba(34, 36, 74, 0.8) !important`};
  font-weight: ${(props) => props.active === "active" && "bold !important"};
`;

const Navbar = ({
  // user,
  // userLogOut,
  handleToggleInfo,
  setNoticeOpen,
  // setopenProfile,
  seteventOpen,
  // setguideOpen,
}) => {
  // const { first_name, last_name } = user;

  // const { profile } = userRoutes;
  // const { subLink } = workshop;

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // const preventActiveByClassName = (item, lobby, pathname) => {
  //   const workshop = pathname.split("/");

  //   if (item.link === lobby.link) {
  //     if (pathname !== item.link) {
  //       return "notInLobby";
  //     } else {
  //       return null;
  //     }
  //   } else if (`/${workshop[1]}` === item.link) {
  //     return "active";
  //   }
  // };

  // const directUserExceptWorkshop = (link) => {
  //   if (link === workshop.link) {
  //     return `${workshop.link}${subLink["roomOne"].link}`;
  //   } else {
  //     return link;
  //   }
  // };

  // const handleGoToProfile = () => {
  //   history.push('/profile');
  // };

  const handleClickSecondUl = (item) => {
    const { to } = item;
    if (to === "info") {
      handleToggleInfo();
    } else if (to === "notice") {
      setNoticeOpen(true);
    } else if (to === "support") {
      dispatch({ type: TOGGLE_TECH_SUPPORT });
    } else if (to === "event") {
      seteventOpen(true);
    } else if (to === "guide") {
      dispatch({
        type: TOGGLE_GUIDE_MODAL,
      });
    } else {
      alert("something went wrong,,, refresh and try again");
      return;
    }
  };

  const handleGoBack = () => {
    history.push(mainRoutes["lobby"].link);
  };

  // const handleRedirect = (path) => {
  //   console.log("handleRedirect Call. ::", path);
  //   history.push(path);
  // };

  const handleNavigation = (item) => {
    const { link } = item;
    history.push(link);
  };

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/profile" && (
        <GobackBtnContainer>
          <Fab
            style={{
              opacity: "0.8",
            }}
            onClick={handleGoBack}
            color="primary"
            size="large"
          >
            <ArrowBackIcon fontSize="large" />
          </Fab>
        </GobackBtnContainer>
      )}

      <div className="nav">
        <input type="checkbox" className="nav-checkbox" id="nav-tggle" />
        <label htmlFor="nav-tggle" className="nav-button">
          <span className="nav-icon">&nbsp;</span>
        </label>
        <div className="nav-bg">&nbsp;</div>

        <div className="side-menu slideInLeft nav-body">
          <div className="side-menu-list">
            <div
              style={{
                // background: "inherit",
                // fontSize: "38px",
                // textIndent: "0",
                // padding: "36px 40px",
                // color: "#fff",
                background: `url(${RESOURCE.welcome_to_virtualSEOUL}) no-repeat center center`,
              }}
              className="side-header"
            >
              Welcome to ​ Virtual Seoul
            </div>
            <div className="user-info">
              <p className="name">Guest</p>
              <p className="btn-side">
                {/* <button
                  type="button"
                  onClick={() => {
                    setopenProfile(true);
                  }}
                  style={{ fontSize: "13px" }}
                >
                  My Page
                </button> */}
                {/* <button
                  type="button"
                  // onClick={userLogOut}
                  style={{ fontSize: "13px" }}
                >
                  log-out
                </button> */}
              </p>
            </div>
            <div className="menu">
              <ul>
                {mapObjToArr(mainRoutes).map((item) => {
                  return (
                    <li key={item.id} className={item.class}>
                      <NavbarBtn
                        type="button"
                        active={location.pathname === item.link && "active"}
                        onClick={() => handleNavigation(item)}
                      >
                        <label htmlFor="nav-tggle" className="nav-button">
                          {item.label}
                        </label>
                      </NavbarBtn>
                    </li>
                  );
                })}

                {/* <li className="hall">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/conference");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Conference Hall​
                    </label>
                  </button>
                </li>
                <li className="room">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/workshop/room1");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Workshop Room 1​
                    </label>
                  </button>
                </li>
                <li className="room">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/workshop/room2");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Workshop Room 2
                    </label>
                  </button>
                </li>
                <li className="room">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/workshop/room3");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Workshop Room 3
                    </label>
                  </button>
                </li>
                <li className="theater">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/theater");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Theater
                    </label>
                  </button>
                </li>
                <li className="booth">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/seoul");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Seoul Booth
                    </label>
                  </button>
                </li>
                <li className="lounge">
                  <button
                    type="button"
                    onClick={(e) => {
                      history.push("/lounge");
                    }}
                  >
                    <label htmlFor="nav-tggle" className="nav-button">
                      Lounge
                    </label>
                  </button>
                </li> */}
              </ul>
              <ul>
                <li className="support​">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClickSecondUl({ to: "guide" });
                    }}
                  >
                    Guide
                  </button>
                </li>
                <li className="info">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClickSecondUl({ to: "info" });
                    }}
                  >
                    Programme Info
                  </button>
                </li>
                {/* <li className="notice">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClickSecondUl({ to: "notice" });
                    }}
                  >
                    Notice
                  </button>
                </li> */}
                <li className="support​">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClickSecondUl({ to: "support" });
                    }}
                  >
                    Technical Support
                  </button>
                </li>
                <li className="event">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClickSecondUl({ to: "event" });
                    }}
                  >
                    Event
                  </button>
                </li>
                <li className="banner-game1">
                  <img
                    onClick={() => handleDownloadGame()}
                    src={`${CDN_HOST}/assets/banner_playground.png`}
                    alt="Virtual Seoul Playground"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </li>
                <li>
                  <div
                    style={{
                      color: "#E6E6E6",
                      margin: "2rem 4rem 0rem 4rem",
                      lineHeight: "20px",
                    }}
                  >
                    Copyright © 2020.
                    <br />
                    Seoul Tourism Organization.
                    <br />
                    All rights reserved.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Img src={map_360} />
    </>
  );
};

Navbar.propTypes = {
  userLogOut: PropTypes.func.isRequired,
  // user: PropTypes.object,
  userLogOut: PropTypes.func.isRequired,
  setProgramInfoOpen: PropTypes.func.isRequired,
  setNoticeOpen: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  // user: null,
};

Navbar.propTypes = {};

export default Navbar;
