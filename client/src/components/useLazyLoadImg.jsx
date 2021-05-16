import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// export const toDataURL = (src) => {
//   const img = new Image();
//   img.crossOrigin="anonymous";
//   img.src = src;
//   img.onload = () => {
//     let canvas = document.createElement("canvas");
//     let context = canvas.getContext("2d");

//     canvas.width = img.width;
//     canvas.height = img.height;

//     context.drawImage(img, 0, 0);
//     return canvas.toDataURL("image/png");
//   }
//   return null;
// };

const useProgressiveImage = (src, isCanvas) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (isCanvas) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0);
        const dataUri = canvas.toDataURL("image/png");

        setSourceLoaded(dataUri);
      } else {
        setSourceLoaded(src);
      }
    };
    img.onerror = () => {
      console.log("load failed :: ", src);
    };
  }, [src]);

  return sourceLoaded;
};

export default useProgressiveImage;
