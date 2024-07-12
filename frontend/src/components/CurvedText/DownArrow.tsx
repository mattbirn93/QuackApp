import React from "react";
import "./downArrow.css";

const DownArrow: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="down-arrow"
  >
    <path d="M12 16L6 10H18L12 16Z" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

export default DownArrow;
