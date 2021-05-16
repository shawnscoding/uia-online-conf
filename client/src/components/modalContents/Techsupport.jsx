import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { apiClient } from "./../../utils/data/api";
import Nationality from "./../input/Nationality";
import { CusGrid as Grid } from "./../../styledComponent/Layouts";
import styled from "styled-components";
import { Text, SmallText } from "./../../styledComponent/Text";
import { lightGrey, error } from "../../styledComponent/Variables";
import { Img } from "../../styledComponent/Image";
import {  useDispatch } from "react-redux";
import {  OPEN_RESPONSE_ALERT, TOGGLE_TECH_SUPPORT } from "./../../redux/types";

const lang = {
  title: "QA",
  firstname: "First Name *",
  lastname: "Last Name *",
  company: "Company/Organization *",
  country: "Continent/ Nationality *",
  position: "Position",
  Email: "Email *",
  Tel: "Tel",
  info: "Other information / special request",
  policy: "Privacy Policy(Required)",
  agreeClause:
    "Seoul Convention Bureau does not sell the information of trial user, subscriber,",

  agreeClause_2: "and prospective customer to third-party marketing companies.",
  agreeClause_3: "Please refer to our Privacy Policy for more information.",

  agree: `I agree to collect and use personal information.`,
  Send: "Send",
  successMsg: "Successfully saved",
  confirm: "Confirm",
  checkboxErr: "Please agree to the 'Privacy Policy'",
};

const StoLogo =
  "https://drj0cvukrat6h.cloudfront.net/assets/loadingbar/sto-logo.png";

const TextFieldWidth = "316px";

const grey = "#53585a";
const blue = "#216096";


const TextArea = styled.textarea`
  color: ${blue};
  font-size: 16px;
  resize: none;

  outline: unset;
  border-top: 1px solid ${blue};
  border-bottom: 1px solid ${blue};
  border-left: none;
  border-right: none;

  :focus {
    outline: unset;
  }
`;

const TxField = styled(TextField)`
  width: 100%;
  
  label {
    font-size: 14px !important;
  }

  /* .MuiFormLabel-root.Mui-focused {
    color: ${grey};
  } */

  .MuiFormLabel-root {
  }

  .MuiInputBase-input {
    font-size: 1.6rem;
    color: ${blue};
  }

  .MuiInputLabel-shrink {
    font-size: 12px;
    transform: translate(0, 7px) scale(1);
  }

  /* 
  .MuiInput-underlign:after {
    border-bottom: 2px solid ${grey};
  } */
`;

export const ImgBox = styled.div`
  width: 367px;
  height: 708px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  image {
    width: 260px;
    height: 284px;
  }
`;

export const StyledCheckbox = styled(FormControlLabel)`
  .MuiCheckbox-root {
    padding: unset !important;
  }



  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
  }
`;

export const CheckboxContainer = styled(Grid)`
  label {
    margin-left: 0px !important;
  } 

  padding: 0 1.2rem 2rem !important;
`

export const Clause = styled.div`
position: absolute;
bottom: -9.2rem !important;
    left: 300px !important;
    right: 0 !important;
    background: rgb(150, 164, 213) !important;
    padding: 2.4rem !important;
    color: #fff !important;
    `

const Techsupport = ({  }) => {
  // const { handleSubmit, register, errors } = useForm();

  // const [qaType, setQaType] = useState("tech"); // tech or qa
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [nationality, setNationality] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [otherInformation, setOtherInformation] = useState("");
  const [checked, setChecked] = useState(false);

  const [err, setErr] = useState({ msg: null, field: null });
  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault(); // prevent submit

    let param = {
      qaType: "Tech Support",
      firstName,
      lastName,
      company,
      nationality,
      position,
      email,
      tel,
      otherInformation,
      checked,
    };
    console.log("param ::", param);
  
    apiClient
      .post("/sendEmail", param)
      .then((response) => {
        console.log("response :: ", response);
        console.log("response.data :: ", response.data);
        dispatch({
          type: OPEN_RESPONSE_ALERT,
          payload: { msg: "Your inquiry has been received." },
        });
        dispatch({
          type: TOGGLE_TECH_SUPPORT
        });
      })
      .catch((err) => {
        console.log("err ::", err.response);
        if (err.response) {
          const { error, field } = err.response.data;
          setErr({
            msg: error,
            field,
          });
        }
      });
  };

  const onChangeFirstName = (e) => {
    if (e.target.value.length > 255) return;
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    if (e.target.value.length > 255) return;
    setLastName(e.target.value);
  };
  const onChangeCompany = (e) => {
    if (e.target.value.length > 255) return;
    setCompany(e.target.value);
  };
  const onChangePosition = (e) => {
    if (e.target.value.length > 255) return;
    setPosition(e.target.value);
  };
  const onChangeEmail = (e) => {
    if (e.target.value.length > 255) return;
    setEmail(e.target.value);
  };
  const onChangeTel = (e) => {
    if (e.target.value.length > 255) return;
    setTel(e.target.value);
  };
  const onChangeOtherInformation = (e) => {
    setOtherInformation(e.target.value);
  };

  const onChangeNationality = (e) => {
    console.log("onChangeNationality e.target.value ::", e.target.value);
    setNationality(e.target.value);
  };

  const onChangeAgreeTo = (e) => {
    let checked = e.target.checked;
    console.log("onChangeAgreeTo checked :: ", checked);
    setChecked(checked);
  };
  const { field, msg } = err;

  return (
    <React.Fragment>
      <Grid position="relative" container className="Grid-qa">
        <ImgBox className="qa-img" style={{ width: "300px" }}>
          <Img src={StoLogo} />
        </ImgBox>

        <Grid
          bg="#e6e6e6"
          p="0 40px"
          width="800px"
          className="Grid-gmmWQv"
          height="708px"
          item
        >
          <Grid m="20px 0" container>
            <Grid width={TextFieldWidth} m="0 3rem 0 0" item>
              <TxField
                autoFocus
                valuautofocuse={firstName}
                type="text"
                color="secondary"
                label={lang.firstname}
                onChange={onChangeFirstName}
                helperText={field === "firstName" && msg}
                error={field === "firstName"}
              />
            </Grid>
            <Grid p="0 1rem" width={TextFieldWidth} item>
              <TxField
                value={lastName}
                type="text"
                label={lang.lastname}
                color="secondary"
                onChange={onChangeLastName}
                helperText={field === "lastName" && msg}
                error={field === "lastName"}
              />
            </Grid>
          </Grid>
          <Grid mb="20px" container>
            <Grid width={TextFieldWidth} m="0 3rem 0 0" item>
              <TxField
                value={company}
                type="text"
                color="secondary"
                label={lang.company}
                onChange={onChangeCompany}
                helperText={field === "company" && msg}
                error={field === "company"}
              />
            </Grid>
            <Grid p="0 1rem" item width={TextFieldWidth}>
              <TxField
                value={position}
                type="text"
                color="secondary"
                label={lang.position}
                onChange={onChangePosition}
                helperText={field === "position" && msg}
                error={field === "position"}
              />
            </Grid>
          </Grid>

          <Grid mb="20px" container>
            <Grid width={TextFieldWidth} m="0 3rem 0 0" item>
              <TxField
                value={email}
                type="email"
                color="secondary"
                label={lang.Email}
                onChange={onChangeEmail}
                helperText={field === "email" && msg}
                error={field === "email"}
              />
            </Grid>
            <Grid p="0 1rem" item width={TextFieldWidth}>
              <TxField
                value={tel}
                type="text"
                color="secondary"
                label={lang.Tel}
                onChange={onChangeTel}
              />
            </Grid>
          </Grid>
          <Grid container className="Grid-title">
            <Grid item>
              <Text cr={grey} m="23px 10rem 0 0">
                {lang.info}
              </Text>
            </Grid>
            <Grid width={TextFieldWidth} item className="Grid-select">
              <Nationality
                msg={msg}
                lang={lang}
                field={field}
                onChangeNationality={onChangeNationality}
              />
            </Grid>
          </Grid>
          <TextArea
            value={otherInformation}
            style={{ width: "100%", height: "280px" }}
            rows="10"
            onChange={onChangeOtherInformation}
          />
          <CheckboxContainer mb="5px" container className="Grid-MuiButtonBase">
            <StyledCheckbox
              control={
                <Checkbox
                  style={{
                    color: blue,
                  }}
                  onChange={onChangeAgreeTo}
                  checked={checked}
                  value="agree"
                />
              }
            />

            <Text sz="17px" m="0 0 0 5px" className="txt-box" cr={blue}>
              {lang.agree}
            </Text>
            {field === "checked" && (
              <SmallText cr={error}>{lang.checkboxErr}</SmallText>
            )}
          </CheckboxContainer>

          <Grid justify="center" item container>
            <Box width="130px" height="49px">
              {(props) => (
                <Button
                  {...props}
                  onClick={handleSumbit}
                  variant="contained"
                  type="submit"
                  style={{
                    borderRadius: "13px",
                    fontSize: "1.7rem",
                    background: blue,
                    color: "#fff",
                  }}
                >
                  {lang.Send}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Clause
          className="pop-copy"
          height="55px"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "#96a4d5",
          }}
          p="0 63px"
          container="true"
          bg={lightGrey}
        >
          <Text sz="15px" cr="#fff">
            {lang.agreeClause}
          </Text>
          <Text sz="15px" cr="#fff">
            {lang.agreeClause_2}
          </Text>
          <Text sz="15px" cr="#fff">
            {lang.agreeClause_3}
          </Text>
        </Clause>
      </Grid>
    </React.Fragment>
  );
};

Techsupport.propTypes = {};

export default Techsupport;
