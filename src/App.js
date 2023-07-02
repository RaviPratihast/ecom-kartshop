import "./App.css";
import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import {
  Cart,
  Home,
  Login,
  Shop,
  ProductDetails,
  SignIn,
  Wishlist,
} from "./pages/page-index";
import { useProduct } from "./context/ecom-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getActiveStyle = ({ isActive }) => {
  return {
    display: "flex",
    justifyContent: "center",
    color: "white",
    textDecoration: isActive ? "underline" : "none",
    padding: "0.3em",
    fontSize: "1.2rem",
    textUnderlineOffset: "0.4em",
  };
};
function App() {
  const { state } = useProduct();
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-container">
          <nav className="nav-links">
            <NavLink style={getActiveStyle} to="/">
              <h1> KS</h1>
            </NavLink>
            <NavLink style={getActiveStyle} to="/shop">
              <i className="material-icons">explore</i>
            </NavLink>
            <NavLink style={getActiveStyle} to="/wishlist">
              <i className="material-icons">favorite</i>
            </NavLink>
            <NavLink style={getActiveStyle} to="/cart">
              <div className="icon-container">
                <i className="material-icons icon-shop ">shopping_cart</i>
                <div className="badge"></div>
              </div>
            </NavLink>
          </nav>

          <div className="nav-search-login">
            <div className="nav-search">
              <input
                className="input nav-search-input"
                placeholder="Search.."
              />
              <i className="material-icons search-icon icon">search</i>
            </div>
            <div className="nav-login">
              <i className="material-icons">login</i>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="product/:productDetailsId" element={<ProductDetails />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </main>
      <ToastContainer autoClose={700} />
    </div>
  );
}

export default App;
