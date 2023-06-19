import React from "react";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";
const Cart = () => {
  const { state } = useProduct();
  return (
    <div className="cart-container">
      <div className="cart-items-container">
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
                {/* <div className="add-cart-wishlist-container">
                  <Button onClick={() => console.log("hey")}>
                    Add To Cart
                  </Button>
                  <Button onClick={() => console.log("hey")}>
                    <span className="material-icons favorite-icon">favorite</span>
                  </Button>
                </div> */}
                {/* <div className="cart-icons">
                  <Button onClick={() => console.log("hey")}>
                    <span className="material-icons delete-icon">delete</span>
                  </Button>
                  <Button onClick={() => console.log("hey")}>
                    <span className="material-icons favorite-icon">
                      favorite
                    </span>
                  </Button>
                </div> */}
              </Card>
            );
          }
        )}
      </div>
      <div className="proceed-to-payment-container">
        <p>
          Sub Total (<span>4</span>)items: Rs 1000
        </p>
        <Button onClick={() => console.log("hey")}>Proceed To payment</Button>
        <Button onClick={() => console.log("hey")}>ClearYour Cart</Button>
      </div>
    </div>
  );
};

export { Cart };
