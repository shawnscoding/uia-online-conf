import React from "react";
import { mainPaths, apiClient } from "../../utils/data/api";
import LoadingMsg from "./../messages/LoadingMsg";
// import { authrizationFailed } from "./../../redux/auth/actions";
import { useDispatch } from "react-redux";
import { Text } from "./../../styledComponent/Text";
import { detectTokenError } from "./../../utils/helper";
import { OPEN_RESPONSE_ALERT } from "./../../redux/types";

const Brochure = () => {
  const [brochures, setBrochures] = React.useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getBrochures = async () => {
      try {
        const res = await apiClient.get(mainPaths["getBrochures"].get);
        console.log(res.data);
        setBrochures(res.data);
      } catch (err) {
        setBrochures([]);
        console.log(err);
        console.log(err.response);
        if (err && err.response) {
          const code = err.response.data.code;
          const msg = err.response.data.error;
          console.log("err data ::", err.response.data);
          if (detectTokenError(code)) {
            dispatch({ type: OPEN_RESPONSE_ALERT, payload: { msg } });
          }
        }
      }
    };
    getBrochures();
  }, []);

  const onClickBrochure = (brochure) => {
    window.open(brochure.download_link, "_blank");

    // const body = { stamp_code: "SB-02" };
    // const logUserOut = () => dispatch(authrizationFailed());
    // storeStamp({ logUserOut, body });
  };

  if (!brochures) return <LoadingMsg />;
  if (brochures.length < 1)
    return <Text>There is no brochure, We are preparing it</Text>;

  return (
    <div className="brochure">
      <ul>
        {brochures &&
          brochures.map((brochure, index) => {
            return (
              <li key={index}>
                <button onClick={() => onClickBrochure(brochure)}>
                  <img
                    src={brochure.cover_link}
                    alt=""
                    // style={{ width: "290px" }}
                  />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Brochure;
