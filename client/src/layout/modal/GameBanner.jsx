import React from "react";
import { CDN_HOST } from "../../config/define";
import { handleDownloadGame } from "../../utils/helper";

const GameBanner = React.memo(({ open, onClose }) => {
  if (!open) return <></>;
  return (
    // <div className={`banner-game2 ${open ? "on" : ""}`}>
    //   <img
    //     src={`${CDN_HOST}/assets/banner_playground2.png`}
    //     alt="Download Virtual Seoul Playground"
    //   />
    //   <button onClick={handleDownloadGame} className="btn-gameDownload">
    //     DOWNLOAD
    //   </button>
    //   <button onClick={() => setOpen(!open)} className="btn-banner on">
    //     banner on/off button
    //   </button>
    // </div>

    // <div className="map360"><button>map360</button></div>
    <div className="banner-game2">
      <p className="banner-txt1">-Seoul Convention Bureau News-</p>
      <p className="banner-txt2">
        <span className="banner-txt2-1">UPLIFT the</span>&nbsp;&nbsp;
        <span className="banner-txt2-2">TEAM SPIRIT</span>
        <br />
        <span className="banner-txt2-3">while having</span>&nbsp;&nbsp;
        <span className="banner-txt2-4">fun with teammates</span>
      </p>
      <p className="banner-txt3">
        Boost your online events
        <br />
        with higher audience engagement!
      </p>
      <img
        src={`${CDN_HOST}/assets/banner_playground2.png`}
        alt="Virtual Seoul Playground"
      />
      <button onClick={handleDownloadGame} className="btn-gameDownload">
        Download
      </button>
      <button onClick={onClose} type="button" className="btn-banner"></button>
    </div>
  );
});

export default GameBanner;
