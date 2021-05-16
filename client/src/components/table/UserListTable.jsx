import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";

import { convertNumToArray } from "../../utils/helper";

import { apiClient, mainPaths } from "../../utils/data/api";
// import { handleConnect, mySocket } from "../../utils/websocket";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";
import { detectTokenError } from "./../../utils/helper";

const columns = [
  { id: "idx", label: "NO" },
  {
    id: "name",
    label: "Name",
  },
  { id: "organization", label: "Organization" },
  {
    id: "country",
    label: "Country",
  },

  {
    id: "invite",
    label: "Invite",
  },
];

// const HeaderCell = styled(TableCell)`
//   padding: 0;
//   background: ${darkGrey};
//   color: white;
//   font-size: 1.4rem;
//   font-weight: 800;
//   border-bottom: unset;
//   font-family: NanumGothic;
// `;

// const ContentCell = styled(TableCell)`
//   padding: 0;
//   color: ${darkGrey};
//   font-size: 1.4rem;
//   font-weight: 800;
//   border-bottom: unset;
//   font-family: NanumGothic;
// `;

// const StyledTableBody = styled(TableBody)`
//   tr:nth-child(odd) {
//     background-color: ${white};
//   }
//   tr:nth-child(even) {
//     background-color: ${lightGrey};
//   }
// `;

// const RowInBody = styled(TableRow)`
//   :hover {
//     td {
//       background-color: #d5d5df;
//     }
//   }
// `;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   box: {
//     width: "100%",
//   },
//   container: {
//     maxHeight: 385,
//   },
//   search: {
//     position: "relative",
//     borderBottom: `1px solid ${darkGrey}`,
//     marginLeft: 0,
//     marginBottom: 10,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

const classes = {
  inviteTdata: {
    padding: "0.7rem 0.8rem",
  },

  btn: {
    width: "30px",
    height: "30px",
  },
};

const UserListTable = ({ handleInvite, setList, list, count }) => {
  // console.log("count");
  // console.log(count);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [input, setInput] = useState("");
  const [pageInfo, setpageInfo] = useState({
    pageTotal: 0,
    totalSize: 0,
  });

  const [userProfile, setuserProfile] = useState(null);
  const dispatch = useDispatch();
  const handleView = (e, row) => {
    if (!row.is_open_profile) return;
    setuserProfile(row);
  };

  const handleCloseProfile = () => {
    setuserProfile(null);
  };

  const handleInviteClick = () => {
    dispatch({
      type: OPEN_RESPONSE_ALERT,
      payload: {
        msg: "1:1 meeting is not available now",
      },
    });
  };

  // let config;
  // if (localStorage.token) {
  //   config = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.token}`,
  //     },
  //   };
  // }

  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await apiClient.get(
          `user?pageNo=${page}&itemSize=${rowsPerPage}`
        );
        console.log("useEffect");
        console.log(res);
        setpageInfo({
          ...pageInfo,
          pageTotal: res.data.pageTotal,
          totalSize: res.data.totalSize,
        });
        const newList = [...res.data.list];
        console.log("newList");
        console.log(newList);
        setList(newList);
      } catch (err) {
        console.log("err");
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
    getUserList();
    // startWaitingTimer();
  }, []);

  const handleSearch = async (e) => {
    try {
      let res;
      if (typeof input !== typeof "") {
        return;
      } else if (input === "") {
        res = await apiClient.get(`user?pageNo=1&itemSize=${rowsPerPage}`);
      }
      const keyword = encodeURIComponent(input);
      console.log("keyword :: ", keyword);
      res = await apiClient.get(
        `user?pageNo=1&itemSize=${rowsPerPage}&name=${keyword}`
      );

      console.log("res");
      console.log(res);
      setpageInfo({
        ...pageInfo,
        pageTotal: res.data.pageTotal,
        totalSize: res.data.totalSize,
      });
      setPage(1);

      setList(res.data.list);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };

  const handleRefreshClick = async () => {
    try {
      const res = await apiClient.get(
        `user?pageNo=${page}&itemSize=${rowsPerPage}`
      );

      setpageInfo({
        ...pageInfo,
        pageTotal: res.data.pageTotal,
        totalSize: res.data.totalSize,
      });
      setInput("");
      setPage(1);
      setList(res.data.list);
      console.log("handleRefreshClick");
      console.log(res);
    } catch (err) {
      console.log("err");
      console.log(err);
      if (err.response) {
        console.log("errresponse");
        console.log(err.response);
      }
    }
  };

  const handleChangePage = async (newPage) => {
    // const arrayToRender = list.slice((newPage -1) * 10, (newPage - 1) * 10 + 10);
    // console.log(arrayToRender)

    // if (arrayToRender.length < 10) {
    try {
      let res;
      if (input !== "") {
        const keyword = encodeURIComponent(input);
        console.log("keyword :: ", keyword);
        res = await apiClient.get(
          `user?pageNo=${newPage}&itemSize=${rowsPerPage}&name=${keyword}`
        );
      } else {
        res = await apiClient.get(
          `user?pageNo=${newPage}&itemSize=${rowsPerPage}`
        );
      }

      console.log("res");
      console.log(res);

      const newList = [];
      setpageInfo({
        ...pageInfo,
        pageTotal: res.data.pageTotal,
        totalSize: res.data.totalSize,
      });
      setList(res.data.list);
    } catch (err) {
      console.log("err");
      console.log(err);
      if (err.response) {
        console.log("errresponse");
        console.log(err.response);
      }
    }
    // }
    setPage(newPage);
  };

  const handleSearchInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPressOnSearch = (e) => {
    console.log("e");
    console.log(e);
    if (e.charCode == 13) {
      handleSearch();
    }
    if (e.keyCode == 13) {
      handleSearch();
    }
  };

  // - 대화 초대 !!!
  if (!list) return <div>Loading...</div>;

  return (
    <>
      <div className="table">
        <p
          style={{
            fontSize: "23px",
            textAlign: "center",
            margin: "0 0 10px 0",
            color:"blue"
          }}
        >
          You can check other attendees’ business card and invite them to 1:1
          meetings here.
        </p>
        <div className="top">
          <p className="total">
            <button
              onClick={(e) => handleRefreshClick(e)}
              className="refresh"
            ></button>
          </p>
          <p className="search-box">
            <input
              onChange={handleSearchInputChange}
              type="text"
              value={input}
              className="type1"
              onChange={handleSearchInputChange}
              value={input}
              placeholder="search"
              onKeyPress={handleKeyPressOnSearch}
              onKeyDown={handleKeyPressOnSearch}
            />
            <button onClick={handleSearch}>search</button>
          </p>
        </div>
        <div className="tb-wrap">
          <table className="center">
            <caption className="sr-only">table</caption>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list
                // .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row, index) => {
                  return (
                    <tr className="rejected" key={index}>
                      {columns.map((column, i) => {
                        const value = row[column.id];
                        if (column.id === "idx") {
                          return <td key={i}>{index + (page - 1) * 10 + 1}</td>;
                        }
                        if (column.id === "name") {
                          return (
                            <td key={i}>
                              {row.first_name} &nbsp; {row.last_name}
                            </td>
                          );
                        }
                        if (column.id === "invite") {
                          return (
                            <td style={classes.inviteTdata} key={i}>
                              <button
                                onClick={(e) => {
                                  handleView(e, row);
                                }}
                                style={{
                                  cursor:
                                    row.is_open_profile === 1
                                      ? null
                                      : "default",
                                  width: "35px",
                                  height: "35px",
                                }}
                                className={
                                  "profile " +
                                  (row.is_open_profile === 1 ? "on" : "")
                                }
                              >
                                {row.is_open_profile}
                              </button>
                              {row.status === "ready" ? (
                                <button
                                  style={{
                                    fontSize: "16px",
                                    color: "#e95650",
                                    background: "none",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                >
                                  {count}
                                </button>
                              ) : (
                                <button
                                  onClick={handleInviteClick}
                                  style={{
                                    cursor:
                                      row.online_yn === 1
                                        ? "pointer"
                                        : "default",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                  className={
                                    "invite " +
                                    (index === 0 || index === 1? "on" : "")
                                  }
                                >
                                  {row.online_yn}
                                </button>
                              )}
                              {/* <IconButton
                                onClick={(e) => {
                                  handleView(e, row);
                                }}
                              >
                                <RecentActorsIcon />
                              </IconButton> */}
                            </td>
                          );
                        }
                        return <td key={i}>{value}</td>;
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="pagination">
            <ul>
              <li className="first">
                <button onClick={() => handleChangePage(1)}>&lt;&lt;</button>
              </li>
              <li className="prev">
                <button onClick={() => handleChangePage(page - 1)}>&lt;</button>
              </li>
              {convertNumToArray(pageInfo.pageTotal, page).map(
                (pageNum, index) => (
                  <li
                    key={index}
                    className={pageNum === page ? "active" : null}
                  >
                    <button onClick={() => handleChangePage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                )
              )}

              <li className="next">
                <button onClick={() => handleChangePage(page + 1)}>&gt;</button>
              </li>
              <li className="last">
                <button onClick={() => handleChangePage(pageInfo.pageTotal)}>
                  &gt;&gt;
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {userProfile && (
        <div className="popup profile">
          <div className="pop-tb">
            <div className="pop-cell zoomIn">
              <div className="login-box">
                <div className="profile-header">
                  <span className="name-title">first name</span>
                  <p className="name">{userProfile.first_name}</p>
                  <span className="name-title">last name</span>
                  <p className="name">{userProfile.last_name}</p>
                  <button onClick={handleCloseProfile} className="close">
                    close
                  </button>
                </div>

                <div className="pop-content data-table">
                  <div className="profile-info">
                    <dl>
                      <dt>ID (e-mail)</dt>
                      <dd>{userProfile.email}</dd>
                    </dl>
                    <dl>
                      <dt>Organization</dt>
                      <dd>{userProfile.organization}</dd>
                    </dl>
                    <dl>
                      <dt>Country</dt>
                      <dd>{userProfile.country}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // authenticated: state.auth.authenticated,
});

UserListTable.propTypes = {
  // user: PropTypes.object,
};

UserListTable.defaultProps = {
  // user: null,
};

export default connect(mapStateToProps, null)(UserListTable);
