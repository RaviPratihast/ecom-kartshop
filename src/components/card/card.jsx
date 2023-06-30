import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  id,
  name,
  rating,
  image,
  originalPrice,
  price,
  qty,
  label,
  children,
}) => {
  return (
    <div className="card">
      <div className="image-container">
        <Link to={`/${name}/${id}`}>
          <img src={image} alt={name} className="card-image" />
        </Link>
      </div>

      <div className="card-content">
        <div className="name-rating-container">
          <div className="name-container">
            <h3 className="card-name">{name}</h3>
          </div>
          <div className="ratings-container">
            <i className="material-icons">grade</i>
            <span className="card-rating">{rating}</span>
          </div>
        </div>
        <div className="card-details">
          <p>
            Rs <span className="sale-price">{price}</span>
          </p>

          <span className="original-price">Rs {originalPrice}</span>
          <span className="off-percent">10% off</span>
        </div>
        <div className="buttons-add-to-cart-wish-container">{children}</div>
      </div>
    </div>
  );
};

export { Card };
