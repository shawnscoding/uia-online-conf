import React from "react";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import { Vector3, Vector2, Quaternion } from "@babylonjs/core";
import BabylonScene from "../NewBabylonScene";
import * as WebGL from "../WebGLCommon";
import { mainPaths, apiClient } from "../../utils/data/api";

const Lounge = ({
  setOpen,
  setLoadbarOpen,
  setOpenUprism,
  setSurvey,
  setOpenGame,
  setAPI
}) => {
  const Key_MeshName = "Key_MeshName";
  const Key_Click = "Key_Click";
  const Key_ADDVector = "Key_ADDVector";
  const Key_IconPath = "Key_IconPath";

  function Item(Name, AddVector, IconPath, ClickCallback) {
    this.Key_MeshName = Name;
    this.Key_Click = ClickCallback;
    this.Key_ADDVector = AddVector;
    this.Key_IconPath = WebGL.Constants.CDN_Path_UI + IconPath;
  }
  let MainScene, MainCamera, MainCanvas, ItemList;
  const Awake = (scene, canvas) => 
  {
    MainScene = scene;
    MainCamera = WebGL.MakeFreeArcCamera(
      scene,
      canvas
    );
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
    MainCanvas = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UICanvas");

    ItemList = ItemSet();
    WebGL.PostProcess(MainScene, MainCamera);
  };

  const Start = () => {
    WebGL.Invoke(0.5, ()=>{
    WebGL.Create3DModel(
      MainScene,
      WebGL.Constants.Lounge,
      DownLoadProgress,
      DownLoadComplete
    );
    });
  };

  const ItemSet = () => {
    var List = [
      new Item(
        "Seoul_Botanic_Park_Kiosk01",
        new Vector3(0, 280, 0),
        "icon_contents.png",
        (TargetMesh) => {
          setOpen(true);
        }
      ),
      new Item(
        "Seoul_Botanic_Park_Kiosk02",
        new Vector3(0, 280, 0),
        "icon_game.png",
        (TargetMesh) => {
          setOpenGame(true);
        }
      ),
      new Item(
        "Seoul_Botanic_Park_Kiosk03",
        new Vector3(0, 280, 0),
        "icon_survey.png",
        (TargetMesh) => {
          setSurvey(true);
        }
      ),
      new Item(
        "Seoul_Botanic_Park_Screen",
        new Vector3(0, 350, 0),
        "icon_urban.png",
        (TargetMesh) => {
          setOpenUprism(true);
        }
      ),
    ];
    return List;
  };

    //#region Download
    const DownLoadProgress = (progress) => {
      //setLoadProgress(Math.round((progress.loaded / progress.total) * 100));
    };
    // Mesh Loading Complete Callback
    const DownLoadComplete = (MainMesh) => {

      var people
      people = MainScene.getMaterialByID("Stand1");
      people.transparencyMode = 1;
     
      people = MainScene.getMaterialByID("Stand2");
      people.transparencyMode = 1;
      
      people = MainScene.getMaterialByID("Stand3");
      people.transparencyMode = 1;

      people = MainScene.getMaterialByID("Seoul_Botanic_Park_Plant1");
      people.transparencyMode = 1;

      people = MainScene.getMaterialByID("Seoul_Botanic_Park_Plant2");
      people.transparencyMode = 1;

      people = null;

      MainDisplay();

      WebGL.Invoke(1, () => {
        setLoadbarOpen(false);
      });
    };
    //#endregion

    const MainDisplay = () => {
      var idx;
      for (idx = 0; idx < ItemList.length; ++idx) 
      {
        MeshButton(idx, MainScene.getMeshByName(ItemList[idx][Key_MeshName]));
      }
    };

    const MeshButton = (idx, TargetMesh) => {
      var tempAnimation;
      TargetMesh.actionManager = new BABYLON.ActionManager(MainScene);
      TargetMesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          () => {
            ItemList[idx][Key_Click](TargetMesh);
          }
        )
      );

      var MeshIndicator = WebGL.Make3DUI(
        MainScene,
        ItemList[idx][Key_IconPath],
        WebGL.GetVector3Add(
          TargetMesh.absolutePosition,
          ItemList[idx][Key_ADDVector].x,
          ItemList[idx][Key_ADDVector].y,
          ItemList[idx][Key_ADDVector].z
        )
      );
      MeshIndicator.scaling = new Vector3(30, 30, 10);

      MeshIndicator.lookAt(
        new Vector3(
          MainCamera.position.x,
          MeshIndicator.position.y,
          MainCamera.position.z
        ),
        Math.PI
      );
      MeshIndicator.material.alpha = 0.8;
      MeshIndicator.material.emissiveTexture =
      MeshIndicator.material.diffuseTexture;

      MeshIndicator.actionManager = new BABYLON.ActionManager(MainScene);
      MeshIndicator.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          () => {
            ItemList[idx][Key_Click](TargetMesh);
          }
        )
      );
      MeshIndicator.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPointerOverTrigger,
          () => {
            tempAnimation = WebGL.UIMesh_POPUP(MainScene, MeshIndicator);
            MeshIndicator.material.alpha = 1;
          }
        )
      );
      MeshIndicator.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPointerOutTrigger,
          () => {
            tempAnimation.reset();
            tempAnimation.stop();
            MeshIndicator.material.alpha = 0.8;
          }
        )
      );
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
export default Lounge;
