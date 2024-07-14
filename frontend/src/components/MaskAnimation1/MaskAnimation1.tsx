import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./MaskAnimation1.module.css";

const phrases = [
  "Meet Quack!, a cutting-edge mobile",
  "screenwriting app designed for the",
  "modern screenwriter on the go.",
  "Seamlessly blending functionality and",
  "convenience,",
];

const MaskAnimation1 = () => {
  return (
    <div className={styles.container}>
      <MaskText />
    </div>
  );
};

export function MaskText() {
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
    exit: { y: "100%" },
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: false,
  });

  return (
    <div ref={ref} className={styles.body}>
      {phrases.map((phrase, index) => {
        return (
          <div key={index} className={styles.lineMask}>
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : "initial"}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}

export default MaskAnimation1;
