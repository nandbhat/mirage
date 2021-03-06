import React, { useRef, useEffect } from "react";
import WebcamCanvas from "../components/WebcamCanvas";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { isWebCamReady } from "../helpers/utils/webcam";
import { clearCanvas, drawCanvas } from "../helpers/utils/canvas";
import { drawFace } from "../helpers/utils/drawFaceLandmarks";
require("@tensorflow/tfjs-backend-webgl");

const FaceDetection = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const isModelOn = useRef(false);

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
    if (isWebCamReady(webcamRef)) {
      // Video properties
      const video = webcamRef.current.video;
      const { videoWidth: width, videoHeight: height } = video;
      webcamRef.current.video.height = height;
      webcamRef.current.video.width = width;
      const ctx = canvasRef.current.getContext("2d");
      if (isModelOn.current) {
        const predictions = await model.estimateFaces({
          input: video,
          flipHorizontal: true,
        });
        drawCanvas(predictions, drawFace, height, width, ctx, canvasRef);
      } else {
        clearCanvas(height, width, ctx);
      }
    }
  };

  useEffect(() => {
    runFacialLandmarkDetection();
  }, []);

  const onSwitchChange = () => {
    isModelOn.current = !isModelOn.current;
  };
  return (
    <>
      <WebcamCanvas
        webcamRef={webcamRef}
        canvasRef={canvasRef}
        modelOnMsg={"Show Landmarks"}
        modelOffMsg={"Hide Landmarks"}
        switchChange={onSwitchChange}
        modelName={"Facial Landmark Detection"}
      />
    </>
  );
};

export default FaceDetection;
