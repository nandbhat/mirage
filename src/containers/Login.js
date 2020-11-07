import React, { useState } from "react";
import { connect } from "react-redux";
import { login as loginAction } from "../redux/actions";
import { Input } from "antd";
import isEmpty from "lodash/isEmpty";
import "./LoginStyles.scss";

const Login = ({ login }) => {
  const [passcode, setPasscode] = useState(null);

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handlePasscodeEnter = () => {
    if (!isEmpty(passcode?.trim())) {
      login(passcode.trim());
    }
  };

  return (
    <div className="login">
      <div className="login__input">
        <Input.Password
          placeholder="Enter passcode and hit enter"
          size="large"
          onChange={handlePasscodeChange}
          value={passcode}
          onPressEnter={handlePasscodeEnter}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (passcode) => dispatch(loginAction(passcode)),
});
export default connect(null, mapDispatchToProps)(Login);
