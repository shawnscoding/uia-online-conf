import React from "react";
import PropTypes from "prop-types";

import { BgImg } from "../../styledComponent/Image";
import styled from "styled-components";
import { Text } from "./../../styledComponent/Text";
import moment from "moment";
import { apiClient } from "./../../utils/data/api";

import { downloadURI } from "./../../utils/helper";

const firstPageCard =
  "https://drj0cvukrat6h.cloudfront.net/assets/event/MembershipCardFinal.png";

const MembershipCard_Back =
  "https://drj0cvukrat6h.cloudfront.net/assets/event/MembershipCard_Back-4.png";

const JoinBtn = styled.button`
  :hover {
    outline: none;
  }
  :focus {
    outline: unset;
  }
`;

const Container = styled.div`
  height: 100%;
  margin-bottom: 300px;

  @media only screen and (max-width: 830px) {
    margin-bottom: 0;
  }

  .flex-center {
    justify-content: center;
    display: flex;
  }

  #photoIdPreview {
    width: 682px;
    height: 438px;
    /* background-color : #fff; */
    @media only screen and (max-width: 830px) {
      height: 200px;
      width: 307px;
    }
  }

  #preview-photo {
    position: absolute;
    top: 119px;
    left: 35px;
    border-radius: 11px;
    width: 162px;
    height: 184px;

    @media only screen and (max-width: 830px) {
      top: 53px;
      left: 12px;
      width: 78px;
      height: 86px;
    }
  }

  #nameContainer {
    top: 150px;
    position: absolute;
    left: 284px;
    width: 375px;
    max-width: 375px;

    @media only screen and (max-width: 830px) {
      top: ${(props) => props.box};
      position: absolute;
      left: 127px;
      width: 170px;
      max-width: 170px;
    }
  }

  #korean {
    font-family: "Noto Sans KR", sans-serif;

    @media only screen and (max-width: 830px) {
      font-size: ${(props) => props.mobile};
    }
  }

  #english {
    @media only screen and (max-width: 830px) {
      font-size: 11px;
    }
  }

  #cardBack {
    width: 682px;
    height: 438px;

    @media only screen and (max-width: 830px) {
      height: 200px;
      width: 307px;
    }
  }

  #Date {
    position: absolute;
    font-size: 17px;
    top: 28rem;
    left: 24rem;

    letter-spacing: -1px;

    @media only screen and (max-width: 830px) {
      letter-spacing: -0.5px;
      top: 12.5rem;
      left: 10.5rem;
      font-size: 10px;
    }
  }
`;

const downloadForMobileChrome = (fileName, dataUri) => {
  let w = window.open("");

  if (w === null || w === undefined) {
    window.alert("Please enable the popup window.");
    return;
  }

  let image = new Image();

  image.src = dataUri;
  image.style.width = "100%";

  let div = w.document.createElement("div");
  div.style.width = "100%";
  div.innerHTML = image.outerHTML;

  w.document.write(div.outerHTML);

  let div2 = w.document.createElement("div");
  div2.style.cssText = "font-size: 45px; text-align: center; margin: 50px;";
  div2.innerHTML = "Keep hold the image to save.";

  w.document.write(div2.outerHTML);

  w.document.close();
};

const isMobileChrome = () => {
  // return true;
  const ua = navigator.userAgent;
  return /CriOS/i.test(ua);
};

const DownloadPage = ({
  photoPreview,
  savedPhotos,
  koreanName,
  englishName,
}) => {
  const { front, back } = savedPhotos;
  const date = moment.utc().format();

  const local = moment.utc(date).local().format("YYYY-MM-DD");

  const downloadFront = () => {
    if (!front) {
      alert("Try again...");
    }

    if (isMobileChrome()) {
      downloadForMobileChrome("card-front.png", front);
    } else {
      downloadURI(front, "card-front.png");
    }
    apiClient.post("/log/event", { eventId: 1, eventOption: "front" });
  };

  const downloadBack = () => {
    if (!back) {
      alert("Try again...");
    }

    if (isMobileChrome()) {
      downloadForMobileChrome("card-back.png", back);
    } else {
      downloadURI(back, "card-back.png");
    }
    apiClient.post("/log/event", { eventId: 1, eventOption: "back" });
  };

  return (
    <Container
      mobile={
        koreanName.legnth < 7
          ? "23px"
          : koreanName.length < 13
          ? "17px"
          : "15px"
      }
      box={koreanName.length < 13 ? "68px" : "70px"}
      bg="#fff"
    >
      <div className="flex-center">
        <BgImg
          imgUrl={firstPageCard}
          style={{ position: "relative", margin: "30px 0" }}
          id="photoIdPreview"
        >
          {/* <BgImg
          id="preview-photo"
          imgUrl={photoPreview}
          style={{
            border: "2px solid #33468b",
          }}
        /> */}
          <img
            src={photoPreview}
            id="preview-photo"
            style={{
              border: "2px solid #33468b",
            }}
          />
          <div id="nameContainer">
            <Text
              id="korean"
              textalign="center"
              m={koreanName.length > 8 ? 0 : 0}
              cr="rgb(0, 83, 145)"
              sz={koreanName.length > 8 ? "34px" : "44px"}
              style={{ color: "#005391", fontWeight: "700" }}
            >
              {koreanName}
            </Text>
            <Text
              textalign="center"
              id="english"
              m="0 0 0 2px"
              cr="rgba(0, 0, 0, 0.8)"
              sz="26px"
            >
              {englishName}
            </Text>
          </div>

          <Text m="0" cr="rgba(0, 0, 0, 0.8)" sz="18px" id="Date">
            Date of issue: {local}
          </Text>
        </BgImg>
      </div>

      <div className="flex-center">
        <JoinBtn
          disabled={front ? false : true}
          className="btn-join"
          onClick={downloadFront}
          id="btnDownloadFront"
        >
          Download
        </JoinBtn>
      </div>
      <div className="flex-center">
        <BgImg
          id="cardBack"
          mb="130px"
          imgUrl={MembershipCard_Back}
          style={{ position: "relative" }}
        ></BgImg>
      </div>
      <div className="flex-center">
        <JoinBtn
          disabled={back ? false : true}
          className="btn-join"
          onClick={downloadBack}
          id="btnDownloadBack"
        >
          Download
        </JoinBtn>
      </div>
    </Container>
  );
};

DownloadPage.propTypes = {};

export default DownloadPage;
