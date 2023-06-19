import React from "react";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";

const Wishlist = () => {
  const { state, dispatch } = useProduct();
  return (
    <div className="wishlist-container">
      <div className="wishlist-count">
        <h3>items : 1</h3>
      </div>
      <div className="wishlist-items-container">
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
                  <Button onClick={() => console.log("hey")}>
                    Add To Cart
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
    </div>
  );
};

export { Wishlist };
