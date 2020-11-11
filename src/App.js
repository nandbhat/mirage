import React from "react";
import "./App.css";
import FaceRecognition from "./scenes/FaceRecognition";
import Home from "./scenes/Home";
import NotFound from "./scenes/NotFound";
import Login from "./scenes/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Paths } from "./helpers/constants/paths";
import Auth from "./hoc/auth";
import { initAxios } from "./helpers/apis/axios";
import MainContainer from "./containers/Main";
import PoseDetection from "./scenes/PoseDetection";
import BodySegmentation from "./scenes/BodySegmentation";

initAxios();
function App() {
  return (
    <div className="App">
      <MainContainer>
        <Router>
          <Switch>
            <Route exact path={Paths.HOME} component={Auth(Home)} />
            <Route
              path={Paths.FACIAL_RECOGNITION}
              component={Auth(FaceRecognition)}
            />
            <Route path={Paths.LOGIN} component={Login} />
            <Route
              path={Paths.POSE_DETECTION}
              component={Auth(PoseDetection)}
            />
            <Route
              path={Paths.BODY_SEGMENTATION}
              component={Auth(BodySegmentation)}
            />
            <Route default component={Auth(NotFound)} />
          </Switch>
        </Router>
      </MainContainer>
    </div>
  );
}

export default App;
