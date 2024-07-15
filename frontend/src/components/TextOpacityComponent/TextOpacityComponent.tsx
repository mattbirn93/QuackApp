import React from "react";
import Character from "./Character";
import styles from "./TextOpacityComponent.module.css";

const paragraph =
  "  Meet Quack!, a cutting-edge mobile screenwriting app designed for the modern screenwriter on the go. Seamlessly blending functionality and convenience, Quack! allows users to craft edit, and collaborate on scripts directly from their mobile devices. Whether you’re brainstorming ideas, writing dialogue, or revising scenes, Quack! provides a user-friendly interface that makes screenwriting a breeze.";

const TextOpacityComponent = () => {
  return (
    <main className={styles.textOpacityWrapper}>
      <div className={styles.textOpacityContainer}>
        <Character paragraph={paragraph} />
      </div>
    </main>
  );
};

export default TextOpacityComponent;
