import React from "react";
import "./BoatCard.css";

const BoatCard = ({ boat }) => {
  return (
    <div className="boat-card">
      <div className="boat-image">
        <img src={boat.image} alt={boat.model} />
      </div>
      <div className="boat-info">
        <h3 className="boat-model">{boat.model}</h3>
        <p className="boat-location">{boat.location}</p>
        <p className="boat-capacity">{boat.capacity} personnes</p>
        <div className="boat-footer">
          <span className="boat-price">À partir de {boat.price} €</span>
          <div className="boat-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{boat.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatCard;
