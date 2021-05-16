import React, { Component } from "react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import * as GUI from "babylonjs-gui";
import BabylonScene from "./BabylonScene.jsx";
import { Vector2, Vector3, Quaternion, Matrix, BasisTranscodeConfiguration, ImageProcessingPostProcess, MeshBuilder } from "babylonjs";

export default class WebGLDebug
{
      constructor()
      {
        console.log("Salin Singleton construct");
      }
      static Instance = new WebGLDebug();
      DebugGPUFrame = function(engine)
      {
          // Instrumentation
          var instrumentation = new BABYLON.EngineInstrumentation(engine);
          instrumentation.captureGPUFrameTime = true;
          instrumentation.captureShaderCompilationTime = true;

          // GUI
          var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
          var stackPanel = new GUI.StackPanel();
          stackPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;   
          stackPanel.isVertical = true;
          advancedTexture.addControl(stackPanel);   
          
          var text1 = new GUI.TextBlock();
          text1.text = "";
          text1.color = "white";
          text1.fontSize = 16;
          text1.height = "30px";
          stackPanel.addControl(text1);       

          var text2 = new GUI.TextBlock();
          text2.text = "";
          text2.color = "white";
          text2.fontSize = 16;
          text2.height = "30px";
          stackPanel.addControl(text2);       
          while(true)
          {
            text1.text = "current frame time (GPU): " + (instrumentation.gpuFrameTimeCounter.current * 0.000001).toFixed(2) + "ms";
            text2.text = "average frame time (GPU): " + (instrumentation.gpuFrameTimeCounter.average * 0.000001).toFixed(2) + "ms";            
          }
      }
      
}