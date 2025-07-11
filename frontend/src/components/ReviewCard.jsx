import React from "react";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-avatar">{review.name.charAt(0)}</div>
      <h4 className="review-name">{review.name}</h4>
      <h5 className="review-title">{review.title}</h5>
      <p className="review-comment">{review.comment}</p>
      <div className="review-stars">{"⭐".repeat(review.stars)}</div>
    </div>
  );
};

export default ReviewCard;
