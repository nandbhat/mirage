import React from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../containers/Dashboard";

const Home = ({ history }) => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default withRouter(Home);
