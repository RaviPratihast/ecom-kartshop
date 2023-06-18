import React from "react";
import { Button } from "../../components/component-index";

const Home = () => {
  return (
    <div className="home-page">
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + "/image/empty.jpg"}
          alt="shopping cart"
          className="img home-img"
        />
        <div className="explore-container">
          <div className="explore-container-text">
            <h1>
              Kart<span>Shop</span>
            </h1>
            <p>Shop everything you want.</p>
          </div>
          <Button>Explore more</Button>
        </div>
      </div>
    </div>
  );
};

export { Home };
