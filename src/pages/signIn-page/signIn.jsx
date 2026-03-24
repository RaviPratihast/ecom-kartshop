import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../../components/component-index";
import { useAuth } from "../../context/auth-context";
const SignIn = () => {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password must match");
    } else {
      toast.error("Please fill all required fields");
    }
  }

  return (
    <section className="signup-page">
      <div className="signup-form-panel">
        <div className="signup-form-card">
          <div className="auth-heading">
            <h2>Create account</h2>
            <p>Set up your account to save wishlist and cart items.</p>
          </div>
          <div className="auth-input-container">
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              type="text"
              value={username}
              placeholder="Choose a username"
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className="auth-button-container">
            <Button onClick={() => handleSignIn()} size="lg">
              Sign Up
            </Button>
          </div>
          <div className="auth-switch-container">
            <p>Already have an account?</p>
            <button type="button" onClick={() => navigate("/login")}>
              Log In
            </button>
          </div>
        </div>
      </div>

      <div className="signup-visual-panel">
        <img
          className="visual-bg-art"
          src="/image/undraw_add-to-cart_c8f2.svg"
          alt=""
          aria-hidden="true"
        />
        <div className="signup-visual-overlay">
          <h3>Create your account quickly.</h3>
          <p>
            Save products, track your wishlist, and enjoy faster checkout on
            every visit.
          </p>
        </div>
      </div>
    </section>
  );
};

export { SignIn };
