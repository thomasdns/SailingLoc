import React from "react";
import "./DestinationCard.css";

const DestinationCard = ({ destination }) => {
  const destinations = {
    "saint-malo": {
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    "les-glenan": {
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    crozon: {
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  };

  const destinationData =
    destinations[destination.id] || destinations["saint-malo"];

  return (
    <div className="destination-card">
      <img
        src={destinationData.image}
        alt={destination.name}
        className="destination-image"
      />
      <div className="destination-overlay"></div>
      <div className="destination-name">{destination.name}</div>
    </div>
  );
};

export default DestinationCard;
