import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";
import { Button } from "../../components/component-index";
const Login = () => {
  const navigate = useNavigate();
  const { stateAuth, dispatchAuth } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const isUserPresent = stateAuth.users.find(
      (registeredUser) =>
        registeredUser.user === username && registeredUser.password === password
    );
    if (isUserPresent) {
      dispatchAuth({ type: "USER_LOGGED_IN", payload: { loggedIn: true } });
      const defaultPathName = "/shop";
      navigate(location?.state?.from?.pathname || defaultPathName, {
        replace: true,
      });
      toast.success("Logged in successful!");
    } else {
      toast.error("Wrong Password,try again!");
    }
  }
  function handleGuestLogin() {
    dispatchAuth({ type: "GUEST_USER_LOGGED_IN", payload: { loggedIn: true } });
    const defaultPathName = "/shop";
    navigate(location?.state?.from?.pathname || defaultPathName, {
      replace: true,
    });
    toast.success("Welcome,Guest");
  }
  return (
    <div className="Login-container">
      <h2>Log In</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="input-button-container">
        <Button onClick={() => handleLogin()}>Log In</Button>
        <Button onClick={() => handleGuestLogin()}>Guest Login</Button>
      </div>
      <div className="have-account-login-container">
        <p>Don't have account? </p>
        <span onClick={() => navigate("/signIn")}>Sign In</span>
      </div>
    </div>
  );
};

export { Login };
