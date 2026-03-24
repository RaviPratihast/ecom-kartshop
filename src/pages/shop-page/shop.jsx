import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useProduct();
  const { stateAuth } = useAuth();
  const [mobilePanel, setMobilePanel] = useState(null);

  function itemIsPresent(id) {
    return state.wishlist.some((arrItem) => {
      return arrItem.id === id;
    });
  }

  function itemIsPresentInCart(id) {
    return state.cart.some((cartItem) => cartItem.id === id);
  }
  function handleChangeInput(e) {
    const eventTargetValue = Number(e.target.value);
    dispatch({ type: "SET_RANGE", payload: eventTargetValue });
  }

  function handleSort(sortType) {
    dispatch({ type: sortType });
    setMobilePanel(null);
  }

  function handleAddToCart(id) {
    if (stateAuth.loggedIn) {
      if (itemIsPresentInCart(id)) {
        navigate("/cart");
      } else {
        dispatch({ type: "ADD_TO_CART", payload: id });
        toast.success("Added To Cart");
      }
    } else {
      navigate("/login");
    }
  }

  function handleAddToWishlist(id) {
    if (stateAuth.loggedIn) {
      if (itemIsPresent(id)) {
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
        toast.success("Item Removed From Wishlist");
      } else {
        dispatch({ type: "ADD_TO_WISHLIST", payload: id });
        toast.success("Added To Wishlist");
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="filter-product-container">
      <div className="filters-container">
        <div className="mobile-filter-toolbar">
          <button
            type="button"
            className={`mobile-toolbar-button ${
              mobilePanel === "sort" ? "active" : ""
            }`}
            onClick={() =>
              setMobilePanel((prev) => (prev === "sort" ? null : "sort"))
            }
          >
            <ArrowUpDown size={16} />
            Sort
          </button>
          <button
            type="button"
            className={`mobile-toolbar-button ${
              mobilePanel === "filters" ? "active" : ""
            }`}
            onClick={() =>
              setMobilePanel((prev) => (prev === "filters" ? null : "filters"))
            }
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>
        </div>

        <div
          className={`mobile-panel mobile-panel-sort ${
            mobilePanel === "sort" ? "open" : ""
          }`}
        >
          <div className="sort-filter">
            <label>Sort By</label>
            <div className="sort-filter-button-container">
              <Button
                onClick={() => handleSort("HIGH_TO_LOW")}
                variant="secondary"
                className={
                  `sort-button ${
                    state.sortOrder === "HIGH_TO_LOW" ? "sort-button-active" : ""
                  }`
                }
              >
                Price-High to low
              </Button>
              <Button
                onClick={() => handleSort("LOW_TO_HIGH")}
                variant="secondary"
                className={
                  `sort-button ${
                    state.sortOrder === "LOW_TO_HIGH" ? "sort-button-active" : ""
                  }`
                }
              >
                Price-Low to high
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`mobile-panel mobile-panel-filters ${
            mobilePanel === "filters" ? "open" : ""
          }`}
        >
          <div className="filters">
            <div className="heading-filters">
              <h3>Filters</h3>

              <Button
                onClick={() => {
                  dispatch({ type: "CLEAR_FILTERS" });
                  setMobilePanel(null);
                }}
                variant="ghost"
                size="sm"
              >
                Clear
              </Button>
            </div>
            <div className="price-filter">
              <h4>Price Range</h4>
              <div className="price-filter-input-container">
                <span className="range-initials">{state.minPrice}</span>
                <input
                  className="custom-range"
                  type="range"
                  min={0}
                  max={6000}
                  step={1}
                  value={state.maxPrice}
                  onChange={handleChangeInput}
                />
                <span className="range-finals">{state.maxPrice}</span>
              </div>
            </div>
            <div className="rating-filter-container">
              <label className="label-filter-rating" htmlFor="rating-filter">
                Filter by Rating
              </label>
              <select
                className="rating-filter"
                value={state.filterRating}
                onChange={(event) => {
                  dispatch({
                    type: "FILTER_BY_RATING",
                    payload: parseFloat(event.target.value),
                  });
                  setMobilePanel(null);
                }}
              >
                <option className="option-selection" value="0">
                  All
                </option>
                <option className="option-selection" value="2">
                  2 Stars and Above
                </option>
                <option className="option-selection" value="3">
                  3 Stars and Above
                </option>
                <option className="option-selection" value="4">
                  4 Stars and Above
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="products-container">
        {state.product.map(
          ({ id, name, rating, image, originalPrice, price }) => {
            return (
              <Card
                key={id}
                id={id}
                name={name}
                rating={rating}
                image={image}
                originalPrice={originalPrice}
                price={price}
                label="product"
              >
                <div className="add-cart-wishlist-container">
                  <Button
                    onClick={() => handleAddToCart(id)}
                    className="card-button-add"
                    size="sm"
                  >
                    {itemIsPresentInCart(id) ? "Go To Cart" : "Add To Cart"}
                  </Button>

                  <Button
                    onClick={() => handleAddToWishlist(id)}
                    className="card-button-wishlist"
                    size="sm"
                    variant="secondary"
                  >
                    {itemIsPresent(id) ? (
                      <span className="material-icons favorite-icon-active">
                        favorite
                      </span>
                    ) : (
                      <span className="material-icons favorite-icon">
                        favorite
                      </span>
                    )}
                  </Button>
                </div>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
};

export { Shop };
