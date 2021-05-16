import React, { useState } from "react";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import { Vector3, Vector2, Quaternion, SetParentAction } from "@babylonjs/core";
import BabylonScene from "../NewBabylonScene";
import * as WebGL from "../WebGLCommon";
import { theaterPaths } from "./../../utils/data/api";

const Theater = ({ videos, setLoadbarOpen, setOpen, setApi }) => {
  var ItemList;
  let coverLink = {};
  let MainCamera,
    MainScene = null;

  const Key_MeshName = "Key_MeshName";
  function Item(Name) {
    this.Key_MeshName = Name;
  }
  const ItemSet = (scene, camera) => {
    var List = [
      new Item("SeoulTheater_Screen01"),
      new Item("SeoulTheater_Screen02"),
      new Item("SeoulTheater_Screen03"),
      new Item("SeoulTheater_Screen04"),
      new Item("SeoulTheater_Screen05"),
    ];
    return List;
  };
  const SetVideoData = (videos) => {
    if (!videos.length) return;
    for (let i = 0; i < videos.length; i++) {
      coverLink[i] = videos[i].cover_link;
    }
  };

  const Awake = (scene, canvas) => {
    SetVideoData(videos);

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
    ItemList = ItemSet(canvas, MainCamera);
  };

  const Start = () => {
    WebGL.Invoke(0.5, ()=>{
      WebGL.Create3DModel(
        MainScene,
        WebGL.Constants.Theater,
        DownLoadProgress,
        DownLoadComplete
      );
    });
  };

  const DownLoadProgress = (progress) => {
    //setLoadProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const DownLoadComplete = (MainMesh) => {
    WebGL.PostProcess(MainScene, MainCamera);
    
    var people
    people = MainScene.getMaterialByID("Sit_back1");
    people.transparencyMode = 1;
   
    people = MainScene.getMaterialByID("Sit_back2");
    people.transparencyMode = 1;

    people = null;
    
    MainDisplay();
    setLoadbarOpen(false);
  };

  const MainDisplay = () => {

    var idx = 0;
    var TargetMesh = MainScene.getMeshByName(ItemList[idx][Key_MeshName]);
    MakeMaterial(TargetMesh, coverLink[idx]);
    Make3DUIEvent(
      TargetMesh,
      MainScene,
      theaterPaths.getCategoryOneInTheater
    );
    ++idx;
    TargetMesh = MainScene.getMeshByName(ItemList[idx][Key_MeshName]);
    MakeMaterial(TargetMesh, coverLink[idx]);
    Make3DUIEvent(
      TargetMesh,
      MainScene,
      theaterPaths.getCategoryTwoInTheater
    );
    ++idx;
    TargetMesh = MainScene.getMeshByName(ItemList[idx][Key_MeshName]);
    MakeMaterial(TargetMesh, coverLink[idx]);
    Make3DUIEvent(
      TargetMesh,
      MainScene,
      theaterPaths.getCategoryThreeInTheater
    );
    ++idx;
    TargetMesh = MainScene.getMeshByName(ItemList[idx][Key_MeshName]);
    MakeMaterial(TargetMesh, coverLink[idx]);
    Make3DUIEvent(
      TargetMesh,
      MainScene,
      theaterPaths.getCategoryFourInTheater
    );
    ++idx;
    TargetMesh = MainScene.getMeshByName(ItemList[idx][Key_MeshName]);
    MakeMaterial(TargetMesh, coverLink[idx]);
    Make3DUIEvent(
      TargetMesh,
      MainScene,
      theaterPaths.getCategoryFiveInTheater
    );
  };

  const Make3DUIEvent = (mesh, mainscene, apiObj) => {
    mesh.actionManager = new BABYLON.ActionManager(mainscene);
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        setApi(apiObj);
        setOpen(true);
      })
    );
  };
  const MakeMaterial = (Target, URL) => {
    var TextureMat = new BABYLON.StandardMaterial(
      "textureMat",
      MainScene,
      true
    );
    TextureMat.emissiveTexture = new BABYLON.Texture(
      URL,
      MainScene,
      true,
      false
    );
    TextureMat.anisotropicFilteringLevel = 0;
    TextureMat.useAlphaFromDiffuseTexture = true;
    TextureMat.backFaceCulling = false;
    Target.material = TextureMat;
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
export default Theater;
