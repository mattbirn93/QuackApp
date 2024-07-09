/////////////////////////

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BentoBox.module.css";
import Image1 from "../../assets/images/background6.jpg";
import Image2 from "../../assets/images/background6.jpg";
import Image3 from "../../assets/images/background6.jpg";
import Image4 from "../../assets/images/background6.jpg";
import Neon1 from "../../assets/images/neon-icon1.jpg";
import Neon2 from "../../assets/images/neon-icon2.jpg";
import Neon3 from "../../assets/images/neon-icon3.jpg";
import Neon4 from "../../assets/images/neon-icon4.jpg";
import Neon5 from "../../assets/images/neon-icon5.jpg";
import Neon6 from "../../assets/images/neon-icon6.jpg";

const data = [
  {
    title: "Create Scripts",
    content: "Easily create and edit scripts with a user-friendly interface.",
    image: Neon1,
  },
  {
    title: "Collaborate",
    content: "Work together with others in real-time.",
    image: Neon2,
  },
  {
    title: "Speech-to-Text",
    content:
      "Use advanced speech-to-text capabilities to dictate your scripts.",
    image: Neon3,
  },
  {
    title: "Notes and Chat",
    content:
      "Communicate with your team using the integrated notes and chat features.",
    image: Neon4,
  },
  {
    title: "Review and Feedback",
    content: "Receive feedback and review scripts collaboratively.",
    image: Neon5,
  },
  {
    title: "Export Scripts",
    content: "Easily export your scripts in multiple formats.",
    image: Neon6,
  },
];

const BentoBox = () => {
  const refs = data.map(() => useRef<HTMLDivElement>(null));
  const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.1, rotate: 5 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.bentoBoxContainer}>
      <div className={styles.bentoBlackBox}></div>
      <div className={styles.bentoBox}>
        {data.map((item, index) => (
          <motion.div
            key={index}
            ref={refs[index]}
            className={`${styles.box} ${styles[`box${index + 1}`]}`}
            initial="hidden"
            animate={isInView[index] ? "visible" : "hidden"}
          >
            <motion.h3
              className={styles.title}
              variants={textVariants}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              {item.title}
            </motion.h3>
            <motion.p
              className={styles.content}
              variants={contentVariants}
              transition={{ duration: 0.5, delay: index * 0.4 }}
            >
              {item.content}
            </motion.p>
            <motion.img
              src={item.image}
              alt={item.title}
              variants={imageVariants}
              transition={{ duration: 0.5, delay: index * 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BentoBox;
