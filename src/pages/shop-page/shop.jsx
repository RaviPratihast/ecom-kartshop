import React from "react";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";
import { toast } from "react-toastify";
const Shop = () => {
  const { state, dispatch } = useProduct();
  return (
    <div className="filter-product-container">
      <div className="filters-container">
        <div className="filters">
          <div className="heading-filters">
            <h3>Filters</h3>

            {/* there will one button that will remove if any filter is applied */}
            <Button onClick={() => console.log("hello dispatch")}>Clear</Button>
          </div>
        </div>
        <div className="price-filter">
          <h4>Price Range</h4>
          <div className="price-filter-input-container">
            <span className="range-initials">0</span>
            <input
              className="custom-range"
              type="range"
              min={0}
              max={6000}
              step={1}
              // value={state.maxPrice}
              // onChange={handleChangeInput}
            />
            <span className="range-finals">100</span>
          </div>
        </div>
        <div className="sort-filter">
          <label>Sort By</label>
          <div className="sort-filter-button-container">
            <Button
              // className="card-add-to-cart-button sort-button"
              onClick={() => dispatch({ type: "HIGH_TO_LOW" })}
            >
              Price-High to low
            </Button>
            <Button
            // className="card-add-to-cart-button sort-button"
            // onClick={() => dispatch({ type: "LOW_TO_HIGH" })}
            >
              Price-Low to high
            </Button>
          </div>
        </div>
        <div className="rating-filter-container">
          <label className="label-filter-rating" htmlFor="rating-filter">
            Filter by Rating
          </label>
          <select
            className="rating-filter"
            // value={state.filterRating}
            // onChange={handleChangeRating}
          >
            <option className="option-selection" value="0">
              All
            </option>
            <option className="option-selection" value="2">
              1 Stars and above
            </option>
            <option className="option-selection" value="3">
              2 Stars and Above
            </option>
            <option className="option-selection" value="4">
              3 Stars and Above
            </option>
            <option className="option-selection" value="5">
              4 Stars and Above
            </option>
          </select>
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
                    onClick={() => {
                      dispatch({ type: "ADD_TO_CART", payload: id });
                      toast.success("Added To Cart");
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch({ type: "ADD_TO_WISHLIST", payload: id });
                      toast.success("Added To Wishlist");
                    }}
                  >
                    <span className="material-icons favorite-icon">
                      favorite
                    </span>
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
