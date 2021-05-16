import React from "react";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/data/api";
import { authrizationFailed } from "./../../redux/auth/actions";
import { useDispatch } from "react-redux";
import { storeStamp, detectTokenError } from "./../../utils/helper";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";

// const dummy = [
//   {
//     idx: 1,
//     subject: "theater C1-V1",
//     video_link:
//       "https://player.vimeo.com/video/451372027?autoplay=1&loop=1&title=0&byline=0&portrait=0",
//     video_cover_link:
//       "https://d2lx5o5tt1uoj2.cloudfront.net/theater/cover/c1-v1.jpg",
//     category_idx: 1,
//   },
//   {
//     idx: 2,
//     subject: "theater C1-V2",
//     video_link:
//       "https://player.vimeo.com/video/336812686?autoplay=1&loop=1&title=0&byline=0&portrait=0",
//     video_cover_link:
//       "https://d2lx5o5tt1uoj2.cloudfront.net/theater/cover/c1-v2.jpg",
//     category_idx: 1,
//   },
//   {
//     idx: 3,
//     subject: "theater C1-V3",
//     video_link:
//       "https://player.vimeo.com/video/443341159?autoplay=1&loop=1&quality=1080p",
//     video_cover_link:
//       "https://d2lx5o5tt1uoj2.cloudfront.net/theater/cover/c1-v3.jpg",
//     category_idx: 1,
//   },
//   {
//     idx: 4,
//     subject: "theater C1-V4",
//     video_link:
//       "https://player.vimeo.com/video/450062007?autoplay=1&loop=1&title=0&byline=0&portrait=0",
//     video_cover_link:
//       "https://d2lx5o5tt1uoj2.cloudfront.net/theater/UIA_THM_1.jpg",
//   },
// ];

const VideoCategoryModal = ({ api, setOpen, open, height, width }) => {
  const [category, setCategory] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [restVideos, setRestVideos] = useState(null);
  const [openPlayPage, setOpenPlayPage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      if (api) {
        setRestVideos(null);
        setPlayingVideo(null);
        setCategory(null);
        setOpenPlayPage(false);
        const getCategory = async () => {
          try {
            // if (localStorage.token) {
            //   const config = {
            //     headers: {
            //       Authorization: `Bearer ${localStorage.token}`,
            //     },
            //   };

            const res = await apiClient.get(api.get);
            setCategory(res.data[0]);
            // setCategory({ title: "dasasd", list: dummy });
            // } else {
            //   dispatch(authrizationFailed());
            // }
          } catch (err) {
            console.log("err");
            console.log(err);
            if (err && err.response) {
              const code = err.response.data.code;
              const msg = err.response.data.error;
              if (detectTokenError(code)) {
                dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
                // dispatch(authrizationFailed());
              }
            }
          }
        };
        getCategory();
      }
    }
  }, [open, api]);

  const handleClickCoverImg = (video) => {
    const restVdos = category.list.filter((v) => v.idx !== video.idx);

    setPlayingVideo(video);
    setRestVideos(restVdos);
    setOpenPlayPage(true);
  };
  // const { list } = category;

  const handleClickBack = () => {
    setRestVideos(null);
    setPlayingVideo(null);
    setOpenPlayPage(false);
  };

  const handleClickRestVideo = (video) => {
    const restVdos = category.list.filter((v) => v.idx !== video.idx);
    setPlayingVideo(video);

    setRestVideos(restVdos);
  };

  useEffect(() => {
    if (playingVideo) {
      // !!! 성실장님에게 변경 요청하기
      const { stamp_code } = playingVideo;
      const body = { stamp_code };
      const logUserOut = () => dispatch(authrizationFailed());
      storeStamp({ logUserOut, body });
    }
  }, [playingVideo]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return <></>;
  return (
    <React.Fragment>
      <div className="popup modal video">
        <div className="pop-tb">
          <div className="pop-cell zoomIn">
            <div className="modal-box">
              <div className="modal-header">
                {openPlayPage && (
                  <button
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "10px",
                    }}
                    onClick={handleClickBack}
                    className="prev"
                  ></button>
                )}
                <h2 style={{ textTransform: "none" }}>
                  {category && category.title}
                </h2>
                <button onClick={handleClose} className="close">
                  close
                </button>
              </div>

              {category ? (
                <>
                  {!openPlayPage ? (
                    <div className="pop-content">
                      <div className="content-box">
                        <div className="video-box">
                          <ul>
                            <li>
                              {category.list
                                .map((video) => (
                                  <div
                                    key={video.idx}
                                    onClick={() => handleClickCoverImg(video)}
                                    className="video"
                                  >
                                    <img
                                      // src="./assets/Performance-800x500.jpg"
                                      src={video.video_cover_link}
                                      alt="video cover image"
                                    />
                                    <p className="tit">{video.subject}</p>
                                  </div>
                                ))
                                .slice(0, 2)}
                            </li>
                            <li>
                              {category.list
                                .map((video) => (
                                  <div
                                    key={video.idx}
                                    onClick={() => handleClickCoverImg(video)}
                                    className="video"
                                  >
                                    <img
                                      // src="./assets/Performance-800x500.jpg"
                                      src={video.video_cover_link}
                                      alt="video cover image"
                                    />
                                    <p className="tit">{video.subject}</p>
                                  </div>
                                ))
                                .slice(2, 4)}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pop-content">
                      <div className="content-box">
                        <div className="video-play">
                          <ul>
                            <li className="first">
                              <div className="video">
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={playingVideo.video_link}
                                  controls=""
                                  preload="auto"
                                  className="embed-responsive-item"
                                  allow="camera; microphone; autoplay; fullscreen"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <div className="title">
                                <p>{playingVideo.subject}</p>
                                <span>
                                  - Full Screen: Click the screen icon on the
                                  right bottom <br />- Resolution: Click the
                                  setting icon on the right bottom and select 4k
                                </span>
                              </div>
                            </li>

                            <li className="last">
                              {restVideos &&
                                restVideos.map((video) => (
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="video"
                                    onClick={() => handleClickRestVideo(video)}
                                  >
                                    <img
                                      src={video.video_cover_link}
                                      alt="video cover link"
                                    />
                                    <p className="tit">{video.subject}</p>
                                  </div>
                                ))}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VideoCategoryModal;
