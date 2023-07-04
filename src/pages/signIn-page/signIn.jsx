import React from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "../../components/component-index";
const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className="sign-in-container">
      <h2>Sign Up</h2>
      <div className="input-container">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
      </div>
      <div className="input-button-container">
        <Button>Sign In</Button>
      </div>
      <div className="have-account-login-container">
        <p>Already have account? </p>
        <span onClick={()=>navigate("/login")}>Login</span>
      </div>
    </div>
  );
};

export { SignIn };
