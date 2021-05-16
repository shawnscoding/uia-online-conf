import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import SignIn from "./../../components/signIn/SignIn";
import { connect } from "react-redux";
import styled from "styled-components";
import { loginFormBg } from "./../../styledComponent/Variables";
import FindPassword from "./../../components/findPassword/FindPassword";
import { CusGrid } from "../../styledComponent/Layouts";

export const StdDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    max-width: ${(props) => props.maxwid};
    opacity: 0.8;
    background-color: ${loginFormBg};
  }
`;

const SignInModal = () => {
  const [findPWFormOpen, setFindPWFormOpen] = React.useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [staySignIn, setStaySignedIn] = useState(false);

  if (findPWFormOpen) {
    return <FindPassword setFindPWFormOpen={setFindPWFormOpen} />;
  }

  return (
    <SignIn
      form={form}
      setForm={setForm}
      staySignIn={staySignIn}
      setStaySignedIn={setStaySignedIn}
      setFindPWFormOpen={setFindPWFormOpen}
    />
  );
};

const mapStateToProps = (state) => ({
  open: state.auth.signInModalOpen,
});

export default connect(mapStateToProps)(SignInModal);
