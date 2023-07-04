import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, Card } from "../../components/component-index";
import { useAuth } from "../../context/auth-context";
const SignIn = () => {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  function handleSignIn() {
    if (
      username !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      const signInData = {
        user: username,
        password: password,
      };
      dispatchAuth({ type: "SIGN_IN", payload: signInData });
      toast.success("Signed In Successful,Try Login now!");
      setSignedIn((prev) => !prev);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  }
  function handleChange(event) {
    if (event.target.placeholder === "Username") {
      setUsername(event.target.value);
    } else if (event.target.placeholder === "Password") {
      setPassword(event.target.value);
    } else if (event.target.placeholder === "Confirm Password") {
      setConfirmPassword(event.target.value);
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Sign Up</h2>
      <div className="input-container">
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(event) => handleChange(event)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => handleChange(event)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => handleChange(event)}
        />
      </div>
      <div className="input-button-container">
        <Button onClick={() => handleSignIn()}>Sign In</Button>
      </div>
      <div className="have-account-login-container">
        <p>Already have account? </p>
        <span onClick={() => navigate("/login")}>Login</span>
      </div>
    </div>
  );
};

export { SignIn };
