import React from "react";
import Link from "../components/Link";
import { Paths } from "../helpers/constants/paths";
import "./DashboardStyles.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <div className="dashboard__content__column">
          <div className="dashboard__content__column__header">
            Tensorflow.js Models
          </div>
          <Link
            name="Facial Landmark Detection"
            path={Paths.FACIAL_RECOGNITION}
          />
          <Link name="Pose Detection" path={Paths.POSE_DETECTION} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
