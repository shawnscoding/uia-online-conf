import React from "react";
import PropTypes from "prop-types";
import { Text } from "./../../styledComponent/Text";
import { Grid } from "@material-ui/core";
import { BgImg } from "../../styledComponent/Image";

import styled from "styled-components";

const hangeul = "https://d2lx5o5tt1uoj2.cloudfront.net/assets/event/step1.png";
const smile = "https://d2lx5o5tt1uoj2.cloudfront.net/assets/event/step2.png";
const share = "https://d2lx5o5tt1uoj2.cloudfront.net/assets/event/step3.png";
const hand = "https://drj0cvukrat6h.cloudfront.net/assets/event/hand-2.jpg";
const bottomImg = "https://drj0cvukrat6h.cloudfront.net/assets/event/bottom-img.png";

const Second = styled.div`
  margin-bottom: 35px;
  align-items: center;

  p {
    display: inline;
  }
`;

const ReadyPage = (props) => {
  return (
    <Grid
      style={{ background: "#fff" }}
      height="1170px"
      m="0 0 70px 0"
      width="100%"
      direction="column"
      alignItems="center"
      container
      className="event-title"
    >
      <Text
        style={{ fontFamily: `'Noto Sans KR', sans-serif`, fontWeight: `500` }}
        cr="#172c5e"
        textalign="center"
        m="10px 0 10px 0"
        sz="58.5px"
      >
        Create your
      </Text>
      <Second mb="35px">
        <Text
          style={{
            fontFamily: `'Noto Sans KR', sans-serif`,
            fontWeight: `500`,
          }}
          cr="#172c5e"
          textalign="center"
          sz="59.5px"
        >
          ‘
        </Text>
        <Text
          style={{
            fontFamily: `'Noto Sans KR', sans-serif`,
            fontWeight: `900`,
            margin: "0 10px 0 0",
          }}
          cr="#172c5e"
          textalign="center"
          sz="59.5px"
        >
          PLUS SEOUL
        </Text>
        <Text
          style={{
            fontFamily: `'Noto Sans KR', sans-serif`,
            fontWeight: `500`,
          }}
          cr="#172c5e"
          textalign="center"
          sz="59.5px"
        >
          Membership’
        </Text>
      </Second>
      <Grid container justify="flex-end">
        <BgImg
          width="749px"
          height="539px"
          m="0 0 37px 0"
          imgUrl={hand}
          className="event-img"
        />
      </Grid>
      <Grid container justify="center" className="box-th">
        <BgImg width="258px" height="247px" imgUrl={hangeul} />
        <BgImg width="258px" height="247px" m="0 20px" imgUrl={smile} />
        <BgImg width="258px" height="247px" imgUrl={share} />
      </Grid>
      <BgImg
        width="100%"
        height="136px"
        imgUrl={bottomImg}
        style={{ margin: "0 0 85px 0" }}
        className="event-ft-img"
      />
    </Grid>
  );
};

ReadyPage.propTypes = {};

export default ReadyPage;
