import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MaskedCursor.css";

const MaskedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const setFromEvent = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  const size = isHovered ? 450 : 30;

  return (
    <div className="container">
      <motion.div
        className="mask"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
            mousePosition.y - size / 2
          }px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ ease: "backOut", duration: 0.4 }}
      >
        <h1
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          not <br /> found
        </h1>
      </motion.div>
      <div className="normal">
        <h1>
          404 <br /> page
        </h1>
      </div>
    </div>
  );
};

export default MaskedCursor;
