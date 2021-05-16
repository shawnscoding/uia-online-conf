import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { black, footerZindex } from "../../styledComponent/Variables";
import { white } from "./../../styledComponent/Variables";
import { Text } from "./../../styledComponent/Text";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  opacity: 0.8;
  background: ${black};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${footerZindex};
`;

const Footer = () => {
  return (
    <Container>
      <Text sz="2.0rem" cr={white}>
        Zoom in and out to explore, click on Landmark to open content
      </Text>
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
