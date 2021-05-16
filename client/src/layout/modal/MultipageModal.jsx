import React from "react";
import PropTypes from "prop-types";

const MultipageModal = ({
  header,
  handleClickClose,
  component: Component,
  controller,
  setController,
  ...rest
}) => {
  const { open, page } = controller;
  if (open !== true) return null;

  const setClose = () => {
    setController({
      ...controller,
      open: false,
    });
  };

  const setPrev = () => {
    setController({
      ...controller,
      page: 0,
    });
  };

  return (
    <div className={"popup modal " + (open ? "on" : "off")}>
      <div className="pop-tb">
        {/* <!-- zoomIn은 팝업 띄우는 애니메이션 --> */}
        <div className="pop-cell zoomIn">
          <div className="modal-box">
            <div className="modal-header">
              <button className="prev" onClick={setPrev}>
                prev
              </button>
              <h2>{header}</h2>
              <button className="close" onClick={setClose}>
                close
              </button>
            </div>
            <div className="pop-content data-table">
              <div className="content-box">
                <Component
                  setController={setController}
                  controller={controller}
                  {...rest}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MultipageModal.propTypes = {
  controller: PropTypes.object.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  setController: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default MultipageModal;
