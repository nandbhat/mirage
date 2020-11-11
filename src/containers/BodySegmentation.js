import React, { useRef, useEffect } from "react";
import WebcamCanvas from "../components/WebcamCanvas";
import * as bodyPix from "@tensorflow-models/body-pix";
import { isWebCamReady } from "../helpers/utils/webcam";
import { clearCanvas } from "../helpers/utils/canvas";
require("@tensorflow/tfjs-backend-webgl");

const FaceDetection = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const isModelOn = useRef(false);

  const runBodySegmentation = async () => {
    const model = await bodyPix.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2,
    });
    setInterval(() => {
      detect(model);
    }, 100);
  };

  const detect = async (model) => {
    if (isWebCamReady(webcamRef)) {
      // Video properties
      const video = webcamRef.current.video;
      const { videoWidth: width, videoHeight: height } = video;
      webcamRef.current.video.height = height;
      webcamRef.current.video.width = width;
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.height = height;
      canvasRef.current.width = width;
      if (isModelOn.current) {
        const segmentation = await model.segmentPersonParts(video, {
          flipHorizontal: true,
          internalResolution: "medium",
          segmentationThreshold: 0.7,
        });
        console.log(segmentation);
        const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
        bodyPix.drawMask(
          canvasRef.current,
          video,
          coloredPartImage,
          0.7,
          0,
          true
        );
      } else {
        clearCanvas(height, width, ctx);
      }
    }
  };

  useEffect(() => {
    runBodySegmentation();
  }, []);

  const onSwitchChange = () => {
    isModelOn.current = !isModelOn.current;
  };
  return (
    <>
      <WebcamCanvas
        webcamRef={webcamRef}
        canvasRef={canvasRef}
        modelOnMsg={"Show Segments"}
        modelOffMsg={"Hide Segments"}
        switchChange={onSwitchChange}
        modelName={"Body Segmentation"}
      />
    </>
  );
};

export default FaceDetection;
