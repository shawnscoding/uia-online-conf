import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { loadingbarZIndex } from "../../styledComponent/Variables";
import RESOURCE from "./../../utils/imgs-1010/imgs";
// " sto-1st.s3.ap-northeast-2.amazonaws.com/assets/bg_loading.png"




const Header = styled.h1`
  
`

const LogoLeft = styled.h1`
   background: url(https://sto-1st.s3.ap-northeast-2.amazonaws.com/updated-1010/PLUS_SEOUL_Logo.png) no-repeat center center !important;
   width: 351px !important;
  height: 117px !important;


  @media only screen and (max-width: 500px) {
    background-image: url(https://sto-1st.s3.ap-northeast-2.amazonaws.com/updated-1010/PLUS_SEOUL_Logo.png) !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    width: 156px !important;
    height: 43px !important;
  }
`

const LogoRight = styled.span`
  background: url(${RESOURCE.STO_Logo}) no-repeat center center !important;
  width: 351px !important;
  height: 113px !important;
  top: 2.6rem !important;

  @media only screen and (max-width: 500px) {
    background: url(${RESOURCE.STO_Logo}) !important;

    background-repeat: no-repeat !important;
    background-size: contain !important;
    width: 148px !important;
    height: 37px !important;
  }

  
`

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const animation = (props) =>
  css`
    ${pulse} 2s alternate;
  `;

const InnerBox = styled.div`
  @keyframes fadout {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 0.5;
    }
    60% {
      opacity: 0.4;
    }
    70% {
      opacity: 0.2;
    }
    90% {
      opacity: 0.1;
    }
    100% {
      opacity: 0;
    }
  }
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: ${loadingbarZIndex};

  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${(props) => props.defaultfadeout};
`;




const Container = styled.div`
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  position: fixed;

  z-index: 1000;

  width: 100vw;
  height: 100vh;
  animation: ${(props) => (props.fadeout ? animation : "none")};
`;

const Progress = styled.span`
  width: ${(props) => props.width};
`;

const IntroMsg = styled.p`
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0) 100%
  ) !important;
  border-radius: 40px;
`;

const IntroLoader = ({ progress, setSkipClicked, setLoadingbarCount }) => {
  const [fadeout, setfadeout] = useState(null);
  const [defaultFadeout, setDefaultFadeout] = useState(null);

  useEffect(() => {
    if (progress > 99) {
      setTimeout(() => {
        setLoadingbarCount(10);
      }, 15000);
    }
  }, [progress]);

  useEffect(() => {
    if (progress > 99) {
      const timer = setTimeout(() => {
        setDefaultFadeout("3s fadeout");
      }, 13000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleSkip = () => {
    // setLoadingbarCount(10);
    if (progress < 100) return;
    setfadeout("2s fadeout 1s");
    setTimeout(() => {
      setSkipClicked(true);
    }, 1500);
  };

  return (
    <React.Fragment>
      <Container fadeout={fadeout}>
        <InnerBox
          defaultfadeout={defaultFadeout}
          className="wrapper loading-wrap"
        >
          <div className="wrapper loading-wrap">
            <audio style={{ display: "none" }} controls autoPlay>
              <source
                src="https://d2lx5o5tt1uoj2.cloudfront.net/sound/landing-airplane.mp3"
                type="audio/mpeg"
              />
            </audio>
            <header className="header">
              <LogoLeft
                className="ula-logo"
              >
                ula-logo
              </LogoLeft>
              <LogoRight
            
                className="sto-logo"
              >
                sto-logo
              </LogoRight>
            </header>
            <div className="footer">
              <div className="txt">
                <IntroMsg className="scroll">
                  <span style={{ textAlign: "center" }}>
                    This is Captain Seoul speaking. We’re now landing on Virtual
                    Seoul where you can join various events.​
                    <br />
                    Please enjoy your time at Virtual Seoul!
                  </span>
                </IntroMsg>
              </div>
              <div className="loading">
                <p className="loading-bar">
                  <Progress width={`${progress}% !important`}></Progress>
                </p>

                <p className="loading-nb" style={{ display: "none" }}>
                  <span className="progress"></span>
                  <span className="overlay">{progress}%</span>
                </p>
                <p className="loading-enter">
                  <button
                    style={progress > 99 ? null : { opacity: 0 }}
                    onClick={handleSkip}
                    className="btn-enter"
                  >
                    ARRIVE
                  </button>
                </p>
              </div>
            </div>
          </div>
          {/* <iframe
            style={{ display: "none" }}
            src="https://d2lx5o5tt1uoj2.cloudfront.net/sound/landing-airplane.mp3"
            allow="autoplay; fullscreen"
          />

          <Grid justify="space-between" container p="3.7rem 10rem 0 8rem">
            <Img src={UiaLogo} width="280px" height="249px" />
            <Box mt={1.9}>
              <Img src={StoLogo} width="193px" height="210px" />
            </Box>
          </Grid>
          <Grid mb="10rem" container justify="center">
            <ProgressCircle
              setLoadingbarCount={setLoadingbarCount}
              setfadeout={setfadeout}
              setSkipClicked={setSkipClicked}
              progress={progress}
            />
          </Grid>
          <ButtonContainer>
            <TextBox>
              <Text style={{ fontSize: "3rem" }}>
                This is Captain Seoul speaking. We’re now landing on virtual
                Seoul where you can join UIA Round Table Asia-Pacific 2020.
                Please enjoy your time at virtual Seoul!
              </Text>
            </TextBox>
          </ButtonContainer> */}
        </InnerBox>
      </Container>
    </React.Fragment>
  );
};

IntroLoader.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default IntroLoader;
