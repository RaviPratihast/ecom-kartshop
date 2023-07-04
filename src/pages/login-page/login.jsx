import React from "react";
import { Button, Card } from "../../components/component-index";
const Login = () => {
  return (
    <div className="Login-container">
      <h2>Log In</h2>
      <div className="input-container">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        {/* <input type="password" placeholder="Confirm Password" /> */}
      </div>
      <div className="input-button-container">
        <Button>Log In</Button>
        <Button>Guest Login</Button>
      </div>
      <div className="have-account-login-container">
        <p>Don't have account? </p>
        <span>Sign In</span>
      </div>
    </div>
  );
};

export { Login };
