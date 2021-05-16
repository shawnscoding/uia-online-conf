import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import { Control } from "@babylonjs/gui";
import {
  InputBlock,
  Vector2,
  Vector3,
  Quaternion,
  Matrix,
  BasisTranscodeConfiguration,
  ImageProcessingPostProcess,
  MeshBuilder,
  Observable,
  AsyncLoop,
  Color3,
  Color4,
} from "@babylonjs/core";
// model
export class Constants {
  static CDN_Path = "https://d2lx5o5tt1uoj2.cloudfront.net/";
  static CDN_Path_UI = "https://d2lx5o5tt1uoj2.cloudfront.net/ui/";
  static CDN_Path_Demo = "https://d2lx5o5tt1uoj2.cloudfront.net/ui/Demo/";
  static Date = "0907";
  static Extention = ".glb";
  static Lobby = Constants.CDN_Path + "3dmodel/SeoulMap.glb";
  static Lounge =
  Constants.CDN_Path + "3dmodel/Seoul_Botanic_Park_" +  Constants.Date + Constants.Extention;
  static SeoulBooth =
  Constants.CDN_Path + "3dmodel/N_Seoul_Tower_" +  "0908"+ Constants.Extention;
  static Theater =
  Constants.CDN_Path + "3dmodel/Seoul_Theater_" +  "0908" + Constants.Extention;
  static Workshop1 =
  Constants.CDN_Path + "3dmodel/workshopRoom01_" + "0915" + Constants.Extention;
  static Workshop2 =
  Constants.CDN_Path + "3dmodel/workshopRoom02_" + "0915" + Constants.Extention;
  static Workshop3 =
  Constants.CDN_Path + "3dmodel/workshopRoom03_" + "0915" + Constants.Extention;
  static Conference =
  Constants.CDN_Path + "3dmodel/ConferenceRoom_" + "0915" + Constants.Extention;
  static NullImage = 
  Constants.CDN_Path + "workshop/workshop_break.png";

  static LobbyVideo = 
  "https://player.vimeo.com/external/465663785.sd.mp4?s=8837e1938a776343fa53afaa98ff804643abf2e3&profile_id=164&download";
  static LobbyImage = 
  Constants.CDN_Path_Demo + "Lobby_Screen.png";

  static ConferenceVideo = 
  "https://player.vimeo.com/external/465689894.sd.mp4?s=b926c8c0d643c36744f7d3a938d8192c5c92a0c9&profile_id=139&download=1";
  static ConferenceImage = 
  Constants.CDN_Path_Demo + "Conference_Screen.png";

  static WorkshopVideo =
  "https://player.vimeo.com/external/465673066.sd.mp4?s=229ea6099dbd9592e0d5d46286ae8920612cbede&profile_id=165&download=1";
  static WorkshopImage =
  Constants.CDN_Path_Demo + "Workshop_Screen.png";

  static SeoulBoothVideo =
  "https://player.vimeo.com/external/465663785.sd.mp4?s=8837e1938a776343fa53afaa98ff804643abf2e3&profile_id=164&download";
  static SeoulBoothImage =
  Constants.CDN_Path_Demo + "Lobby_Screen.png";
}
export const Invoke = (time, func) => {
  setTimeout(func, time * 1000);
};
export const PostProcess = (Scene, Camera) => {
  Scene.autoClear = false;
  Scene.autoClearDepthAndStencil = false;
  Scene.blockMaterialDirtyMechanism = true;
  if (Scene.getEngine().webGLVersion != 1 && window.orientation == null) {
    new BABYLON.PassPostProcess(
      "scale_pass",
      2.0,
      Camera,
      BABYLON.Texture.BILINEAR_SAMPLINGMODE
    );
    new BABYLON.PassPostProcess(
      "scale_pass",
      1.0,
      Camera,
      BABYLON.Texture.BILINEAR_SAMPLINGMODE
    );
  }
};
export const MakeFreeCamera = (scene, canvas, pos = Vector3.Zero()) => {
  var tempcamera = new BABYLON.FreeCamera("MainCamera", pos, scene);
  tempcamera.attachControl(canvas, true);
  tempcamera.rotation = new Vector3(0, Math.PI, 0);
  tempcamera.angularSensibility = -1000;
  tempcamera.speed = 0;
  return tempcamera;
};

export const MakeFreeArcCamera = (
  scene,
  canvas,
  pos = Vector3.Zero(),
  alpha = Math.PI / 2,
  upperLimit = Math.PI - 0.1,
  lowerLimit = 0.1
) => {
  var tempcamera = new BABYLON.ArcRotateCamera(
    "MainCamera",
    alpha,
    Math.PI / 2,
    0.01,
    pos,
    scene
  );
  tempcamera.attachControl(canvas, true);
  tempcamera.panningSensibility = 0;
  tempcamera.speed = 0;
  
  tempcamera.inputs.attached.keyboard.detachControl();
  tempcamera.angularSensibilityY = -10000;
  tempcamera.angularSensibilityX = -5000;
  tempcamera.upperBetaLimit = upperLimit;
  tempcamera.lowerBetaLimit = lowerLimit;
  tempcamera.upperRadiusLimit = 0.01;
  tempcamera.lowerRadiusLimit = 0.01;
  tempcamera.panningSensibility = 0;
  tempcamera.minZ = 10;
  return tempcamera;
};

export const MakeArcCamera = (
  scene,
  canvas,
  pos = Vector3.Zero(),
  radius = 13,
  leftrightAngle = 1.5,
  topbottomAngle = 1.1
) => {
  var tempcamera = new BABYLON.ArcRotateCamera(
    "MainCamera",
    leftrightAngle,
    topbottomAngle,
    radius,
    pos,
    scene
  );

  tempcamera.minZ = 7;
  tempcamera.lowerBetaLimit = 0.5;
  tempcamera.upperBetaLimit = 1.3;
  tempcamera.angularSensibilityX = 5000;
  tempcamera.angularSensibilityY = 5000;
  tempcamera.wheelPrecision = 1;
  tempcamera.pinchPrecision = 0.5;
  // This attaches the camera to the canvas
  tempcamera.attachControl(canvas, true, false, 3);
  return tempcamera;
};
export const MoveCamera = (
  canvas,
  camera,
  Speed,
  target,
  Distance,
  LeftRightAngle,
  UpDownAngle,
  EndCallback = null
) => {
  camera.detachControl(canvas);
  camera.lowerRadiusLimit = 0;

  const radian = Math.PI * 2;
  if (camera.alpha < 0) {
    camera.alpha = radian - (-camera.alpha % radian);
  } else if (camera.alpha >= radian) {
    camera.alpha = camera.alpha % radian;
  }
  var FramePerSecond = 1;

  var Ease = new BABYLON.PowerEase();
  Ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

  BABYLON.Animation.CreateAndStartAnimation(
    "targetMove",
    camera,
    "target",
    Speed,
    FramePerSecond,
    camera.target,
    target,
    0,
    Ease
  );
  BABYLON.Animation.CreateAndStartAnimation(
    "cameraRotAlpha",
    camera,
    "alpha",
    Speed,
    FramePerSecond,
    camera.alpha,
    LeftRightAngle,
    0,
    Ease
  );
  BABYLON.Animation.CreateAndStartAnimation(
    "cameraRotBeta",
    camera,
    "beta",
    Speed,
    FramePerSecond,
    camera.beta,
    UpDownAngle,
    0
  );

  BABYLON.Animation.CreateAndStartAnimation(
    "cameraMove",
    camera,
    "radius",
    Speed,
    FramePerSecond,
    camera.radius,
    Distance,
    0,
    Ease,
    () => {
      camera.attachControl(canvas, true, false, 3);
      camera.lowerRadiusLimit = Distance;
      if (EndCallback != null) EndCallback();
    }
  );
};

export const UIAnimation_POPUP = (scene, target) => {
  //BABYLON.Animation.CreateAndStartAnimation('popupX', target, 'scaleX', Speed, 1, Start, End);
  //BABYLON.Animation.CreateAndStartAnimation('popupY', target, 'scaleY', Speed, 1, Start, End);

  var ScaleX = new BABYLON.Animation(
    "scaleX",
    "scaleX",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var ScaleY = new BABYLON.Animation(
    "scaleY",
    "scaleY",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var keys = [];
  keys.push({
    frame: 0,
    value: 0,
  });
  keys.push({
    frame: 15,
    value: 1.3,
  });
  keys.push({
    frame: 20,
    value: 1,
  });

  ScaleX.setKeys(keys);
  ScaleY.setKeys(keys);
  target.animations = [];
  target.animations.push(ScaleX);
  target.animations.push(ScaleY);
  scene.beginAnimation(target, 0, 30, true);
};
export const UIAnimation_Move = (scene, target, targetX, targetY) => {
  //BABYLON.Animation.CreateAndStartAnimation('popupX', target, 'scaleX', Speed, 1, Start, End);
  //BABYLON.Animation.CreateAndStartAnimation('popupY', target, 'scaleY', Speed, 1, Start, End);
  var LinkX = new BABYLON.Animation(
    "linkOffsetX",
    "linkOffsetX",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var LinkY = new BABYLON.Animation(
    "linkOffsetY",
    "linkOffsetY",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var Xkeys = [];
  Xkeys.push({
    frame: 0,
    value: 0,
  });
  Xkeys.push({
    frame: 30,
    value: targetX,
  });

  var Ykeys = [];
  Ykeys.push({
    frame: 0,
    value: 0,
  });
  Ykeys.push({
    frame: 30,
    value: targetY,
  });
  LinkX.setKeys(Xkeys);
  LinkY.setKeys(Ykeys);
  target.animations = [];
  target.animations.push(LinkX);
  target.animations.push(LinkY);
  scene.beginAnimation(target, 0, 30, true);
};
export const UIAnimation_Total = (scene, target, targetX, targetY) => {
  //BABYLON.Animation.CreateAndStartAnimation('popupX', target, 'scaleX', Speed, 1, Start, End);
  //BABYLON.Animation.CreateAndStartAnimation('popupY', target, 'scaleY', Speed, 1, Start, End);
  var ScaleX = new BABYLON.Animation(
    "scaleX",
    "scaleX",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var keys = [];
  keys.push({
    frame: 0,
    value: 0,
  });
  keys.push({
    frame: 20,
    value: 1,
  });
  var LinkX = new BABYLON.Animation(
    "linkOffsetX",
    "linkOffsetX",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var Xkeys = [];
  Xkeys.push({
    frame: 0,
    value: 0.2 * targetX,
  });
  Xkeys.push({
    frame: 20,
    value: targetX,
  });
  ScaleX.setKeys(keys);
  LinkX.setKeys(Xkeys);
  target.animations = [];
  target.animations.push(LinkX);
  target.animations.push(ScaleX);
  target.linkOffsetY = targetY;
  scene.beginAnimation(target, 0, 20, true);
};

export const UIAnimation_Scale = (scene, target, scale, targetX, targetY) => {
  //BABYLON.Animation.CreateAndStartAnimation('popupX', target, 'scaleX', Speed, 1, Start, End);
  //BABYLON.Animation.CreateAndStartAnimation('popupY', target, 'scaleY', Speed, 1, Start, End);
  var ScaleX = new BABYLON.Animation(
    "scaleX",
    "scaleX",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  if(window.orientation == null)
  {
    var Rate = GetPPI();
    targetX = targetX * Rate;
    targetY = targetY * Rate;
    scale = scale * Rate;
  }
  var keys = [];
  keys.push({
    frame: 0,
    value: 0,
  });
  keys.push({
    frame: 20,
    value: scale,
  });
  var LinkX = new BABYLON.Animation(
    "linkOffsetX",
    "linkOffsetX",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var Xkeys = [];
  Xkeys.push({
    frame: 0,
    value: 0,
  });
  Xkeys.push({
    frame: 20,
    value: targetX,
  });
  ScaleX.setKeys(keys);
  LinkX.setKeys(Xkeys);
  target.animations = [];
  target.animations.push(LinkX);
  target.animations.push(ScaleX);
  target.scaleY = scale;
  target.linkOffsetY = targetY;
  scene.beginAnimation(target, 0, 20, true);
};
export const MakeMaterialToVideo = (scene, videoUrl, target = BABYLON.Mesh) => {
  target.material = new BABYLON.StandardMaterial("standardVideo", scene);
  var videoTexture = new BABYLON.VideoTexture(
    "video",
    videoUrl,
    scene,
    true,
    true
  );
  target.material.emissiveTexture = videoTexture;
  videoTexture.video.muted = true;
  videoTexture.video.autoplay = true;
  videoTexture.video.loop = true;
  videoTexture.video.play();

  target.material.freeze();

  return videoTexture;
};
export const VideoMaterial = (Target, scene, VideoURL, ImageURL) =>
{
  var videoTexture;
  if (scene.getEngine().webGLVersion == 1) 
  {
    Target.material = new BABYLON.StandardMaterial(
      "video",
      scene
    );
    videoTexture = new BABYLON.Texture(ImageURL, scene, true, false);
    Target.material.emissiveTexture = videoTexture;
  } 
  else 
  {
    Target.material = new BABYLON.StandardMaterial("standardVideo", scene);
    videoTexture = new BABYLON.VideoTexture(
      "video",
      VideoURL,
      scene,
      true,
      true
    );
    Target.material.emissiveTexture = videoTexture;
    videoTexture.video.muted = true;
    videoTexture.video.autoplay = true;
    videoTexture.video.loop = true;
    videoTexture.video.play();
  
    Target.material.freeze();
  }
  Target.scaling = new Vector3(-Target.scaling.x, Target.scaling.y, Target.scaling.z);   
    
  return videoTexture;
}
export const VideoClick = (videoTexture) => {
  videoTexture.video.pause();
};

export const Create3DModel = (
  scene,
  model_string,
  ProgressCallback,
  CompleteCallback,
  LocalFile_Path = ""
) => {
  BABYLON.SceneLoader.ImportMesh(
    "",
    LocalFile_Path, // /Assets/Model/
    model_string,
    scene,
    function (newMeshes) {
      var MainMesh = newMeshes;
      MainMesh.position = new Vector3.Zero();
      MainMesh.Scale = new Vector3.One();
      CompleteCallback(MainMesh);
    },
    ProgressCallback,
    () => {
      if (model_string === undefined || model_string === null) {
        console.error("3D Model URL is null !");
      } else {
        console.error("3D Model URL isn't null, but it load failed !");
      }
    }
  );
};
export const Make3DUIEvent = (mesh, scene) => {
  mesh.actionManager = new BABYLON.ActionManager(scene);
  mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      alert("Click " + mesh);
    })
  );
};

export const Make3DUI = (
  scene,
  URL,
  pos = new Vector3.Zero(),
  scale = new Vector3.One(),
  addPos = new Vector3(0, 2.5, 0),
  rot = new Vector3.Zero(),
  uiWidth = 1,
  uiHeight = 1
) => {
  var TextureMat = new BABYLON.StandardMaterial("textureMat", scene, true);
  TextureMat.diffuseTexture = new BABYLON.Texture(URL, scene);
  TextureMat.emissiveTexture = TextureMat.diffuseTexture;
  TextureMat.anisotropicFilteringLevel = 0;
  TextureMat.diffuseTexture.hasAlpha = true;
  TextureMat.useAlphaFromDiffuseTexture = true;
  TextureMat.backFaceCulling = false;

  var UIImage = BABYLON.MeshBuilder.CreatePlane(
    "uiimage",
    { width: uiWidth, height: uiHeight },
    scene,
    true,
    BABYLON.MeshBuilder.FRONTSIDE
  );
  UIImage.material = TextureMat;
  UIImage.scaling = scale;
  UIImage.position.x = pos.x + addPos.x;
  UIImage.position.y = pos.y + addPos.y;
  UIImage.position.z = pos.z + addPos.z;
  UIImage.rotation.y = rot.y;
  return UIImage;
};
export const GetPPI = ()=>
{
  const StandardPPI = 96;
  var elem = document.createElement('div');
  elem.style.width = '1in';
  document.body.appendChild(elem);
  var ppi = elem.offsetWidth;
  document.body.removeChild(elem);
  ppi = (ppi - StandardPPI) / StandardPPI;
  if(ppi >= 0)
    return 1 + ppi;
  else
    return 1;
}
export const MakeMeshLabel = 
(
  scene,
  canvas,
  target,
  labelText,
  labelVector
) => 
{
  var isMobile = window.orientation != null;
  var bg = new GUI.Button.CreateImageButton(
    "Label",
    "",
    Constants.CDN_Path + "ui/icon_description.png"
  );
  canvas.addControl(bg);
  bg.isEnabled = false;
  bg.image.stretch = GUI.Image.STRETCH_FILL;
  bg.image.width = "100%";
  bg.image.height = "100%";
  bg.cornerRadius = 10;
  bg.image.alpha = 0.9;
  bg.cornerRadius = 250;
  bg.thickness = 0;
  bg.linkWithMesh(target);

  var label = new GUI.TextBlock();
  label.text = labelText;
  label.color = "white";
  label.top = 3;
  
  bg.width = canvas.getContext("2d").measureText(labelText.substring(0, 40)).width * 1.2 + "px";
  bg.height = "30px";
  label.width = "100%";
  label.height = "100%";

  bg.addControl(label);  
  if(isMobile)
  {  
    bg.scaleX = 1.6;
    bg.scaleY = 1.6;
    if (window.orientation == 90 || window.orientation == -90) {
      //Landscape Mode
      bg.linkOffsetX = 0;
      bg.linkOffsetY = window.innerHeight * -1 * (labelVector.y + 0.2);
    } else {
      //Portrait Mode
      bg.linkOffsetX = 0;
      bg.linkOffsetY = window.innerHeight * -1 * (labelVector.y + 0.125);
    }
    scene.getEngine().onResizeObservable.add(() => {
      if (window.orientation == 90 || window.orientation == -90) {
        //Landscape Mode
        bg.linkOffsetX = 0;
        bg.linkOffsetY = window.innerHeight * -1 * (labelVector.y + 0.2);
      } else {
        //Portrait Mode
        bg.linkOffsetX = 0;
        bg.linkOffsetY = window.innerHeight * -1 * (labelVector.y + 0.125);
      }
    });
  }
  else
  { 
    var Rate = GetPPI();
    if(Rate > 1)
    {
      bg.scaleX = Rate;
      bg.scaleY = Rate;
    }

    if (labelVector.x != 0) 
      bg.linkOffsetX = -80;
    else 
      bg.linkOffsetX = 0;
    bg.linkOffsetY = window.innerHeight * -1 * (labelVector.y + 0.08);
    
    scene.getEngine().onResizeObservable.add(() => {
      if (labelVector.x != 0) bg.linkOffsetX = -80;
      else bg.linkOffsetX = 0;
      bg.linkOffsetY = window.innerHeight * -1 * (labelVector.y + 0.08);

    });
  }
  return bg;
};

export const MakeDescript = (
  scene,
  canvas,
  target,
  titleText,
  descriptText,
  url
) => {
  var bg = new GUI.Button.CreateImageButton("EnterButton", "", url);
  canvas.addControl(bg);
  bg.isEnabled = false;
  bg.image.stretch = GUI.Image.STRETCH_FILL;
  bg.image.width = "100%";
  bg.image.height = "100%";
  bg.image.alpha = 0.9;
  bg.cornerRadius = 5;
  bg.thickness = 0;
  bg.linkWithMesh(target);

  var textWidth = canvas
    .getContext("2d")
    .measureText(descriptText.substring(0, 40)).width;
  const LeftRightPadding = 50;
  const TopBottomPadding = 30;
  bg.widthInPixels = textWidth + LeftRightPadding;
  bg.heightInPixels = CheckStringLength(descriptText) * 25 + TopBottomPadding;

  var boldtext = new GUI.TextBlock();
  bg.addControl(boldtext);
  boldtext.text = "\n" + titleText;
  boldtext.widthInPixels = bg.widthInPixels;
  boldtext.heightInPixels = bg.heightInPixels;
  boldtext.paddingTop = -5;
  boldtext.paddingLeft = 15;
  boldtext.paddingRight = 10;
  boldtext.paddingRight = 10;
  boldtext.lineSpacing = 4;
  boldtext.color = "white";
  boldtext.fontStyle = "bold";
  boldtext.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  boldtext.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

  var text = new GUI.TextBlock();

  bg.addControl(text);
  text.text = "\n" + descriptText;
  text.widthInPixels = bg.widthInPixels;
  text.heightInPixels = bg.heightInPixels;
  text.paddingTop = -5;
  text.paddingLeft = 15;
  text.paddingRight = 10;
  text.lineSpacing = 4;
  text.color = "white";
  text.textWrapping = GUI.TextWrapping.WordWrap;
  text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

  boldtext.alpha = 0;
  text.alpha = 0;
  var timer = 0;
  var update = setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
  function onTimerTick() {
    timer += 0.066;
    boldtext.alpha = timer;
    text.alpha = timer;
    if (timer >= 1) clearInterval(update);
  }
  var textWidth = canvas
    .getContext("2d")
    .measureText(text.text.substring(0, 40)).width;

  return bg;
};
export const MakeIconDescript = (
  canvas,
  target,
  descriptText,
  url
) => {
  var bg = new GUI.Button.CreateImageButton("EnterButton", "", url);
  canvas.addControl(bg);
  bg.isEnabled = false;
  bg.image.stretch = GUI.Image.STRETCH_FILL;
  bg.image.width = "100%";
  bg.image.height = "100%";
  bg.image.alpha = 0.9;
  bg.cornerRadius = 5;
  bg.thickness = 0;
  bg.linkWithMesh(target);
  bg.linkOffsetY = 60;
  var textWidth = canvas
    .getContext("2d")
    .measureText(descriptText.substring(0, 40)).width;
  const LeftRightPadding = 50;
  const TopBottomPadding = 30;
  bg.widthInPixels = textWidth + LeftRightPadding;
  bg.heightInPixels = CheckStringLength(descriptText) * 5 + TopBottomPadding;

  var boldtext = new GUI.TextBlock();
  bg.addControl(boldtext);
  boldtext.text = descriptText;
  boldtext.widthInPixels = bg.widthInPixels;
  boldtext.heightInPixels = bg.heightInPixels;
  boldtext.topInPixels = 3;
  boldtext.lineSpacing = 4;
  boldtext.color = "white";
  boldtext.fontStyle = "bold";
  boldtext.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  boldtext.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  return bg;
}
export const CheckStringLength = (checkText) => {
  return 1 + Math.ceil(checkText.length / 40);
};

export const MakeEnterButton = (
  scene,
  canvas,
  index,
  target,
  labelVector,
  click
) => {
  const Key_IconPath =
     Constants.CDN_Path + "ui/icon_enter_new.png";
  var enterBtn = new GUI.Button.CreateImageButton(
    "EnterButton",
    "",
    Key_IconPath
  );
  canvas.addControl(enterBtn);
  enterBtn.image.width = 1;
  enterBtn.image.height = 1;
  if (window.orientation == null) {
    enterBtn.height = "10%";
    enterBtn.width = "10%";
  } else {
    if (window.orientation == 90 || window.orientation == -90) {
      //Landscape Mode
      enterBtn.height = 0.15;
      enterBtn.width = 0.15;
    } else {
      //Portrait Mode
      enterBtn.height = 0.2;
      enterBtn.width = 0.2;
    }
  }
  enterBtn.alpha = 0.95;
  enterBtn.cornerRadius = 100;
  enterBtn.thickness = 0;
  enterBtn.linkWithMesh(target);
  enterBtn.scaleX = 0;
  enterBtn.scaleY = 0;
  enterBtn.name = index;
  enterBtn.hoverCursor = "pointer";
  enterBtn.onPointerClickObservable.add(() => {
    click();
  });
  Invoke(0.8, () => {
    UIAnimation_POPUP(scene, enterBtn);
  });
  return enterBtn;
};

export const isWebGL1Only = () => {
  var isOnlyForWebGL1;
  var browse = navigator.userAgent.toLowerCase();
  var isChrome = browse.indexOf("chrome");
  var isChromeMobile = browse.indexOf("crios"); // ios 크롬
  var isSamsungBrowser = browse.indexOf("samsungbrowser");
  var isWindows = browse.indexOf("windowsnt");
  var isEdge = browse.indexOf("edge");
  var isIE = browse.indexOf("trident");
  var isSafari = browse.indexOf("safari");

  // 브라우저 체크
  if (isChrome > -1) {
    isOnlyForWebGL1 = false; // 크롬이므로 WebGL2 지원
  } else if (isIE > -1 || isSafari > -1 || isChromeMobile > -1) {
    isOnlyForWebGL1 = true; // IE11과 사파리, ios 크롬은 WebGL1 지원
  } else {
    isOnlyForWebGL1 = false;
  }

  return isOnlyForWebGL1;
};

export const GetVector3 = (pos) => {
  return new Vector3(-pos.x, pos.y, pos.z);
};

export const GetVector3Add = (pos, x = 0, y = 0, z = 0) => {
  return new Vector3(pos.x + x, pos.y + y, pos.z + z);
};

export const UIMesh_POPUP = (scene, target) => {
  //BABYLON.Animation.CreateAndStartAnimation('popupX', target, 'scaleX', Speed, 1, Start, End);
  //BABYLON.Animation.CreateAndStartAnimation('popupY', target, 'scaleY', Speed, 1, Start, End);

  var TargetVector = new Vector3(36, 36, 0.1);
  var Scale = new BABYLON.Animation(
    "Scale",
    "scaling",
    40,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys = [];
  keys.push({
    frame: 0,
    value: new Vector3(30, 30, 0.1),
  });
  keys.push({
    frame: 20,
    value: TargetVector,
  });
  keys.push({
    frame: 40,
    value: new Vector3(30, 30, 0.1),
  });
  Scale.setKeys(keys);
  target.animations = [];
  target.animations.push(Scale);

  return scene.beginAnimation(target, 0, 40, true);
};
