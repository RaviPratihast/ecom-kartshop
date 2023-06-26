import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/component-index";

const Home = () => {
  const navigate = useNavigate();
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
          <Button onClick={() => navigate("/shop")}>Explore more</Button>
        </div>
      </div>
    </div>
  );
};

export { Home };
