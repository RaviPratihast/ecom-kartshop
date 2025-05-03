import "./App.css";
import React, { useState } from "react";
import {
  NavLink,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import { FiMenu, FiX } from "react-icons/fi";
import {
  FiShoppingCart,
  FiHeart,
  FiCompass,
  FiSearch,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

function App() {
  const { state, dispatch } = useProduct();
  const { stateAuth, dispatchAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = location.pathname === "/shop";
  const isLandingPage = location.pathname === "/";

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

  function handleLoginLogout() {
    if (stateAuth.loggedIn) {
      // Clear cart and wishlist if it's a guest user
      if (stateAuth.isGuestUser) {
        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "REMOVE_ALL_FROM_WISHLIST" });
      }
      dispatchAuth({ type: "USER_LOGOUT" });
      navigate("/");
      toast.success("Logged Out Successfully");
    } else {
      navigate("/login");
    }
  }
  return (
    <div className="App">
      <nav className="App-header">
        <div className="nav-container">
          <div className="nav-left">
            <h1> Kartshop</h1>
          </div>

          {isHome && (
            <div className="nav-search">
              <input
                className="input nav-search-input"
                placeholder="Search.."
                value={search}
                onChange={(event) => handleSearchInput(event)}
              />
              <FiSearch
                className="search-icon"
                onClick={() => handleSearchClick()}
              />
            </div>
          )}

          <div className="navbar-right">
            {!isLandingPage && (
              <>
                <NavLink style={getActiveStyle} to="/shop">
                  <FiCompass className="icon" />
                </NavLink>
                <NavLink style={getActiveStyle} to="/wishlist">
                  <div className="icon-container">
                    <FiHeart className="icon" />
                    {state.wishlist.length !== 0 && (
                      <div className="badge">{state.wishlist.length}</div>
                    )}
                  </div>
                </NavLink>
                <NavLink style={getActiveStyle} to="/cart">
                  <div className="icon-container">
                    <FiShoppingCart className="icon" />
                    {state.cart.length !== 0 && (
                      <div className="badge">{state.cart.length}</div>
                    )}
                  </div>
                </NavLink>
              </>
            )}
            <div className="nav-login-logout" onClick={handleLoginLogout}>
              {stateAuth.loggedIn ? (
                <FiLogOut className="icon" />
              ) : (
                <FiLogIn className="icon" />
              )}
            </div>
          </div>

          {/* Hamburger Menu Icon */}
          <div
            className="hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FiX className="icon" />
            ) : (
              <FiMenu className="icon" />
            )}
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
            {!isLandingPage && (
              <>
                <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                  <FiCompass className="icon" />
                  <span>Explore</span>
                </NavLink>
                <NavLink
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="icon-container">
                    <FiHeart className="icon" />
                    {state.wishlist.length !== 0 && (
                      <div className="badge">{state.wishlist.length}</div>
                    )}
                  </div>
                  <span>Wishlist</span>
                </NavLink>
                <NavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="icon-container">
                    <FiShoppingCart className="icon" />
                    {state.cart.length !== 0 && (
                      <div className="badge">{state.cart.length}</div>
                    )}
                  </div>
                  <span>Cart</span>
                </NavLink>
                <div
                  className="nav-login-logout"
                  onClick={() => {
                    handleLoginLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {stateAuth.loggedIn ? (
                    <>
                      <FiLogOut className="icon" />
                      <span>Logout</span>
                    </>
                  ) : (
                    <>
                      <FiLogIn className="icon" />
                      <span>Login</span>
                    </>
                  )}
                </div>
              </>
            )}
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
