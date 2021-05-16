import React from "react";
import "@babylonjs/loaders";
import * as BABYLON from "@babylonjs/core";
import { Vector3, Vector2, Quaternion, StandardMaterial } from "@babylonjs/core";

import BabylonScene from "../NewBabylonScene";
import * as WebGL from "../WebGLCommon";

const SeoulBooth = ({ setOpen, setQaOpen, setLoadbarOpen, setOpenEvent }) => {
  const Key_MeshName = "Key_MeshName";
  const Key_Click = "Key_Click";
  const Key_ADDVector = "Key_ADDVector";
  const Key_IconPath = "Key_IconPath";
  const SeverPath = "https://d2lx5o5tt1uoj2.cloudfront.net/ui/";

  const Key_Left = WebGL.Constants.CDN_Path_Demo + "Booth_logo_left.png";
  const Key_Right = WebGL.Constants.CDN_Path_Demo + "Booth_logo_right.png";

  function Item(Name, AddVector, IconPath, ClickCallback) {
    this.Key_MeshName = Name;
    this.Key_ADDVector = AddVector;
    this.Key_Click = ClickCallback;
    this.Key_IconPath = SeverPath + IconPath;
  }

  let MainScene, MainCamera, ItemList, MainScreen;
  const Awake = (scene, canvas) => 
  {
    MainScene = scene;
     //#region Initialize Scene
    MainCamera = WebGL.MakeFreeArcCamera(
      scene,
      canvas
    );
    MainCamera.minZ = 0;

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
    ItemList = ItemSet();
    WebGL.PostProcess(MainScene, MainCamera);
  };

  const Start = () => {
    WebGL.Invoke(0.5, ()=>{
      WebGL.Create3DModel(
        MainScene,
        WebGL.Constants.SeoulBooth,
        DownLoadProgress,
        DownLoadComplete
      );
    });
  };

  //#region Download
  const DownLoadProgress = (progress) => {
  //setLoadProgress(Math.round((progress.loaded / progress.total) * 100));
  };
  // Mesh Loading Complete Callback
  const DownLoadComplete = (MainMesh) => {
    var people;

    people = MainScene.getMaterialByID("N_Seoul_Tower_Lighting");
    people.emissiveIntensity = 10;

    people = MainScene.getMaterialByID("Stand2");
    people.transparencyMode = 1;
   
    people = MainScene.getMaterialByID("Stand3");
    people.transparencyMode = 1;
    
    people = MainScene.getMaterialByID("Stand4");
    people.transparencyMode = 1;    

    var tex_L = new BABYLON.Texture(Key_Left, MainScene, true, false, 1, ()=>
    {
      people = MainScene.getMeshByID("Booth_Logo_Left");
      people.material = new StandardMaterial("Left",MainScene);
      people.material.diffuseTexture = tex_L;
      people.material.emissiveTexture = tex_L;
      people.material.diffuseTexture.hasAlpha = true;
    });
    people = null;
    
    var tex_R = new BABYLON.Texture(Key_Right, MainScene, true, false, 1, ()=>
    {
      people = MainScene.getMeshByID("Booth_Logo_Right");
      people.material = new StandardMaterial("Right",MainScene);
      people.material.diffuseTexture = tex_R;
      people.material.emissiveTexture = tex_R;
      people.material.diffuseTexture.hasAlpha = true;
    }); 
    people = null;


    people = null;
      
    WebGL.Invoke(1, () => {
      setLoadbarOpen(false);
    });
    MainDisplay();
    };
    //#endregion

    const ItemSet = () => {
      var List = [
        new Item(
          "N_Seoul_Tower_Female",
          new Vector3(0, 215, 10),
          "icon_qna.png",
          () => {
            setQaOpen(true);
          }
        ),

        new Item(
          "N_Seoul_Tower_BrochureStand",
          new Vector3(0, 210, 0),
          "icon_brochure.png",
          () => {
            setOpen(true);
          }
        ),

        new Item(
          "N_Seoul_Tower_Kiosk01",
          new Vector3(0, 220, 0),
          "icon_venue.png",
          () => {
            window.open("http://www.miceseoul.com/venuesearch");
          }
        ),

        new Item(
          "N_Seoul_Tower_Kiosk02",
          new Vector3(0, 220, 0),
          "icon_event.png",
          () => {
            setOpenEvent(true);
          }
        ),
        new Item(
          "N_Seoul_Tower_Screen",
          new Vector3(0, 225, 0),
          "icon_event.png",
          () => {
            setQaOpen(true);
          }
        )
        
      ];
      return List;
    };

    const MainDisplay = () => {
      for (var idx = 0; idx < ItemList.length; ++idx) {
        MeshButton(idx, MainScene.getMeshByName(ItemList[idx][Key_MeshName]), ItemList[idx][Key_ADDVector]);
      }

      MainScreen = BABYLON.MeshBuilder.CreatePlane("VideoScreen", {
        height: 157,
        width: 285,
        depth: 1,
      });
      MainScreen.position = new Vector3(0, 57, -1005);
      MainScreen.rotate(Vector3.Up(), Math.PI, BABYLON.Space.WORLD);
      MainScreen.scaling = new Vector3(-MainScreen.scaling.x, -MainScreen.scaling.y, MainScreen.scaling.z);
      WebGL.VideoMaterial(MainScreen, MainScene, WebGL.Constants.SeoulBoothVideo, WebGL.Constants.SeoulBoothImage);

      MainScreen.actionManager = new BABYLON.ActionManager(MainScene);
      MainScreen.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
          setQaOpen(true);
        })
      );
      
    };

    const MeshButton = (idx, TargetMesh, AddVector) => {
      var tempAnimation;
      
      TargetMesh.actionManager = new BABYLON.ActionManager(MainScene);
      TargetMesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          () => {
            ItemList[idx][Key_Click]();
          }
        )
      );
      if(idx == 0)
        return;
      var MeshIndicator = WebGL.Make3DUI(
        MainScene,
        ItemList[idx][Key_IconPath],
        WebGL.GetVector3Add(
          TargetMesh.absolutePosition,
          AddVector.x,
          AddVector.y,
          AddVector.z
        )
      );
      MeshIndicator.scaling = new Vector3(30, 30, 10);
      MeshIndicator.material.alpha = 0.8;
      MeshIndicator.material.emissiveTexture = MeshIndicator.material.diffuseTexture;

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

      MeshIndicator.lookAt(
        new Vector3(
          MainCamera.position.x,
          MeshIndicator.position.y,
          MainCamera.position.z
        ),
        Math.PI
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
export default SeoulBooth;
