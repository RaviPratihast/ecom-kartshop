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
    <section className="login-page">
      <div className="login-form-panel">
        <div className="login-form-card">
          <div className="auth-heading">
            <h2>Welcome back!</h2>
            <p>Log in to continue shopping and manage your cart.</p>
          </div>
          <div className="auth-input-container">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="auth-button-container">
            <Button onClick={() => handleLogin()} size="lg">
              Log In
            </Button>
            <Button onClick={() => handleGuestLogin()} variant="secondary" size="lg">
              Guest Login
            </Button>
          </div>
          <div className="auth-switch-container">
            <p>New to Kartshop?</p>
            <button type="button" onClick={() => navigate("/signIn")}>
              Create account
            </button>
          </div>
        </div>
      </div>

      <div className="login-visual-panel">
        <img
          className="visual-bg-art"
          src="/image/undraw_add-to-cart_c8f2.svg"
          alt=""
          aria-hidden="true"
        />
        <div className="login-visual-overlay">
          <h3>Shop smarter. Save faster.</h3>
          <p>
            Build your cart, track favorites, and check out quickly with a
            clean shopping experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Login };
