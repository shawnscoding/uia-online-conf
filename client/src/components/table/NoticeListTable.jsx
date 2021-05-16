import React, { useEffect, useState } from "react";
import LoadingMsg from "./../messages/LoadingMsg";
import { apiClient } from "../../utils/data/api";
import moment from "moment";
import { convertNumToArray } from "../../utils/helper";

const columns = [
  { id: "popup_time", label: "popup_time", width: 50, align: "center" },
  { id: "contents", label: "contents", width: 50, align: "left" },
];

const NoticeListTable = () => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    pageTotal: null,
  });

  const [noticeList, setNoticeList] = useState(null);

  const handleDirectFirstpage = () => {
    setPage(1);
  };

  const handleDirectLastpage = () => {
    setPage(pageInfo.pageTotal);
  };

  const handleDirectPrevpage = () => {
    setPage((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const handleDirectNextPage = () => {
    setPage((prev) => {
      if (pageInfo.pageTotal === prev) return prev;
      return prev + 1;
    });
  };

  const handleClickPage = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    const getNoticeList = async () => {
      try {
        // const res = await apiClient.get("/notice");
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        };
        const res = await apiClient.get("/alert", config);
        console.log("res");
        console.log(res);

        setNoticeList(res.data);
        setPageInfo({
          ...pageInfo,
          pageTotal: Math.ceil(res.data.length / 10),
        });
      } catch (err) {
        console.log("err");
        console.log(err);
      }
    };
    getNoticeList();
  }, []);
  if (!noticeList) return <LoadingMsg />;

  return (
    <>
      <div className="table">
        <div className="tb-wrap">
          <table className="center">
            <caption className="sr-only">table</caption>
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Time</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {noticeList
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row, index) => {
                  return (
                    <tr key={row.idx}>
                      <td>{(page - 1) * 10 + index + 1}</td>
                      <td>
                        {moment(row.popup_time).format("YYYY-MM-DD HH:mm")}
                      </td>
                      <td className="ellipsis" style={{ textAlign: "left" }}>
                        {row.contents}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="pagination">
            <ul>
              <li className="first">
                <button onClick={handleDirectFirstpage}>&lt;&lt;</button>
              </li>
              <li className="prev">
                <button onClick={handleDirectPrevpage}>&lt;</button>
              </li>
              {convertNumToArray(pageInfo.pageTotal, page).map(
                (pageNum, index) => (
                  <li
                    key={index}
                    className={pageNum === page ? "active" : null}
                  >
                    <button onClick={() => handleClickPage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                )
              )}

              <li className="next">
                <button onClick={handleDirectNextPage}>&gt;</button>
              </li>
              <li className="last">
                <button onClick={handleDirectLastpage}>&gt;&gt;</button>
              </li>
            </ul>
          </div>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={noticeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </div>
      </div>
    </>
  );
};

NoticeListTable.propTypes = {};

export default NoticeListTable;
