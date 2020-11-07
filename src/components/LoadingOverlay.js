import React from "react";
import { Spin } from "antd";
import "./LoadingOverlayStyles.scss";

const LoadingOverlay = ({ children, isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="spinner">
          <Spin />
        </div>
      )}
      <>{children}</>
    </>
  );
};

export default LoadingOverlay;
