import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Img } from "./../../styledComponent/Image";
// import Logo from "./../../assets/logo/Logo.svg";
// import { CusGrid } from "../../styledComponent/Layouts";
// import { Button } from "@material-ui/core";
// import { Form } from "./../../styledComponent/Layouts";
import { authPaths, apiClient } from "./../../utils/data/api";
// import { HeadTwo, Text } from "./../../styledComponent/Text";
// import { secondary } from "./../../styledComponent/Variables";
// import { Redirect } from "react-router-dom";

const ResetPassword = ({ setFindPWFormOpen }) => {
  const [errMsg, setErrMsg] = useState(null);

  const [email, setEmail] = useState("");
  const [openProfile, setOpenProfile] = useState(""); // boolean 아님.

  const handleResetPassword = async () => {
    if (openProfile === "") {
      setErrMsg("please check agree or disagree");
      return;
    } else {
      setErrMsg(null);
    }
    try {
      const res = await apiClient.post(authPaths["resetPassword"].post, {
        email,
        isOpen: openProfile,
      });
      // console.log("status");
      // console.log(res.status);
      console.log("res ::", res);
      if (res && res.data && res.data.message) {
        window.alert(res.data.message);
        // window.location.href = "/"; // !! react redirect call.
        setFindPWFormOpen(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrMsg(err.response.data.error);
      }
    }
  };
  // const [staySignIn, setStaySignedIn] = useState(false);
  // const onStaySignin = () => {
  //   setStaySignedIn(!staySignIn);
  // };

  return (
    <div className="popup">
      <div className="pop-tb pw-reset">
        {/* <!-- zoomIn은 팝업 띄우는 애니메이션 --> */}
        <div className="pop-cell zoomIn">
          <div className="login-box">
            <div className="pw-header line2">
              <button
                type="button"
                className="prev"
                onClick={() => {
                  setFindPWFormOpen(false);
                }}
              >
                prev
              </button>
              <h2 style={{ textTransform: "lowercase" }}>
                Is it your first time login
                <br />
                in Virtual Seoul?
              </h2>
            </div>
            <div className="pop-content">
              <div className="form-inbox">
                <ul>
                  <li className="reset-pw">
                    <p className="txt2">
                      Please enter the email when you registered
                      <br />
                      online in UIA website.​ We will issue a temporary
                      <br />
                      password to your email address.​
                    </p>
                  </li>
                  <li>
                    <label>
                      <span>mail</span>
                      <input
                        type="email"
                        title="mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </li>
                  <li className="policy-txt">
                    <h4>
                      <p>
                        Business Card Sharing Policy <span>(Required)</span>
                      </p>
                    </h4>
                    <div className="messge-box">
                      <p style={{ fontWeight: 600 }}>
                        [Personal Information Protection Law]
                      </p>
                      <br />
                      Under Article 15 para 1 of the Personal Information
                      Protection Act, Article 17 para 1 and Article 24 para 1 of
                      the National Security Law, Seoul Tourism Organization
                      seeks to obtain your consent regarding the collection, use
                      and provision of personal information as follows. Seoul
                      Tourism Organization will only use the information under
                      the participant’s agreement. If you do not agree on this
                      agreement, the service will be limited to provide.
                      <br /> <br />
                      <p style={{ fontWeight: 600 }}>
                        [Personal Information Category]
                      </p>
                      <br />
                      Name, Organization, Affiliation, Email, etc <br /> <br />
                      <p style={{ fontWeight: 600 }}>[Retention Period]</p>
                      <br />
                      In order to provide proper service for 'UIA Associations
                      ROUND TABLE Asia-Pacific 2020' participants and exchange
                      your information with other participants, we retain the
                      personal information for one year and destroy it. Consent
                      & Rights of the Visitor Pursuant to the Act on the
                      Protection of Personal Information, you may reject the
                      agreement for providing personal information, in which
                      case you will not be able to exchange your information
                      with other participatns. If you want to revise, please
                      visit 'My Page' and revise your agreement status.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="ipt-wrap reset">
                {/* <p className="check">
                  <label className="checks">
                    <input type="checkbox" />
                    <span onClick={onStaySignin} className="checkbox-txt">
                      I agree to collect and use personal information.{" "}
                    </span>
                  </label>
                </p> */}

                <p className="radios2">
                  <label className="radios2">
                    <input
                      onClick={() => {
                        setOpenProfile("1");
                      }}
                      type="radio"
                      name="login-agree"
                      // onChange={(e)=>{
                      //   // if (e.target.checked) setOpenProfile("1");
                      // }}
                      defaultChecked={openProfile == "1" ? "checked" : ""}
                      // checked={openProfile == "1" ? "checked" : ""}
                    />
                    <span className="radio-txt">
                      I agree to collect and use personal information.
                    </span>
                  </label>
                </p>
                <p className="radios2">
                  <label className="radios2">
                    <input
                      onClick={() => {
                        setOpenProfile("0");
                      }}
                      type="radio"
                      name="login-agree"
                      // onChange={(e)=>{
                      //   // if (e.target.checked) setOpenProfile("0");
                      // }}
                      defaultChecked={openProfile == "0" ? "checked" : ""}
                      // checked={openProfile == "0" ? "checked" : ""}
                    />
                    <span className="radio-txt">
                      I disagree to collect and use personal information. <br />
                      If you disagree, you cannot exchange your information with
                      other attendees.
                    </span>
                  </label>
                </p>
              </div>
              <div className="policy-box" style={{ color: "#006ab2" }}>
                * If you want to share your business card with the other party
                in the lounge, you must agree to the terms and conditions.
              </div>

              <div className="btn-login">
                {errMsg && <div className="error">{errMsg}</div>}
                <button type="button" onClick={handleResetPassword}>
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
