import React, { useState, useEffect } from "react";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import * as BABYLON from "@babylonjs/core";
import { Vector3, Vector2, Quaternion, ParticleSystem } from "@babylonjs/core";
import BabylonScene from "../NewBabylonScene";
import * as WebGL from "../WebGLCommon";
import LobbyPage from "../../layout/lobbyPage/LobbyPage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OPEN_NAVBAR } from "../../redux/types";

import { activateAlert } from "./../../redux/loader/loaderActions";

let MainScene,
  MainCamera,
  UICanvas,
  ItemList,
  isReady = false;
const LabelObject = [];
const MeshObject = [];
const Lobby = ({
  setLoadProgress,
  setVideoModalOpen,
  setLoadbarOpen,
  setSkipClicked,
  setSkipCounted,
  introLoaderUnmounted,
}) => {
  //#region props
  const history = useHistory();
  const dispatch = useDispatch();
  //#endregion

  let EnterButton,
    EnterDescript,
    event = null,
    isClick = false,
    EnterButtonIndex = -1;

  const DefaultRotValue = 0.00005;
  const DefaultCamera = new DefaultCameraValue(
    new Vector3(0, 2, 0),
    1500,
    1.5,
    1,
    750,
    1900
  );

  function DefaultCameraValue(Target, Radius, Alpha, Beta, R_Down, R_UP) {
    this.Target = Target;
    this.Radius = Radius;
    this.Alpha = Alpha;
    this.Beta = Beta;
    this.R_Down = R_Down;
    this.R_UP = R_UP;
  }
  //#region  MeshItem Variable
  const Key_MeshName = "Key_MeshName";
  const Key_Mesh = "Key_Mesh";
  const Key_Title = "Key_Title";
  const Key_Descript = "Key_Descript";
  const Key_Label = "Key_Label";
  const Key_Click = "Key_Click";
  const Key_Enter = "Key_Enter";
  const Key_DscriptPath = WebGL.Constants.CDN_Path_UI + "icon_description.png";
  const Key_LabelVector = "Key_LabelVector";

  function Item(
    Name,
    Title,
    Descript,
    Label,
    LabelVector,
    ClickCallback,
    EnterCallback = null
  ) {
    this.Key_MeshName = Name;

    this.Key_Title = Title;
    this.Key_Descript = Descript;

    this.Key_Label = Label;
    this.Key_LabelVector = LabelVector;
    this.Key_Mesh = null;
    this.Key_Click = ClickCallback;
    this.Key_Enter = EnterCallback;
  }
  const ItemSet = (canvas, camera) => {
    var List = [
      new Item(
        "display_video",
        "Seoul Video",
        "\nClick to watch Seoul in bigger screen before your eyes.",
        "Theater",
        new Vector3(0, 0.01, 0),
        (TargetMesh) => {},
        () => {}
      ),
      new Item(
        "DDP",
        "Dongdaemun Design Plaza",
        "\nAn iconic unique venue of Seoul where new trends begin in exchange of cultures creating the future of Seoul",
        "Theater",
        new Vector3(0, -0.01, 0),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 0, 0),
            400,
            1.6,
            1.1
          );
        },
        () => {
          history.push("/theater");
        }
      ),

      new Item(
        "N_Tower",
        "Namsan Seoul Tower",
        "\nThe all-time famous symbol of Seoul where you can view the whole city from the top of Namsan Mountain",
        "Seoul Booth",
        new Vector3(-0.04, 0.02, 0),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 20, 0),
            400,
            1,
            1.2
          );
        },
        () => {
          history.push("/seoul");
        }
      ),

      new Item(
        "Floating_Island_01",
        "Some Sevit",
        "\nArtificial Island Venues on the Hangang River shining like jewels at night",
        "Workshop 1",
        new Vector3(0, 0.015, 20),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 0, 0),
            400,
            1.5,
            0.6
          );
        },
        () => {
          history.push("/workshop/room1");
        }
      ),

      new Item(
        "Floating_Island_02",
        "Some Sevit",
        "\nArtificial Island Venues on the Hangang River shining like jewels at night",
        "Workshop 2",
        new Vector3(0, 0.015, 0),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 0, 0),
            400,
            3,
            0.6
          );
        },
        () => {
          history.push("/workshop/room2");
        }
      ),

      new Item(
        "Floating_Island_03",
        "Some Sevit",
        "\nArtificial Island Venues on the Hangang River shining like jewels at night",
        "Workshop 3",
        new Vector3(0, 0.015, 0),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 0, 0),
            300,
            4.5,
            0.6
          );
        },
        () => {
          history.push("/workshop/room3");
        }
      ),

      new Item(
        "BotanicPark",
        "Seoul Botanic Park",
        "\nSeoul's representative park combined with a garden to advance urban ecology",
        "Lounge",
        new Vector3(0, 0.01, 0),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 0, 0),
            400,
            1.5,
            1.2
          );
        },
        () => {
          history.push("/lounge");
        }
      ),

      new Item(
        "ChangDuck",
        "Changdeokgung Palace",
        "\nA UNESCO World Heritage Site and the most well preserved palace to present the beauty of the Joseon Dynasty",
        "Conference Hall",
        new Vector3(0, -0.005, 0),
        (TargetMesh) => {
          WebGL.MoveCamera(
            canvas,
            camera,
            1,
            WebGL.GetVector3Add(TargetMesh.absolutePosition, 0, 0, 0),
            400,
            1.5,
            1.3
          );
        },
        () => {
          history.push("/conference");
        }
      ),
    ];
    return List;
  };
  //#endregion

  function Awake(scene, canvas) {
    MainScene = scene;
    MainCamera = WebGL.MakeArcCamera(scene, canvas);
    InitCamera(MainCamera);
    MainCamera.alpha += 1;
    MainCamera.upperRadiusLimit = 4000;
    MainCamera.radius = 4000;

    UICanvas = new GUI.AdvancedDynamicTexture.CreateFullscreenUI("UICanvas");

    ItemList = ItemSet(canvas, MainCamera);

    WebGL.PostProcess(MainScene, MainCamera);
    //#endregion
  }
  function Start() {
    // AutoRotate Camera
    MainScene.onBeforeRenderObservable.add(function () {
      if (EnterButton == null && isClick == false)
        MainCamera.alpha += DefaultRotValue;
    });
    MainScene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          isClick = true;
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          isClick = false;
          break;
      }
    });

    WebGL.Invoke(0.5, () => {
      WebGL.Create3DModel(
        MainScene,
        WebGL.Constants.Lobby,
        DownLoadProgress,
        DownLoadComplete
      );
    });
  }

  if (isReady && (setSkipClicked || setSkipCounted <= 10)) {
    IntroCameraMove();
    isReady = false;
  }

  // Guide 종료시 Display되는 부분
  function MainDisplay() {
    for (var idx = 0; idx < ItemList.length; ++idx) {
      MeshButton(idx);
    }

    LabelObjectActive(false);
    isReady = true;
    WebGL.Invoke(0.5, () => {
      if (introLoaderUnmounted == null || introLoaderUnmounted == false) {
        setLoadProgress(100);
        setLoadbarOpen(false);
      } else {
        IntroCameraMove();
        setLoadbarOpen();
        isReady = false;
      }
    });
  }

  function DownLoadProgress(progress) {
    if (introLoaderUnmounted == null || introLoaderUnmounted == false)
      setLoadProgress(Math.round((progress.loaded / progress.total) * 90));
  }
  // Mesh Loading Complete Callback
  function DownLoadComplete(meshList) {
    InitVideo();
    MainDisplay();
  }
  //#endregion
  // Item interaction 설정
  function MeshButton(idx) {
    var TargetMesh = MainScene.getMeshByName(ItemList[idx][Key_MeshName]);
    ItemList[idx][Key_Mesh] = TargetMesh;
    MeshObject.push(TargetMesh);
    // Mesh Interaction
    TargetMesh.actionManager = new BABYLON.ActionManager(MainScene);
    TargetMesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        ClickMesh(idx);
      })
    );

    if (window.orientation == null) MeshDescript(idx, TargetMesh);

    // Text IndiCator
    if (idx != 0) {
      var MeshIndicator = WebGL.MakeMeshLabel(
        MainScene,
        UICanvas,
        TargetMesh,
        ItemList[idx][Key_Label],
        ItemList[idx][Key_LabelVector]
      );
      MeshIndicator.alpha = 0;
      LabelObject.push(MeshIndicator);
    }
  }

  const onSceneReady = (scene, canvas) => {
    scene.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    Awake(scene, canvas);
    Start();
  };

  /// Descript Create
  function MeshDescript(idx, TargetMesh) {
    TargetMesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOverTrigger,
        () => {
          EnterDescript = WebGL.MakeDescript(
            MainScene,
            UICanvas,
            TargetMesh,
            ItemList[idx][Key_Title],
            ItemList[idx][Key_Descript],
            Key_DscriptPath
          );
          WebGL.UIAnimation_Scale(
            MainScene,
            EnterDescript,
            window.innerWidth * 0.0006,
            window.innerWidth * 0.175,
            -window.innerHeight * 0.09
          );
        }
      )
    );
    TargetMesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOutTrigger,
        () => {
          if (EnterDescript != null) {
            EnterDescript.dispose();
            EnterDescript = null;
          }
        }
      )
    );
  }

  /// Mesh Click function
  function ClickMesh(idx) {
    isClick = !isClick;

    if (EnterButtonIndex === idx) InitMoveCamera();
    else {
      LabelObjectActive(false);

      EnterButtonIndex = idx;
      ItemList[idx][Key_Click](ItemList[idx][Key_Mesh]);
      if (EnterButton != null) EnterButton.dispose();
      EnterButton = WebGL.MakeEnterButton(
        MainScene,
        UICanvas,
        idx,
        ItemList[idx][Key_Mesh],
        ItemList[idx][Key_LabelVector],
        ItemList[idx][Key_Enter]
      );

      if (window.orientation != null) {
        if (EnterDescript != null) EnterDescript.dispose();
        EnterDescript = WebGL.MakeDescript(
          MainScene,
          UICanvas,
          ItemList[idx][Key_Mesh],
          ItemList[idx][Key_Title],
          ItemList[idx][Key_Descript],
          Key_DscriptPath
        );
        if (window.orientation == 90 || window.orientation == -90) {
          //Landscape Mode
          WebGL.UIAnimation_Scale(
            MainScene,
            EnterDescript,
            window.innerWidth * 0.002,
            window.innerWidth / 1.8,
            0
          );
        } else {
          //Portrait Mode
          WebGL.UIAnimation_Scale(
            MainScene,
            EnterDescript,
            window.innerWidth * 0.005,
            0,
            window.innerHeight / 3
          );
        }
      }

      if (event != null) MainScene.onPointerObservable.remove(event);

      WebGL.Invoke(1, () => {
        LabelObjectActive(true);
        //setClickObject(WebGL.MakeEnterButton(maincanvas, TargetMesh, Key_IconPath));
        event = MainScene.onPointerObservable.add((pointerInfo) => {
          switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERWHEEL:
              if (
                pointerInfo.event.wheelDelta != null &&
                pointerInfo.event.wheelDelta < 0
              )
                if (
                  pointerInfo.event.deltaY != null &&
                  pointerInfo.event.deltaY > 0
                )
                  InitMoveCamera();
              break;
          }
        });
      });
    }
  }

  /// 카메라 초기화
  function InitMoveCamera() {
    LabelObjectActive(false);
    var camera = MainCamera;
    var canvas = UICanvas;
    EnterButtonIndex = -1;

    if (EnterButton != null) {
      EnterButton.dispose();
      EnterButton = null;
    }
    if (EnterDescript != null) {
      EnterDescript.dispose();
      EnterDescript = null;
    }
    if (event != null) MainScene.onPointerObservable.remove(event);

    WebGL.MoveCamera(
      canvas,
      camera,
      1,
      DefaultCamera["Target"],
      DefaultCamera["Radius"],
      DefaultCamera["Alpha"],
      DefaultCamera["Beta"],
      () => {
        InitCamera(camera);
      }
    );
  }

  function InitCamera(camera) {
    camera.target = DefaultCamera["Target"];
    camera.radius = DefaultCamera["Radius"];
    camera.alpha = DefaultCamera["Alpha"];
    camera.beta = DefaultCamera["Beta"];
    camera.lowerRadiusLimit = DefaultCamera["R_Down"];
    camera.upperRadiusLimit = DefaultCamera["R_UP"];
    isClick = false;
    LabelObjectActive(true);
  }

  function InitVideo() {
    var VideoScreen = BABYLON.MeshBuilder.CreatePlane("name", {
      height: 153,
      width: 275,
      depth: 4,
    });
    MeshObject.push(VideoScreen);
    
    WebGL.VideoMaterial(VideoScreen, MainScene, WebGL.Constants.LobbyVideo, WebGL.Constants.LobbyImage);

    VideoScreen.position = MainScene.getMeshByName(
      ItemList[0][Key_MeshName]
    ).absolutePosition.add(new Vector3(6.5, -7, 6.5));
    VideoScreen.scaling = new Vector3(1, -1, 1);
    VideoScreen.rotation = new Vector3(0, Math.PI + 0.65, 0);

    VideoScreen.actionManager = new BABYLON.ActionManager(MainScene);
    VideoScreen.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        setVideoModalOpen(true);
      })
    );
    
    
    var LogoScreen = BABYLON.MeshBuilder.CreatePlane("Logo", {
      height: 60,
      width: 275,
      depth: 4,
    });
    var LogoTexture = new BABYLON.Texture(WebGL.Constants.CDN_Path_Demo + "Lobby_Logo.jpg", MainScene, true, false);
    LogoScreen.material = new BABYLON.StandardMaterial(
      "LogoImg",
      MainScene
    );
    LogoScreen.material.emissiveTexture = LogoTexture;
    LogoScreen.position = MainScene.getMeshByName(
      ItemList[0][Key_MeshName]
    ).absolutePosition.add(new Vector3(5, 100, 5));
    LogoScreen.scaling = new Vector3(1, -1, 1);
    LogoScreen.rotation = new Vector3(0, Math.PI + 0.65, 0);

    if (window.orientation == null) {
      // Video Screen
      MeshDescript(0, VideoScreen);
    }
  }
  function LabelObjectActive(active) {
    for (var idx = 0; idx < MeshObject.length; ++idx) {
      MeshObject[idx].isPickable = active;
    }
  }

  function IntroCameraMove() {
    // Create a particle system
    var particleSystem;
    var fogTexture = new BABYLON.Texture(
      WebGL.Constants.CDN_Path + "ui/smoke.png",
      MainScene
    );
    particleSystem = new BABYLON.ParticleSystem("particles", 50, MainScene);
    particleSystem.manualEmitCount = particleSystem.getCapacity();
    particleSystem.emitter = MainCamera;
    particleSystem.minEmitBox = new BABYLON.Vector3(500, 100, 250); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(-1500, 100, 2500); // To...

    particleSystem.particleTexture = fogTexture.clone();
    particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.3);
    particleSystem.color2 = new BABYLON.Color4(0.95, 0.95, 0.95, 0.4);
    particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
    particleSystem.minSize = 1500;
    particleSystem.maxSize = 1500;
    particleSystem.minAngularSpeed = -5;
    particleSystem.maxAngularSpeed = 5;
    particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD;

    particleSystem.minLifeTime = 4;
    particleSystem.maxLifeTime = 4;
    particleSystem.start();

    WebGL.MoveCamera(
      MainScene.getEngine().getRenderingCanvas(),
      MainCamera,
      0.25,
      DefaultCamera.Target,
      DefaultCamera.Radius,
      DefaultCamera.Alpha,
      DefaultCamera.Beta,
      () => {
        particleSystem.dispose();

        MainCamera.lowerRadiusLimit = DefaultCamera.R_Down;
        MainCamera.upperRadiusLimit = DefaultCamera.R_UP;
        LabelObjectActive(true);
        for (var idx = 0; idx < LabelObject.length; ++idx) {
          LabelObject[idx].alpha = 1;
        }

        dispatch({ type: OPEN_NAVBAR });
        dispatch(activateAlert());
      }
    );
  }
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (mainscene) => {};
  return (
    <BabylonScene
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas"
    />
  );
};

export default Lobby;
