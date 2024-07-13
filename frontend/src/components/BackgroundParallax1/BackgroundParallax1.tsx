import React from "react";
import Background from "../../assets/images/button1.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import styles from "./BackgroundParallax1.module.css";

const BackgroundParallax1 = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.content}>
        <p className={styles.textSmall}>
          Meet Quack!, a cutting-edge mobile screenwriting app designed for the
          modern screenwriter on the go.
        </p>
        <p className={styles.textLarge}>QUACK! THE ON THE GO SOLUTION</p>
      </div>
      <div className={styles.backgroundImageContainer}>
        <motion.div style={{ y }} className={styles.backgroundImage}>
          <img
            src={Background}
            alt="image"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundParallax1;
