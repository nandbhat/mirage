import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "../components/LoadingOverlay";
import "./MainStyles.scss";
const Main = ({ children, loadingCount }) => {
  return (
    <LoadingOverlay isLoading={loadingCount > 0}>{children}</LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  loadingCount: state?.loadingCount,
});
export default connect(mapStateToProps)(Main);
