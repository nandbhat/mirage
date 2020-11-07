/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Login from "../scenes/Login";

export default function (ComposedComponent) {
  const Auth = ({ isAuthenticated }) => {
    if (isAuthenticated) {
      return <ComposedComponent />;
    } else {
      return <Login />;
    }
  };
  const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
  });

  return connect(mapStateToProps)(withRouter(Auth));
}
