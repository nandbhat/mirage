import React from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { Paths } from "../helpers/constants/paths";
const Home = ({ history }) => {
  return (
    <>
      <div style={{ display: "grid", height: "100vh", placeItems: "center" }}>
        <Button
          type="primary"
          onClick={() => {
            history.push(Paths.FACIAL_RECOGNITION);
          }}
        >
          Face Detection
        </Button>
      </div>
    </>
  );
};

export default withRouter(Home);
