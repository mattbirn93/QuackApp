import React from "react";
import "./GalaxyButton1.css";
import { motion } from "framer-motion";

const generateStars = (numStars: number) => {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const style = {
      top: `${Math.random() * 200}%`,
      left: `${Math.random() * 200}%`,
    };
    stars.push(<div className="star" style={style} key={i}></div>);
  }
  return stars;
};

const GalaxyButton = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    className="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <div className="galaxy-background">
      <div className="stars">{generateStars(100)}</div>
    </div>
    <div className="button-content">{children}</div>
  </motion.button>
);

export default GalaxyButton;
