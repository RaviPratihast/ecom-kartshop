import React from "react";
import { useProduct } from "../../context/ecom-context";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../components/component-index";
import { toast } from "react-toastify";
const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch, subTotal } = useProduct();
  function itemIsPresent(id) {
    return state.wishlist.some((arrItem) => {
      return arrItem.id === id;
    });
  }
  function HandleProceedToPayment() {
    // console.log("hey");
    toast.success("Order Placed");
    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  }

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {state.cart.length === 0 ? (
          <div className="empty-container-notice">
            <h1>Your Cart is Empty</h1>
            <Button
              onClick={() => navigate("/shop")}
              className="go-to-shop-button"
            >
              Go To Shop
            </Button>
          </div>
        ) : (
          state.cart.map(
            ({ id, name, rating, image, originalPrice, price, qty }) => {
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
                  <div className="qty-counter-container">
                    <Button
                      onClick={() =>
                        dispatch({ type: "DECREMENT_QTY", payload: id })
                      }
                    >
                      -
                    </Button>
                    <span className="qty-container">{qty}</span>
                    <Button
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: id })
                      }
                    >
                      +
                    </Button>
                  </div>
                  <div className="button-container">
                    <Button
                      onClick={() => {
                        dispatch({ type: "REMOVE_FROM_CART", payload: id });
                        toast.success("remove from cart");
                      }}
                    >
                      <span className="material-icons">delete</span>
                    </Button>
                    <Button
                      onClick={() => {
                        if (itemIsPresent(id)) {
                          dispatch({
                            type: "REMOVE_FROM_WISHLIST",
                            payload: id,
                          });
                          toast.success("Item Removed From Wishlist");
                        } else {
                          dispatch({ type: "ADD_TO_WISHLIST", payload: id });
                          toast.success("Added To Wishlist");
                        }
                      }}
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
          )
        )}
      </div>
      {state.cart.length !== 0 && (
        <div className="proceed-to-payment-container">
          <p>
            Sub Total (<span>{state.cart.length}</span>)items: Rs {subTotal}
          </p>
          <Button
            className="button-proceed-to-payment"
            onClick={() => HandleProceedToPayment()}
          >
            Proceed To payment
          </Button>
          <Button
            onClick={() => {
              if (state.cart.length > 0) {
                dispatch({ type: "CLEAR_CART" });
                toast.success("Cart Items Removed!");
              } else if (state.cart.length === 0) {
                toast.success("Cart is Empty");
              }
            }}
            className="button-clear-cart"
          >
            Clear Your Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export { Cart };
