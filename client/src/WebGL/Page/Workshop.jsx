import React, { useState, useEffuseEffect } from "react";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import { Vector3, Vector2, Quaternion, StandardMaterial } from "@babylonjs/core";
import BabylonScene from "../NewBabylonScene";
import * as WebGL from "../WebGLCommon";
import NewBabylonScene from "../NewBabylonScene";
import { FormLabel, Switch } from "@material-ui/core";

const Workshop = ({ topic, setLoadbarOpen, setOpen, notMatched, params}) => {
  
  const [ready, setReady] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);   

  const [prev_link, setLink] = useState(null); 

  let MainCamera,
      MainScreen,
      MainScene = null,
      MainLogo;
  const Awake = (scene, canvas) => 
  {
    MainScene = scene;
    MainCamera = WebGL.MakeFreeArcCamera
    (
      scene,
      canvas
    );
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
    
    setCamera(MainCamera);
    setCanvas(canvas);
    setScene(MainScene);
    setLink(params.room); 
    
    WebGL.PostProcess(MainScene, MainCamera);
  };
  const Start = () => 
  { 
      var URL;
      switch(params.room)
      {
        case "room1":
          URL = WebGL.Constants.Workshop1;
          break;
        case "room2":
          URL = WebGL.Constants.Workshop2;
          break;
        case "room3":
          URL = WebGL.Constants.Workshop3;
          break
        default :
          URL = WebGL.Constants.Workshop1;
          break;
      }
      WebGL.Invoke(0.5, ()=>{
        WebGL.Create3DModel(
          MainScene,
          URL,
          DownLoadProgress,
          DownLoadComplete
        );
      });     
  };

  const Make3DUIEvent = (mesh, mainscene) => {
    mesh.actionManager = null;
    mesh.actionManager = new BABYLON.ActionManager(mainscene);
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        setOpen(true);
      })
    );
  };

  const DownLoadProgress = (progress) => {
      //setLoadProgress(Math.round((progress.loaded / progress.total) * 100));
  };


  const DownLoadComplete = () => 
  {
    var people;

    people = MainScene.getMaterialByID("Sit_chair1");
    people.transparencyMode = 1;

    people = MainScene.getMaterialByID("Sit_chair2");
    people.transparencyMode = 1;

    people = null;    
    
    MainScreen = BABYLON.MeshBuilder.CreatePlane("VideoScreen", {
      height: 615,
      width: 1110,
      depth: 1,
    });
    MainScreen.position = new Vector3(0, 330,-2250);
    MainScreen.rotate(Vector3.Up(), Math.PI, BABYLON.Space.WORLD);
    WebGL.VideoMaterial(MainScreen, MainScene, WebGL.Constants.WorkshopVideo, WebGL.Constants.WorkshopImage);
    
    MainScreen.scaling = new Vector3(-MainScreen.scaling.x, -MainScreen.scaling.y, MainScreen.scaling.z);   
    
    MainScreen.actionManager = new BABYLON.ActionManager(MainScene);
    MainScreen.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        setOpen(true);
      })
    );
    
    MainLogo = BABYLON.MeshBuilder.CreatePlane("VideoScreen", {
      height: 160,
      width: 1350,
      depth: 1,
    });
    MainLogo.position = new Vector3(0, 770,-2375);
    MainLogo.rotate(Vector3.Up(), Math.PI, BABYLON.Space.WORLD);    
    MainLogo.scaling = new Vector3(MainScreen.scaling.x, MainScreen.scaling.y, MainScreen.scaling.z);   

    MainLogo.material = new StandardMaterial("Logo", MainScene);
    MainLogo.material.emissiveTexture = new BABYLON.Texture(
      WebGL.Constants.CDN_Path_Demo + "Workshop_Front.jpg",
      MainScene,
      true,
      false
    );

    setLoadbarOpen();
    setReady(true);
  };

  if(ready)
  {  
    if(prev_link != params.room)
    {
      setReady(false);
      scene.meshes.forEach(function(mesh)
      {
        mesh.dispose();
      });
      camera.dispose();

      Awake(scene,canvas);
      Start();
    }   
  }

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
export default Workshop;
