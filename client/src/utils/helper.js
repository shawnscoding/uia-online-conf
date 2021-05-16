import { apiClient, mainPaths } from "./data/api";
import moment from "moment";

export const mapObjToArr = (obj) => {
  if (!obj) return;
  const arr = [];
  for (const key in obj) {
    arr.push({ ...obj[key] });
  }

  return arr;
};

export const detectIe = () => {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var rv = -1;

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer, return version number
    if (isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
      //For IE 11 >
      if (navigator.appName == "Netscape") {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
        if (re.exec(ua) != null) {
          rv = parseFloat(RegExp.$1);
          // e11;
          return true;
        }
      } else {
        // alert("otherbrowser");
      }
    } else {
      //For < IE11
      // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    }
    return false;
  }
};

export const downloadURI = (uri, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // delete link;
};

export const convertNumToArray = (total, currentPage) => {
  const arr = [];
  if (currentPage < 7) {
    for (let i = 0; i < total; i++) {
      if (i < 10) {
        arr.push(i + 1);
      } else {
        return arr;
      }
    }
  } else {
    // push start to currentpage
    for (let i = 1; i <= 6; i++) {
      arr.push(currentPage - 6 + i);
    }
    // push to end
    for (let i = 1; i <= 4; i++) {
      if (total >= currentPage + i) {
        arr.push(currentPage + i);
      } else {
        continue;
      }
    }
  }

  return arr;
};

export const detectTokenError = (code) => {
  if (
    code === 1000 ||
    code === 1001 ||
    code === 1002 ||
    code === 1003 ||
    code === 9000 ||
    code === 9001
  ) {
    return true;
  } else {
    return;
  }
};

export const storeStamp = async ({ logUserOut, body }) => {
  if (!body) return;
  if (!localStorage.token) {
    logUserOut();
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  try {
    const res = await apiClient.post(mainPaths["stamp"].post, body, config);
    console.log("body ::", body);
    console.log("res in storeStamp ::", res);
  } catch (err) {
    console.log("err :::");
    console.log(err);
    if (err.response && err.response.error) {
      const code = err.response.error.code;
      if (detectTokenError(code)) {
        logUserOut();
        return;
      }
    }
  }
};

export const detectCookieForGuide = () => {
  try {
    console.log("document cookie ----------");
    console.log(document.cookie);
    const open = document.cookie
      .split("; ")
      .find((row) => row.startsWith("guideOpen"));
    console.log("guideOpen : ", open);

    if (open === "guideOpen=false") {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log("err");
    console.log(err);
  }
};

export const detectTimeMatching = (obj) => {
  const { start_datetime, end_datetime } = obj;

  const startDate = moment.utc(start_datetime).format();
  const endDate = moment.utc(end_datetime).format();
  const isTrue = moment.utc().isBetween(startDate, endDate);

  return isTrue;
};

export const isWindows = () => {
  return navigator.platform.indexOf("Win") > -1;
};

export const isMobile = () => {
  return navigator.userAgent.indexOf("Mobi") > -1;
};

const onDownload = () => {
  const link = document.createElement("a");
  // link.target = "_blank";
  link.href = `https://d2lx5o5tt1uoj2.cloudfront.net/Teambuild/Virtual_Seoul_Playground_Setup.exe`;
  if (link.download) {
    link.download = "Virtual_Seoul_Playground_Setup.exe";

    document.body.appendChild(link);

    link.dispatchEvent(new MouseEvent("click"));
    document.body.removeChild(link);
  } else {
    link.click();
    document.body.appendChild(link);

    document.body.removeChild(link);
  }
};

export const handleDownloadGame = () => {
  let res = isWindows();

  if (res) onDownload();
  else return;
};
