import React from "react";
import styles from "./BentoBox.module.css";
import Image1 from "../../assets/images/background6.jpg";
import Image2 from "../../assets/images/background6.jpg";
import Image3 from "../../assets/images/background6.jpg";
import Image4 from "../../assets/images/background6.jpg";

const data = [
  {
    title: "Create Scripts",
    content: "Easily create and edit scripts with a user-friendly interface.",
    image: Image1,
  },
  {
    title: "Collaborate",
    content: "Work together with others in real-time.",
    image: Image2,
  },
  {
    title: "Speech-to-Text",
    content:
      "Use advanced speech-to-text capabilities to dictate your scripts.",
    image: Image3,
  },
  {
    title: "Notes and Chat",
    content:
      "Communicate with your team using the integrated notes and chat features.",
    image: Image4,
  },
  {
    title: "Review and Feedback",
    content: "Receive feedback and review scripts collaboratively.",
    image: Image4,
  },
  {
    title: "Export Scripts",
    content: "Easily export your scripts in multiple formats.",
    image: Image4,
  },
];

const BentoBox = () => {
  return (
    <div className={styles.bentoBoxContainer}>
      <div className={styles.bentoBox}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`${styles.box} ${styles[`box${index + 1}`]}`}
          >
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.content}>{item.content}</p>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoBox;
