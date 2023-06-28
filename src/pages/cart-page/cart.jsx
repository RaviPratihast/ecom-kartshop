import React from "react";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";
const Cart = () => {
  const { state, dispatch, subTotal } = useProduct();
  console.log(state);
  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {state.cart.map(
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
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: id })
                    }
                  >
                    <span className="material-icons">delete</span>
                  </Button>
                  <Button onClick={() => console.log("hey")}>
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
      <div className="proceed-to-payment-container">
        <p>
          Sub Total (<span>{state.cart.length}</span>)items: Rs {subTotal}
        </p>
        <Button onClick={() => console.log("hey")}>Proceed To payment</Button>
        <Button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Clear Your Cart
        </Button>
      </div>
    </div>
  );
};

export { Cart };
