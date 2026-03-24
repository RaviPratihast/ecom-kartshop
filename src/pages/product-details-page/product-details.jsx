import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/component-index";
import { useProduct } from "../../context/ecom-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const ProductDetails = () => {
  const { productDetailsId } = useParams();
  const { state, dispatch } = useProduct();
  const { stateAuth } = useAuth();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("M");

  const product = useMemo(
    () => state.product.find((item) => item.id === productDetailsId),
    [productDetailsId, state.product]
  );

  const relatedProducts = useMemo(
    () =>
      state.product
        .filter((item) => item.id !== productDetailsId)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4),
    [productDetailsId, state.product]
  );

  const ratingBreakdown = [
    { stars: 5, count: 58 },
    { stars: 4, count: 18 },
    { stars: 3, count: 9 },
    { stars: 2, count: 4 },
    { stars: 1, count: 2 },
  ];

  const reviewData = {
    reviewer: "Alex Matheo",
    reviewDate: "15 Oct 2024",
    title: "Great fit and premium feel",
    body: "Fabric is breathable and stitching is solid. Works well for everyday wear and holds shape after multiple washes.",
  };

  function itemIsPresentInCart(id) {
    return state.cart.some((cartItem) => cartItem.id === id);
  }

  function itemIsPresent(id) {
    return state.wishlist.some((arrItem) => {
      return arrItem.id === id;
    });
  }

  if (!product) {
    return (
      <section className="product-page not-found-state">
        <h1>Product not found</h1>
        <p>The item may have been removed or the link is no longer valid.</p>
        <Button onClick={() => navigate("/shop")} className="product-add-to-cart-button">
          Back To Shop
        </Button>
      </section>
    );
  }

  const discount = Math.max(
    0,
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  );
  const averageRating = product.rating.toFixed(1);
  const totalReviews = ratingBreakdown.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <section className="product-page">
      <div className="product-detail-container">
        <div className="product-detail-left-container">
          <div className="hero-image-wrap">
            <img src={product.image} alt={product.name} className="hero-image" />
          </div>
          <div className="thumbnail-row" aria-label="product image previews">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                className="thumbnail-button"
                type="button"
                aria-label={`View product image ${index + 1}`}
              >
                <img src={product.image} alt={`${product.name} preview`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-right-container">
          <p className="product-meta">Main Fabric</p>
          <h1>{product.name}</h1>
          <p className="price">
            <span className="discounted-price">Rs {product.price}</span>
            <span className="original-price">Rs {product.originalPrice}</span>
            <span className="discount-percentage">{discount}% OFF</span>
          </p>
          <p className="delivery-note">
            <span className="material-icons">local_shipping</span>
            Free delivery in 5-7 working days
          </p>
          <div className="size-select-container" role="group" aria-label="select size">
            <p>Select Size</p>
            <div className="size-options">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-pill ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="products-details-button-container">
            <Button
              onClick={() => {
                if (!stateAuth.loggedIn) {
                  navigate("/login");
                  toast.info("Please log in to add items to the cart");
                } else if (itemIsPresentInCart(product.id)) {
                  navigate("/cart");
                } else {
                  dispatch({ type: "ADD_TO_CART", payload: product.id });
                  toast.success("Added To Cart");
                }
              }}
              className="product-add-to-cart-button"
            >
              {itemIsPresentInCart(product.id) ? "Go To Cart" : "Add To Cart"}
            </Button>

            <Button
              className="wishlist-button"
              onClick={() => {
                if (!stateAuth.loggedIn) {
                  navigate("/login");
                  toast.info("Please log in to add items to the wishlist");
                } else if (itemIsPresent(product.id)) {
                  dispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: product.id,
                  });
                  toast.success("Item Removed From Wishlist");
                } else {
                  dispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: product.id,
                  });
                  toast.success("Added To Wishlist");
                }
              }}
              aria-label="toggle wishlist"
            >
              {itemIsPresent(product.id) ? (
                <span className="material-icons favorite-icon-active">favorite</span>
              ) : (
                <span className="material-icons favorite-icon">favorite</span>
              )}
            </Button>
          </div>
          <div className="description-panel">
            <h3>Description & Fit</h3>
            <p>{product.description}</p>
          </div>
          <div className="shipping-panel">
            <h3>Shipping</h3>
            <div className="shipping-grid">
              <div>
                <span className="material-icons">inventory_2</span>
                <p>In stock</p>
              </div>
              <div>
                <span className="material-icons">autorenew</span>
                <p>Easy return policy</p>
              </div>
              <div>
                <span className="material-icons">local_shipping</span>
                <p>2-4 working days</p>
              </div>
              <div>
                <span className="material-icons">calendar_month</span>
                <p>Estimated delivery in a week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ratings-reviews-section" aria-label="ratings and reviews">
        <h2>Rating & Reviews</h2>
        <div className="ratings-layout">
          <div className="rating-summary">
            <p className="rating-score">{averageRating}</p>
            <p className="total-reviews">({totalReviews} Reviews)</p>
          </div>
          <div className="rating-bars">
            {ratingBreakdown.map((entry) => (
              <div key={entry.stars} className="rating-bar-row">
                <span>{entry.stars}</span>
                <span className="material-icons">grade</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${Math.max(6, Math.round((entry.count / totalReviews) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <article className="review-card">
            <div className="review-card-top">
              <p>{reviewData.reviewer}</p>
              <small>{reviewData.reviewDate}</small>
            </div>
            <p className="review-title">{reviewData.title}</p>
            <p className="review-body">{reviewData.body}</p>
          </article>
        </div>
      </section>

      <section className="related-products-section" aria-label="related products">
        <h2>You might also like</h2>
        <div className="related-products-grid">
          {relatedProducts.map((item) => (
            <article className="related-product-card" key={item.id}>
              <button type="button" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.image} alt={item.name} />
              </button>
              <p className="related-product-name">{item.name}</p>
              <p className="related-product-price">Rs {item.price}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export { ProductDetails };
