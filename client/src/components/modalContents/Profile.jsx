import React, { useState, useEffect } from "react";
import { detectTokenError } from "../../utils/helper";
import { authrizationFailed } from "../../redux/auth/actions";
import { useDispatch } from "react-redux";
import { authPaths, apiClient } from "../../utils/data/api";
import { OPEN_ALERT_AND_SET_ITS_CONTENT } from "../../redux/types";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";

export const Profile = ({ user }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const [openProfile, setopenProfile] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    console.log("openProfile", openProfile);
    try {
      if (localStorage.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        };
        // !!! 서버에서 api open 해야함
        // const res = await apiClient.post(
        //   authPaths["changePassword"].post,
        //   openProfile,
        //   config
        // );
        // console.log("res");
        // console.log(res);
        // if (res.data) {
        // }
        // setAlert({
        //   open: true,
        //   msg: " The change has been successfully saved",
        // });
        const messageInfo = {};

        messageInfo.popup_position = "center";
        messageInfo.header = "Alert";
        messageInfo.contents = "The change has been successfully saved";

        dispatch({
          type: OPEN_ALERT_AND_SET_ITS_CONTENT,
          payload: messageInfo,
        });
      } else {
        dispatch(authrizationFailed());
      }
    } catch (err) {
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
  const { currentPassword, newPasswordConfirm, newPassword } = form;

  const handleSubmit = async (e) => {
    try {
      if (localStorage.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        };
        const res = await apiClient.post(
          authPaths["changePassword"].post,
          form,
          config
        );
        console.log("res");
        console.log(res);
        if (res.data) {
          const messageInfo = {};

          messageInfo.popup_position = "center";
          messageInfo.header = "Alert";
          messageInfo.contents = "Your password has been successfully changed";

          dispatch({
            type: OPEN_ALERT_AND_SET_ITS_CONTENT,
            payload: messageInfo,
          });
        }
      } else {
        dispatch(authrizationFailed());
      }
    } catch (err) {
      console.log("err");
      console.log(err.response);
      if (err && err.response) {
        const code = err.response.data.code;
        const msg = err.response.data.error;
        if (detectTokenError(code)) {
          dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
          dispatch(authrizationFailed());
        }
        if (code === 2002 || code === 2003 || code === 2004) {
          const messageInfo = {};

          messageInfo.popup_position = "center";
          messageInfo.header = "Error";
          messageInfo.contents = err.response.data.error;

          dispatch({
            type: OPEN_ALERT_AND_SET_ITS_CONTENT,
            payload: messageInfo,
          });
        }
      }
    }
  };

  const { email, organization, first_name, last_name, country } = user;

  return (
    <>
      <h3>
        <span>Profile</span>
      </h3>
      <dl>
        <dt>ID (e-mail)</dt>
        <dd>​{email}</dd>
      </dl>
      <dl>
        <dt>Organization</dt>
        <dd>
          {/* {organization.slice(0, 10)}
          <br />
          {organization.slice(10)} */}
          {organization}
        </dd>
      </dl>
      <dl>
        <dt>First Name</dt>
        <dd>{first_name}​</dd>
      </dl>
      <dl>
        <dt>Last Name</dt>
        <dd>{last_name}</dd>
      </dl>
      <dl>
        <dt>Country</dt>
        <dd>{country}</dd>
      </dl>
      <h3>
        <span>Change Password</span>
      </h3>
      <dl>
        <dt>Current Password</dt>
        <dd>
          <input
            type="password"
            name="currentPassword"
            onChange={handleChange}
            className="type3 active"
            value={currentPassword}
          />
        </dd>
      </dl>
      <dl>
        <dt>New Password</dt>
        <dd>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            className="type3"
            value={newPassword}
          />
        </dd>
      </dl>
      <dl>
        <dt>
          New Password <span>(Confirm)</span>
        </dt>
        <dd>
          <input
            type="password"
            name="newPasswordConfirm"
            onChange={handleChange}
            className="type3"
            value={newPasswordConfirm}
          />
        </dd>
      </dl>
      <div className="btn-password">
        <button onClick={handleSubmit}>Change Password</button>
      </div>
      <h3>
        <span>
          Business Card Sharing Policy <em>(Required)</em>
        </span>
      </h3>
      <div className="messge-box">
        <p style={{ fontWeight: 600 }}>[Personal Information Protection Law]</p>
        <br />
        Under Article 15 para 1 of the Personal Information Protection Act,
        Article 17 para 1 and Article 24 para 1 of the National Security Law,
        Seoul Tourism Organization seeks to obtain your consent regarding the
        collection, use and provision of personal information as follows. Seoul
        Tourism Organization will only use the information under the
        participant’s agreement. If you do not agree on this agreement, the
        service will be limited to provide. <br /> <br />
        <p style={{ fontWeight: 600 }}>[Personal Information Category]</p>
        <br />
        Name, Organization, Affiliation, Email, etc <br /> <br />
        <p style={{ fontWeight: 600 }}>[Retention Period]</p>
        <br />
        In order to provide proper service for 'UIA Associations ROUND TABLE
        Asia-Pacific 2020' participants and exchange your information with other
        participants, we retain the personal information for one year and
        destroy it. Consent & Rights of the Visitor Pursuant to the Act on the
        Protection of Personal Information, you may reject the agreement for
        providing personal information, in which case you will not be able to
        exchange your information with other participatns. If you want to
        revise, please visit 'My Page' and revise your agreement status.
      </div>
      <div className="privacy">
        <p className="radios">
          <label className="radios">
            <input
              onClick={() => {
                setopenProfile(true);
              }}
              checked={openProfile}
              type="radio"
              name="login-agree"
            />
            <span className="radio-txt">
              I agree to collect and use personal information.
            </span>
          </label>
        </p>
        <p className="radios">
          <label className="radios">
            <input
              onClick={() => {
                setopenProfile(false);
              }}
              type="radio"
              checked={!openProfile}
              name="login-agree"
            />
            <span className="radio-txt">
              I disagree to collect and use personal information. <br />
              If you disagree, you cannot exchange your information with other
              attendees.
            </span>
          </label>
        </p>
      </div>
      <div className="privacy-box" style={{ color: "#006ab2" }}>
        * If you want to share your business card with the other party in the
        lounge, you must agree to the terms and conditions.
      </div>
      <div className="btn-password">
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
};
