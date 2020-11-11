import React from "react";
import { Switch } from "antd";
import Webcam from "react-webcam";
import "./WebcamCanvasStyles.scss";

const WebcamCanvas = ({
  webcamRef,
  canvasRef,
  switchChange,
  modelOnMsg,
  modelOffMsg,
  modelName,
}) => {
  return (
    <div className="model">
      <div className="model__container">
        <div className="heading-2">{modelName}</div>
        <div className="model__container__overlay">
          <Webcam
            ref={webcamRef}
            className="model__container__overlay__webcam"
            mirrored
          />
          <canvas
            ref={canvasRef}
            className="model__container__overlay__canvas"
          />
        </div>
        <Switch
          onChange={switchChange}
          checkedChildren={modelOnMsg}
          unCheckedChildren={modelOffMsg}
        />
      </div>
    </div>
  );
};

export default WebcamCanvas;
