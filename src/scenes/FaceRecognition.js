import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import "./FaceRecogntion.scss";
import { drawMesh } from "../utils/drawFacemesh";
const FaceDetection = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
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

      //Make detections
      const face = await net.estimateFaces(video);
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };
  runFacemesh();
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "1vh",
          width: "1vw",
        }}
      >
        <Webcam ref={webcamRef} className="webcam" />
        <canvas ref={canvasRef} className="webcam" />
      </div>
    </>
  );
};

export default FaceDetection;
