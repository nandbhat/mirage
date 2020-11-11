export const drawCanvas = (input, action, height, width, ctx, canvasRef) => {
  canvasRef.current.width = width;
  canvasRef.current.height = height;
  action(input, ctx);
};

export const clearCanvas = (height, width, ctx) => {
  ctx.clearRect(0, 0, width, height);
};
