import React, { useRef } from "react";
import { Switch } from "antd";

import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import "./FaceRecognitionStyles.scss";
import { drawMesh } from "../helpers/facemesh/drawFacemesh";
require("@tensorflow/tfjs-backend-webgl");

const FaceDetection = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const showLandmarksRef = useRef(false);

  const runFacialLandmarkDetection = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      {
        maxFaces: 1,
        shouldLoadIrisModel: true,
      }
    );

    setInterval(() => {
      detect(model);
    }, 10);
  };

  const detect = async (model) => {
    if (webcamRef.current && webcamRef?.current?.video?.readyState === 4) {
      // Video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const ctx = canvasRef.current.getContext("2d");
      //Make detections
      if (showLandmarksRef.current) {
        const predictions = await model.estimateFaces({
          input: video,
          flipHorizontal: true,
        });
        drawMesh(predictions, ctx);
      } else {
        ctx.clearRect(0, 0, videoWidth, videoHeight);
      }
    }
  };

  runFacialLandmarkDetection();
  return (
    <>
      <div className="facerecognition">
        <div className="facerecognition__container">
          <div className="heading-2">Facial Landmark Detection</div>
          <div className="facerecognition__container__overlay">
            <Webcam
              ref={webcamRef}
              className="facerecognition__container__overlay__webcam"
              mirrored
            />
            <canvas
              ref={canvasRef}
              className="facerecognition__container__overlay__canvas"
            />
          </div>
          <Switch
            onChange={() => {
              // .current = !showLandmarksRef?.current;
              showLandmarksRef.current = !showLandmarksRef.current;
            }}
            checkedChildren="Show Landmark"
            unCheckedChildren="Hide Landmark"
          />
        </div>
      </div>
    </>
  );
};

export default FaceDetection;
