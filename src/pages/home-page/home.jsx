import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/component-index";

const Home = () => {
  const navigate = useNavigate();
  return (
    // <div className="home-page">
    //   <div className="explore-container">
    //     <div className="explore-container-text">
    //       <h1>
    //         Kart<span>Shop</span>
    //       </h1>
    //       <p>Shop everything you want.</p>
    //     </div>
    //     <Button onClick={() => navigate("/shop")}>Explore more</Button>
    //   </div>
    //   <div className="image-container">
    //     <img
    //       src="/image/empty-cart.svg"
    //       alt="shopping cart"
    //       className="img home-img"
    //     />
    //   </div>
    // </div>
    <div>
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-text">
            <h1>Kartshop</h1>
            <p>Shop everything you want</p>
          </div>
          <Button onClick={() => navigate("/shop")}>Explore more</Button>
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
