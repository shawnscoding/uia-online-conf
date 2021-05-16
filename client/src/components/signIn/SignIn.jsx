import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Form, CusGrid } from "../../styledComponent/Layouts";
import { userLoginStart } from "./../../redux/auth/actions";
import { connect } from "react-redux";

const SignIn = ({
  userLoginStart,
  form,
  setForm,
  staySignIn,
  setStaySignedIn,
  setFindPWFormOpen,
  error,
}) => {
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(form);
    userLoginStart({ form, staySignIn });
  };

  // useEffect(() => {
  //   if (form.password.length === 4) {
  //     userLoginStart({ form, staySignIn });
  //   }
  // }, [form]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onStaySignin = () => {
    setStaySignedIn(!staySignIn);
  };

  return (
    <>
      <Form
        width="100%"
        onSubmit={() => {
          return false;
        }}
      >
        <div className="popup">
          <div className="pop-tb">
            {/* <!-- zoomIn은 팝업 띄우는 애니메이션 --> */}
            <div className="pop-cell zoomIn">
              <div className="login-box">
                <div className="pop-header">
                  UIA Associations Round TABLE Asia-Pacific 2020
                </div>
                <div className="pop-content">
                  <div className="form-inbox">
                    <ul>
                      <li>
                        <label>
                          <span>mail</span>
                          <input
                            onChange={handleChange}
                            type="email"
                            title="mail"
                            name="email"
                            value={form.email}
                          />
                        </label>
                      </li>
                      <li>
                        <label>
                          <span>pw</span>
                          <input
                            onChange={handleChange}
                            name="password"
                            value={form.password}
                            type="password"
                            title="password"
                          />
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="ipt-wrap">
                    <p className="check">
                      <label className="checks">
                        <input type="checkbox" />
                        <span className="checkbox-txt" onClick={onStaySignin}>
                          Stay sign in
                        </span>
                      </label>
                    </p>
                    <p className="reset">
                      <button
                        type="button"
                        className="reset-pw"
                        onClick={() => setFindPWFormOpen(true)}
                      >
                        Forgot your password?
                      </button>
                    </p>
                  </div>
                  <div
                    className="btn-login"
                    style={{ padding: "2rem 8rem 0rem" }}
                  >
                    <button
                      type="button"
                      className="login-time"
                      onClick={() => setFindPWFormOpen(true)}
                    >
                      <span>Login for the First Time?</span>
                    </button>
                  </div>

                  <div className="btn-login">
                    {error && <div className="error">{error}</div>}
                    <button type="button" onClick={handleSumbit}>
                      LOGIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

SignIn.propTypes = {
  userLoginStart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginStart: (payload) => dispatch(userLoginStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
