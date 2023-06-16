import "./App.css";
import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

import { Button } from "./components/component-index";
import { Cart, Home, Login, Shop, SignIn, Wishlist } from "./pages/page-index";
import { colors } from "@mui/material";

const getActiveStyle = ({ isActive }) => {
  return {
    display: "flex",
    justifyContent: "center",
    color: "white",
    textDecoration: isActive ? "underline" : "none",
    padding: "0.3em",
    fontSize: "1.2rem",
    textUnderlineOffset: "0.4em",
    // border: "0.1em solid white",
  };
};
function App() {
  // const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-container">
          {/* <i class="material-icons menu-icon">menu</i> */}
          <nav className="nav-links">
            <NavLink style={getActiveStyle} to="/">
              <h1> KS</h1>
            </NavLink>
            <NavLink style={getActiveStyle} to="/shop">
              <i class="material-icons">explore</i>
            </NavLink>
            <NavLink style={getActiveStyle} to="/wishlist">
              <i class="material-icons">favorite</i>
            </NavLink>
            <NavLink style={getActiveStyle} to="/cart">
              <i class="material-icons">shopping_cart</i>
            </NavLink>
          </nav>

          <div className="nav-search-login">
            <div className="nav-search">
              <input
                className="input nav-search-input"
                placeholder="Search.."
              />
              <i class="material-icons search-icon icon">search</i>
            </div>
            <div className="nav-login">
              <i class="material-icons">login</i>
            </div>
          </div>

          {/* <Button>Button</Button> */}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
