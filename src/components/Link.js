import React from "react";
import { withRouter } from "react-router-dom";
import "./LinkStyles.scss";

const Link = ({ name, path, history }) => {
  const onClickHandler = () => {
    history.push(path);
  };
  return (
    <div className="link" onClick={onClickHandler}>
      {name}
    </div>
  );
};

export default withRouter(Link);
