import React from "react";
import "./App.css";
import FaceRecognition from "./scenes/FaceRecognition";
import Home from "./scenes/Home";
import NotFound from "./scenes/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Paths } from "./utils/constants/paths";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={Paths.HOME} component={Home} />
          <Route path={Paths.FACIAL_RECOGNITION} component={FaceRecognition} />
          <Route default component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
