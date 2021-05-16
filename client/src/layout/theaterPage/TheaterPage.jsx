import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { theaterPaths, apiClient } from "./../../utils/data/api";

import Theater from "./../../WebGL/Page/Theater";

import VideoCategoryModal from "../modal/VideoCategoryModal";
import { useDispatch } from "react-redux";
import { authrizationFailed } from "./../../redux/auth/actions";
import { detectTokenError } from "../../utils/helper";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";

const TheaterPage = ({ setLoadbarOpen }) => {
  const [videos, setVideos] = useState(null);
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (authenticated) {
    const getVideos = async () => {
      try {
        // if (localStorage.token) {
        //   const config = {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.token}`,
        //     },
        //   };

        const res = await apiClient.get(theaterPaths["getAllCategoryImgs"].get);

        console.log("getVideos : ", res.data);
        setVideos(res.data);
        // } else {
        //   dispatch(authrizationFailed());
        // }
      } catch (err) {
        console.log(err);
        if (err && err.response) {
          const code = err.response.data.code;
          const msg = err.response.data.error;
          if (detectTokenError(code)) {
            dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
            dispatch(authrizationFailed());
          }
        }
      }
    };
    getVideos();
    // }
  }, []);

  return (
    <React.Fragment>
      {videos && (
        <Theater
          setLoadbarOpen={setLoadbarOpen}
          setApi={setApi}
          videos={videos}
          setLoadbarOpen={setLoadbarOpen}
          setOpen={setOpen}
        />
      )}
      <VideoCategoryModal api={api} open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

TheaterPage.propTypes = {};

export default TheaterPage;
