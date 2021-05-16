import React from "react";
import RESOURCE from "./../../utils/imgs-1010/imgs";

const LecturerModal = ({ openLecturerModal, setOpenLecturerModal }) => {
  console.log("openLecturerModal :: ", openLecturerModal);
  if (openLecturerModal !== true) return null;

  return (
    <div className="popup modal">
      <div className="pop-tb">
        <div className="pop-cell zoomIn">
          <div className="modal-box v-pop">
            <div className="modal-header">
              <h2>Speakers Information</h2>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setOpenLecturerModal(false);
                }}
              ></button>
            </div>
            <div className="pop-content">
              <div className="content-box">
                {/* <img
                  src="https://d2lx5o5tt1uoj2.cloudfront.net/conference/cover/UIA_Speakers.png"
                  style={{ width: "100%" }}
                /> */}
                <img src={RESOURCE.Popup_Speakers} style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerModal;
