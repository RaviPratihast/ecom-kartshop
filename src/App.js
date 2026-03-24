import "./App.css";
import React, { useEffect, useState } from "react";
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
import {
  Compass,
  Heart,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";

function App() {
  const { state, dispatch } = useProduct();
  const { stateAuth, dispatchAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = location.pathname === "/shop";
  const isLandingPage = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signIn";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  function handleSearchInput(event) {
    if (event.target.value === "") {
      dispatch({ type: "RESET_SEARCH" });
    }
    setSearch(event.target.value);
  }

  function handleSearchClick() {
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
            <Store className="brand-icon" />
            <h1>Kartshop</h1>
          </div>

          {isHome && (
            <div className="nav-search" role="search">
              <input
                className="input nav-search-input"
                placeholder="Search products"
                value={search}
                onChange={(event) => handleSearchInput(event)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
              <button
                type="button"
                className="search-button"
                onClick={() => handleSearchClick()}
                aria-label="search products"
              >
                <Search className="search-icon" />
              </button>
            </div>
          )}

          <div className="navbar-right">
            {!isLandingPage && !isAuthPage && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `nav-icon-link ${isActive ? "nav-icon-link-active" : ""}`
                  }
                  to="/shop"
                >
                  <Compass className="icon" />
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `nav-icon-link ${isActive ? "nav-icon-link-active" : ""}`
                  }
                  to="/wishlist"
                >
                  <div className="icon-container">
                    <Heart className="icon" />
                    {state.wishlist.length !== 0 && (
                      <div className="badge">{state.wishlist.length}</div>
                    )}
                  </div>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `nav-icon-link ${isActive ? "nav-icon-link-active" : ""}`
                  }
                  to="/cart"
                >
                  <div className="icon-container">
                    <ShoppingCart className="icon" />
                    {state.cart.length !== 0 && (
                      <div className="badge">{state.cart.length}</div>
                    )}
                  </div>
                </NavLink>
              </>
            )}
            {!isAuthPage && (
              <div className="nav-login-logout" onClick={handleLoginLogout}>
                {stateAuth.loggedIn ? (
                  <LogOut className="icon" />
                ) : (
                  <LogIn className="icon" />
                )}
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          {!isLandingPage && !isAuthPage && (
            <div
              className="hamburger-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="icon" />
              ) : (
                <Menu className="icon" />
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
            {!isLandingPage && !isAuthPage && (
              <>
                <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                  <Compass className="icon" />
                  <span>Explore</span>
                </NavLink>
                <NavLink
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="icon-container">
                    <Heart className="icon" />
                    {state.wishlist.length !== 0 && (
                      <div className="badge">{state.wishlist.length}</div>
                    )}
                  </div>
                  <span>Wishlist</span>
                </NavLink>
                <NavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="icon-container">
                    <ShoppingCart className="icon" />
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
                      <LogOut className="icon" />
                      <span>Logout</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="icon" />
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
