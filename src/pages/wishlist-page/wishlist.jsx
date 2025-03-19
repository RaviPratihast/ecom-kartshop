import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";
import { toast } from "react-toastify";
const Wishlist = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useProduct();
  function itemIsPresentInCart(id) {
    return state.cart.some((cartItem) => cartItem.id === id);
  }
  return (
    <div className="wishlist-container">
      {state.wishlist.length === 0 ? (
        <div className="wishlist-empty-container">
          <h1>Your Wishlist is Empty</h1>
          <Button
            onClick={() => navigate("/shop")}
            className="wishlist-go-to-cart-button"
          >
            Go To Shop
          </Button>
        </div>
      ) : (
        <div className="wishlist-items-container">
          {state.wishlist.map(
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
                        if (itemIsPresentInCart(id)) {
                          navigate("/cart");
                        } else {
                          dispatch({ type: "ADD_TO_CART", payload: id });
                          toast.success("Added To Cart");
                        }
                      }}
                      className="wishlist-go-to-cart-button"
                    >
                      {itemIsPresentInCart(id) ? "Go To Cart" : "Add To Cart"}
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
                        toast.success("Item Removed From Wishlist");
                      }}
                    >
                      <span className="material-icons favorite-icon">
                        delete
                      </span>
                    </Button>
                  </div>
                </Card>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export { Wishlist };
