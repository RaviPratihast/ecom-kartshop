import React from "react";
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
  function itemIsPresentInCart(id) {
    return state.cart.some((cartItem) => cartItem.id === id);
  }
  function itemIsPresent(id) {
    return state.wishlist.some((arrItem) => {
      return arrItem.id === id;
    });
  }
  return (
    <div className="product-container">
      {state.product.map(
        (product) =>
          product.id === productDetailsId && (
            <div className="product-detail-container">
              <div className="product-detail-left-container">
                <img src={product.image} alt="ProductImage" />
              </div>
              <div className="product-detail-right-container">
                <h1>{product.name}</h1>
                <p className="price">
                  <span className="discounted-price">Rs {product.price}</span>
                  <span className="original-price">
                    Rs {product.originalPrice}
                  </span>
                  <span className="discount-percentage">10% OFF</span>
                </p>
                <p className="description">{product.description}</p>
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
                    {itemIsPresentInCart(product.id)
                      ? "Go To Cart"
                      : "Add To Cart"}
                  </Button>

                  <Button
                    onClick={() => {
                      if (!stateAuth.loggedIn) {
                        navigate("/login");
                        toast.info(
                          "Please log in to add items to the wishlist"
                        );
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
                  >
                    {itemIsPresent(product.id) ? (
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
              </div>
            </div>
          )
      )}
    </div>
  );
};

export { ProductDetails };
