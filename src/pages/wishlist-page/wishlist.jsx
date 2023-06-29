import React from "react";
import { useProduct } from "../../context/ecom-context";
import { Button, Card } from "../../components/component-index";
import { toast } from "react-toastify";
const Wishlist = () => {
  const { state, dispatch } = useProduct();
  console.log(state.wishlist);
  return (
    <div className="wishlist-container">
      <div className="wishlist-count">
        <h3>items : {state.wishlist.length}</h3>
      </div>
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
                      dispatch({ type: "ADD_TO_CART", payload: id });
                      toast.success("Added To Cart");
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
                      toast.success("Item Removed From Wishlist");
                    }}
                  >
                    <span className="material-icons favorite-icon">delete</span>
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
