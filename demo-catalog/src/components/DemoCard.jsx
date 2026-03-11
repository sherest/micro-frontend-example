import React from "react";
import "./DemoCard.css";

export default function DemoCard({ id, title, description, category, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={`demo-card ${isSelected ? "demo-card--selected" : ""}`}
      onClick={() => onClick(id)}
      aria-pressed={isSelected}
    >
      <span className="demo-card__category">{category}</span>
      <h3 className="demo-card__title">{title}</h3>
      <p className="demo-card__desc">{description}</p>
    </button>
  );
}
