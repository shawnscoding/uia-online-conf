import React, { useState } from "react";
import PropTypes from "prop-types";

import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { redirect } from "../../utils/data/Navbar";
import { connect, useDispatch } from "react-redux";
import Loadingbar from "./Loadingbar";
import {
  SET_LOBBY_LOADER_READY,
  OPEN_ROOM_LOADER,
  CLOSE_ROOM_LOADER,
} from "./../../redux/types";

const Loader = ({
  // authenticated,
  roomLoaderOpen,
  // loading,
  component: Component,
  ...rest
}) => {
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_LOBBY_LOADER_READY });
  }, []);

  useEffect(() => {
    dispatch({ type: OPEN_ROOM_LOADER });
  }, [location.pathname]);

  const onCloseLoader = () => {
    dispatch({ type: CLOSE_ROOM_LOADER });
  };

  // if (!loading && !authenticated)
  // return <Redirect to={redirect["default"].link} />;
  return (
    <React.Fragment>
      {roomLoaderOpen && <Loadingbar />}
      <Component
        // authenticated={authenticated}
        setLoadbarOpen={onCloseLoader}
        {...rest}
      />
    </React.Fragment>
  );
};

Loader.propTypes = {};

const mapStateToProps = (state) => ({
  // loading: state.auth.loading,
  // authenticated: state.auth.authenticated,
  roomLoaderOpen: state.loader.roomLoaderOpen,
});

export default connect(mapStateToProps)(Loader);
