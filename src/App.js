import "./App.css";
import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import {
  Cart,
  Home,
  Login,
  Shop,
  ProductDetails,
  SignIn,
  Wishlist,
} from "./pages/page-index";
import { useAuth } from "./context/auth-context";
import { useProduct } from "./context/ecom-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiresAuth from "./requiresAuth";

function App() {
  const { dispatch } = useProduct();
  const { stateAuth, dispatchAuth } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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
  function handleSearchInput(event) {
    if (event.target.value === "") {
      dispatch({ type: "RESET_SEARCH" });
    }
    setSearch(event.target.value);
  }

  function handleSearchClick(event) {
    dispatch({ type: "SEARCH", payload: search });
  }

  function handleLoginLogout(event) {
    if (event.target.innerHTML === "logout") {
      dispatchAuth({ type: "USER_LOGOUT" });
      navigate("/login");
      toast.success("Logged Out");
    }
    if (event.target.innerHTML === "login") {
      navigate("/login");
    }
  }
  return (
    <div className="App">
      <nav className="App-header">
        <div className="nav-container">
          <div className="nav-left">
            {/* <NavLink style={getActiveStyle} to="/">
            </NavLink> */}
            <h1> Kartshop</h1>
          </div>
          {/* nav search */}
          <div className="nav-search">
            <input
              className="input nav-search-input"
              placeholder="Search.."
              value={search}
              onChange={(event) => handleSearchInput(event)}
            />
            <i
              className="material-icons search-icon"
              onClick={() => handleSearchClick()}
            >
              search
            </i>
          </div>

          <div className="navbar-right">
            <NavLink style={getActiveStyle} to="/shop">
              <i className="material-icons icon">explore</i>
            </NavLink>
            <NavLink style={getActiveStyle} to="/wishlist">
              <i className="material-icons icon">favorite</i>
            </NavLink>
            <NavLink style={getActiveStyle} to="/cart">
              <div className="icon-container">
                <i className="material-icons icon-shop icon">shopping_cart</i>
                <div className="badge"></div>
              </div>
            </NavLink>
            <div
              className="nav-login-logout"
              onClick={(event) => handleLoginLogout(event)}
            >
              {stateAuth.loggedIn ? (
                <i className="material-icons icon">logout</i>
              ) : (
                <i className="material-icons icon">login</i>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="product/:productDetailsId"
            element={<ProductDetails />}
          />

          <Route
            path="/wishlist"
            element={
              <RequiresAuth>
                <Wishlist />
              </RequiresAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequiresAuth>
                <Cart />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </main>
      <ToastContainer autoClose={700} />
    </div>
  );
}

export default App;
