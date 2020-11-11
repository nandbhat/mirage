import React, { useRef, useEffect } from "react";
import WebcamCanvas from "../components/WebcamCanvas";
import * as posenet from "@tensorflow-models/posenet";
import { drawSkeleton, drawKeypoints } from "../helpers/utils/drawPose";
import { isWebCamReady } from "../helpers/utils/webcam";
import { drawCanvas, clearCanvas } from "../helpers/utils/canvas";

require("@tensorflow/tfjs-backend-webgl");

const FaceDetection = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const isModelOn = useRef(false);

  const runPoseNet = async () => {
    const model = await posenet.load({
      architecture: "MobileNetV1",
      // outputStride: 16,
      multiplier: 0.75,
      inputResolution: {
        width: 640 / 2,
        height: 480 / 2,
      },
      quantBytes: 2,
      scale: 0.5,
    });

    setInterval(() => {
      detect(model);
    }, 100);
  };

  const drawPose = (predictions, ctx) => {
    console.log("Log NB draw pose", predictions);
    drawKeypoints(predictions["keypoints"], 0.6, ctx);
    drawSkeleton(predictions["keypoints"], 0.6, ctx);
  };

  const detect = async (model) => {
    if (isWebCamReady(webcamRef)) {
      const video = webcamRef.current.video;
      const { videoWidth: width, videoHeight: height } = video;
      webcamRef.current.video.height = height;
      webcamRef.current.video.width = width;
      const ctx = canvasRef.current.getContext("2d");
      if (isModelOn?.current) {
        const predictions = await model.estimateSinglePose(video, {
          flipHorizontal: true,
        });
        drawCanvas(predictions, drawPose, height, width, ctx, canvasRef);
      } else {
        clearCanvas(height, width, ctx);
      }
    }
  };

  useEffect(() => {
    runPoseNet();
  }, []);

  const switchChange = () => {
    isModelOn.current = !isModelOn.current;
  };
  return (
    <>
      <WebcamCanvas
        webcamRef={webcamRef}
        canvasRef={canvasRef}
        modelOnMsg={"Show Pose"}
        modelOffMsg={"Hide Pose"}
        switchChange={switchChange}
        modelName={"Pose Detection"}
      />
    </>
  );
};

export default FaceDetection;
