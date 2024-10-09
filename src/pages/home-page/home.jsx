import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/component-index";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-text">
            <h1>Kartshop</h1>
            <p>Shop everything you want</p>
          </div>
          <Button
            onClick={() => navigate("/shop")}
            className="button-getting-started"
          >
            Explore more
          </Button>
        </div>

        <div className="home-image">
          <img
            className="image-responsive"
            src="/image/empty-cart.svg"
            alt="home-hero"
          />
        </div>
      </div>
    </div>
  );
};

export { Home };
