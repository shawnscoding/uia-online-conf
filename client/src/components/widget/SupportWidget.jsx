// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import SignIn from "../signIn/SignIn";

import React, { useEffect, useState } from "react";
import Zendesk from "react-zendesk";
import { ZendeskAPI } from "react-zendesk";
import styled from "styled-components";
// const ZENDESK_KEY = "e8e49439-2be4-4237-9b61-bae61ab1d059"; // salin account
// const ZENDESK_KEY = "e8e49439-2be4-4237-9b61-bae61ab1d059";// si.kim person account
const ZENDESK_KEY = "67a9e3d9-db21-434d-ba32-18b0dc02fbfe"; // uia support

const Box = styled.div`
  display: none;
`;

const SupportPage = ({ widget, authenticated }) => {
  const setting = {
    color: {
      theme: "#ec5f58",
      launcher : "#ec5f58",
      launcherText : "#ffffff"
    },
    launcher: {
      chatLabel: {
        "en-US": "Tech Support Click Here !!",
        "ko-KR": "한국관광재단 기술지원",
      },
    },
    contactForm: {
      title: {
        "*": "Contact us",
      },
      fields: [
        { id: "description", prefill: { "*": "" } }, //설명란 기본값 셋팅
      ],
    },
  };

  const handleLoaded = () => {
    ZendeskAPI("webWidget", "setLocale", "en"); // 영문 초기화.

    if (widget === 0) {
      ZendeskAPI("webWidget", "hide");
    }

    ZendeskAPI("webWidget:on", "close", () => {
      ZendeskAPI("webWidget", "hide");
    });
  };

  useEffect(() => {
    // if (widget === 0) { // 최초 실행.
    //   // ZendeskAPI("webWidget", "hide");
    //   return;
    // }
    if (widget > 0) {
      ZendeskAPI("webWidget", "show"); // 이거 하면 보임.
    }
    return () => {};
  });
  // window.zE
  // if (widget === 0) return <div></div>;
  return (
    <Zendesk zendeskKey={ZENDESK_KEY} {...setting} onLoaded={handleLoaded} />
  );
};

SupportPage.propTypes = {};

export default SupportPage;
