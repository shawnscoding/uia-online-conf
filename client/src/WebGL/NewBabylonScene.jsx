import { Engine, Scene, NullEngine } from "@babylonjs/core";
import React, { useEffect, useRef, useState } from "react";
import { getContext } from "redux-saga/effects";
class Babylon {
  static Engine = null;
  static Scene = null;
  static ReactCanvas = null;

  static Clear = () => {
    Babylon.Engine.unRegisterView(Babylon.ReactCanvas);
  };
  static Initialize = () => {
    if (Babylon.Scene !== null) {
      Babylon.Scene.clearCachedVertexData();
      Babylon.Scene.cleanCachedTextureBuffer();
      Babylon.Scene.dispose();
      Babylon.Scene = null;
    }

    if (Babylon.Engine !== null) {
      Babylon.Engine.dispose();
      Babylon.Engine = null;
    }
  };

  static Render = () => 
  {    
    if (window.orientation != null) 
    {
    if(Babylon.Engine.getHardwareScalingLevel() != 0.5)
      Babylon.Engine.setHardwareScalingLevel(0.5);
      
      Babylon.Engine.resize();
    }

    if (Babylon.Scene != null) 
    Babylon.Scene.render();

  };
  static ResizeComputer = () => 
  {
    Babylon.ReactCanvas.width = window.innerWidth;
    Babylon.ReactCanvas.height = window.innerHeight;
    Babylon.Engine.resize();
  };


  static ResizeMobile = () => 
  {
    if(Babylon.Engine.getHardwareScalingLevel() != 0.5)
      Babylon.Engine.setHardwareScalingLevel(0.5);

    var width = window.innerWidth;
    var height = window.innerHeight;
    var isWidth = width > height ? true : false;
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; // Detect Android devices

    if (isAndroid) 
    {
      if (window.orientation == 90 || window.orientation == -90) 
      {
        //Landscape Mode        
        Babylon.ReactCanvas.width = isWidth ? width : height;
        Babylon.ReactCanvas.height = isWidth ? height : width;
      } 
      else
      {
        //Portrait Mode
        Babylon.ReactCanvas.width = isWidth ? height : width;
        Babylon.ReactCanvas.height = isWidth ? width : height;
      }
    } 
    else 
    {
      if (window.orientation == 90 || window.orientation == -90) 
      {
        //Landscape Mode        
        Babylon.ReactCanvas.width = isWidth ? width : height;
        Babylon.ReactCanvas.height = isWidth ? height : width;
      } 
      else
      {
        //Portrait Mode
        Babylon.ReactCanvas.width = isWidth ? height : width;
        Babylon.ReactCanvas.height = isWidth ? width : height;
      }
    }
    Babylon.Engine.resize();
    Babylon.PrevData = width;
  };
}
export default (props) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  var browse = navigator.userAgent.toLowerCase();
  var isIE = browse.indexOf("trident");

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      Babylon.ReactCanvas = reactCanvas.current;
      setLoaded(true);
      if (Babylon.Engine == null) {
        Babylon.Engine = new Engine(
          reactCanvas.current,
          antialias,
          engineOptions,
          true
        );
        Babylon.Engine.runRenderLoop(Babylon.Render);
      } else {
        if (Babylon.Engine._gl.getExtension("WEBGL_lose_context") !== null) {
          Babylon.Engine._gl.getExtension("WEBGL_lose_context").loseContext();

          Babylon.Initialize();
          Babylon.Engine = new Engine(
            reactCanvas.current,
            antialias,
            engineOptions,
            true
          );
        } else {
          // webgl context 날리는 함수를 지원하지 않는 브라우저일 경우
          if (isIE <= -1) {
            // ie일 경우
            Babylon.Engine.registerView(reactCanvas.current);
            Babylon.Engine.inputElement = reactCanvas.current;
          } else {
            // 둘 다 지원하지 않는 모바일 일경우
            Babylon.Initialize();
            Babylon.Engine = new Engine(
              reactCanvas.current,
              antialias,
              engineOptions,
              adaptToDeviceRatio
            );
          }
        }

        Babylon.Engine.runRenderLoop(Babylon.Render);
      }

      Babylon.Engine.enableOfflineSupport = false;
      Babylon.Engine.doNotHandleContextLost = true;

      if (Babylon.Scene == null)
        Babylon.Scene = new Scene(Babylon.Engine, sceneOptions);

      if (window.orientation == null) 
      {
        reactCanvas.current.style.display = "block";
        reactCanvas.current.style.width = "100%";
        reactCanvas.current.style.height = "100%";
        Babylon.ResizeComputer();
        if (process.env.REACT_APP_WEBGL_QUALITY === "LOW")
          Babylon.Engine.setHardwareScalingLevel(2.5);
        else
          window.addEventListener("resize", () => {
            Babylon.ResizeComputer();
          });
      } 
      else 
      {
        reactCanvas.current.style.display = "block";
        reactCanvas.current.style.width = "100%";
        reactCanvas.current.style.height = "100%";
        Babylon.ResizeMobile();
        window.addEventListener("orientationchange", () => 
        {
           Babylon.ResizeMobile();
        });
        
      }
    }
    props.onSceneReady(Babylon.Scene, Babylon.ReactCanvas);

    return () => {
      Babylon.Clear();
    };
  }, [reactCanvas]);




  const { width, height } = props;
  const opts = {};

  if (width !== undefined && height !== undefined) {
    opts.width = width;
    opts.height = height;
  } else {
    opts.width = window.innerWidth;
    opts.height = window.innerHeight;
  }

  return (
    <div>
      <canvas {...opts} ref={reactCanvas} {...rest} />
    </div>
  );
};
