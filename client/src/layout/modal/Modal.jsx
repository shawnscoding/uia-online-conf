import React from "react";
// import Dialog from "@material-ui/core/Dialog";
// import styled from "styled-components";
// import { IconButton } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";
// import {
//   modalHeaderHeight,
//   secondary,
//   modalWidth,
//   primary,
//   white,
//   modalHeight,
// } from "../../styledComponent/Variables";
import PropTypes from "prop-types";
// import { Text } from "./../../styledComponent/Text";

// const StdDialog = styled(Dialog)`
//   .MuiDialog-paperWidthSm {
//     max-width: unset;
//     width: ${modalWidth};
//     height: ${modalHeight};
//   }
//   .MuiBackdrop-root {
//     background-color: rgba(0, 0, 0, 0.8);
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   height: ${modalHeaderHeight};
//   align-items: center;
//   background-color: ${primary};
//   div {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   button {
//     width: 50px;
//     height: 50px;
//       height: 35px;
//       color: #eeeeee;
//       :hover {
//     svg {
//         color: ${secondary};
//       width: 35px;
//       }
//     }
//   }
// `;

// const Box = styled.div`
//   overflow-y: ${(props) => props.overflowy};
//   overflow-x: ${(props) => props.overflowx};
// `;

const Modal = ({
  header,
  component: Component,
  open,
  setOpen,
  setPrev,

  ...rest
}) => {
  if (open !== true) return <></>;

  let className = "";
  if (
    header === "1:1 Meetings with Delegates" ||
    header === "VIRTUAL STAMP TOUR" ||
    header === "Brochures"
  ) {
    if (header === "VIRTUAL STAMP TOUR") {
      className = "pt70";
    } else {
      className = "data-table";
    }
  } else if (header === "Event") {
    className = "e-list";
  } else {
    if (header === "PROFILE") {
      className = "profile-info";
    } else {
      if (header === "Notice") {
        className = "data-table h100";
      } else {
        className = "data-table over-hidden h100 pd0";
      }
    }
  }

  return (
    // <div>
    //   <StdDialog open={open}>
    //     <Header>
    //       <div></div>
    //       <Text cr={white} weight="800" sz="2.8rem">
    //         {header}
    //       </Text>
    //       <IconButton onClick={() => setOpen(false)}>
    //         <CloseIcon />
    //       </IconButton>
    //     </Header>
    //     <Box overflowx={overflowx} overflowy={overflowy}>
    //       <Component {...rest} />
    //     </Box>
    //   </StdDialog>
    // </div>
    <div
      className={`popup modal ${open ? "on" : "off"} ${
        header === "VIRTUAL STAMP TOUR" ? "stamp" : null
      }`}
    >
      <div className="pop-tb">
        {/* <!-- zoomIn은 팝업 띄우는 애니메이션 --> */}
        <div className="pop-cell zoomIn">
          <div className="modal-box">
            <div className="modal-header">
              {setPrev && (
                <button className="prev" onClick={setPrev}>
                  prev
                </button>
              )}
              <h2
                style={{
                  textTransform: "none",
                }}
              >
                {header}
              </h2>
              <button className="close" onClick={() => setOpen(false)}>
                close
              </button>
            </div>
            <div className={`pop-content ${className}`}>
              <div
                className={`content-box
                ${header === "VIRTUAL STAMP TOUR" ? "profile" : ""}
              `}
              >
                <Component {...rest} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default Modal;
