import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import {
  loadingbarZindex,
  secondary,
  primary,
  tertiary,
} from "../../styledComponent/Variables";
import { CusGrid } from "../../styledComponent/Layouts";

const Progress = styled(CircularProgress)`
  width: 80px;
  height: 80px;
  color: ${tertiary};
`;

const Container = styled(CusGrid)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${loadingbarZindex};
  background-color: ${primary};
`;

const Loadingbar = () => (
  <Container container justify="center" alignItems="center" color="primary">
    <Progress />
  </Container>
);

export default Loadingbar;
