import React, { useState } from "react";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import { Vector3, Vector2, Quaternion } from "@babylonjs/core";
import BabylonScene from "../NewBabylonScene";
import * as WebGL from "../WebGLCommon";

const Conference = ({ setLoadbarOpen, setOpen, currentContent, handleToggleInfo, setOpenLecturer}) => {
  
  var screenMesh;  
  let MainScene, MainCamera = null;

  const Awake = (scene, canvas) => 
  {
    MainScene = scene;

    MainCamera = WebGL.MakeFreeArcCamera(scene, canvas);
    MainCamera.attachControl(canvas, true);
    
    if(window.orientation == null)
    {
      scene.onPointerObservable.add((pointerInfo) => 
      { 
        switch (pointerInfo.type) 
        {  
          // 마우스 휠 움직일 경우
          case BABYLON.PointerEventTypes.POINTERWHEEL:
            // 마우스 휠 움직인 정도를 받아옴 (휠을 앞으로 밀면 +, 당기면 -)
            MainCamera.fov -= pointerInfo.event.wheelDelta * 0.001;
            if(MainCamera.fov <= 0.3)
            MainCamera.fov = 0.3;
            if(1.0 <= MainCamera.fov)
            MainCamera.fov = 1.0;
            break;
        }
      });
    }
    
    WebGL.PostProcess(MainScene, MainCamera);
  };

  const Start = () => {
    WebGL.Invoke(0.5, ()=>{
      WebGL.Create3DModel(
        MainScene,
        WebGL.Constants.Conference,
        DownLoadProgress,
        DownLoadComplete
      );
    });
  };
  
  const Make3DUIEvent = (mesh, MainScene) => {
    mesh.actionManager = new BABYLON.ActionManager(MainScene);
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        // if(currentContent == null)
        //   console.error("데이터값이 들어오지 않음");
        setOpen(true);
      })
    );
  };

  const DownLoadProgress = (progress) => {
    //setLoadProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const DownLoadComplete = (MainMesh) => {
    var people;
    people = MainScene.getMaterialByID("Sit_back1");
    people.transparencyMode = 1;

    people = MainScene.getMaterialByID("Sit_back2");
    people.transparencyMode = 1;

    var temp = MainScene.getMaterialByID("ConferenceRoom_Banner");
    
    temp.emissiveTexture = new BABYLON.Texture(
      WebGL.Constants.CDN_Path_Demo + "Conference_Front.jpg",
      MainScene,
      true,
      false
    );
    temp = MainScene.getMaterialByID("ConferenceRoom_Speakers");    
    temp.emissiveTexture = new BABYLON.Texture(
      WebGL.Constants.CDN_Path_Demo + "Conference_Right.jpg",
      MainScene,
      true,
      false
    );    
    temp = MainScene.getMaterialByID("UIA_Programme-01");    
    temp.emissiveTexture = new BABYLON.Texture(
      WebGL.Constants.CDN_Path_Demo + "Conference_Left.jpg",
      MainScene,
      true,
      false
    );
    temp = MainScene.getMeshByName("ConferenceRoom_WatchOnDemand");
    temp.actionManager = new BABYLON.ActionManager(MainScene);
    temp.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {handleToggleInfo();}))

    temp = MainScene.getMeshByName("ConferenceRoom_Speakers.1");
    temp.actionManager = new BABYLON.ActionManager(MainScene);
    temp.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {setOpenLecturer(true);}))

    temp = null;

    
    screenMesh = MainScene.getMeshByName("ConferenceRoom_Screen");
    WebGL.VideoMaterial(screenMesh, MainScene, WebGL.Constants.ConferenceVideo, WebGL.Constants.ConferenceImage);
    screenMesh.scaling = new Vector3(-screenMesh.scaling.x, screenMesh.scaling.y, screenMesh.scaling.z);   

    Make3DUIEvent(screenMesh, MainScene);

    setLoadbarOpen(false);
  };


  const onSceneReady = (scene, canvas) => {
    Awake(scene, canvas);
    Start();
  };

  const onRender = (scene) => {};

  return (
    <BabylonScene
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas"
    />
  );
};
export default Conference;
