import React from "react";
import Word from "./Word";
import Character from "./Character";

const paragraph =
  "  Meet Quack!, a cutting-edge mobile screenwriting app designed for the modern screenwriter on the go. Seamlessly blending functionality and convenience, Quack! allows users to craft edit, and collaborate on scripts directly from their mobile devices. Whether you’re brainstorming ideas, writing dialogue, or revising scenes, Quack! provides a user-friendly interface that makes screenwriting a breeze.";

const TextOpacityComponent = () => {
  const words = paragraph.split(" ");
  return (
    <main>
      <div style={{ height: "100vh" }}></div>
      <Word paragraph={paragraph} />
      <div style={{ height: "100vh" }}></div>
      <Character paragraph={paragraph} />
      <div style={{ height: "100vh" }}></div>
    </main>
  );
};

export default TextOpacityComponent;
