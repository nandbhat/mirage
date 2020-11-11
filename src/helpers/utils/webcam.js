export const isWebCamReady = (webcamRef) => {
  return Boolean(
    webcamRef?.current && webcamRef?.current?.video?.readyState === 4
  );
};
