import React from "react";
import "./BentoBox.css";

const data = [
  {
    title: "Create Scripts",
    content: "Easily create and edit scripts with a user-friendly interface.",
    image: "path/to/image1.jpg",
  },
  {
    title: "Collaborate",
    content: "Work together with others in real-time.",
    image: "path/to/image2.jpg",
  },
  {
    title: "Speech-to-Text",
    content:
      "Use advanced speech-to-text capabilities to dictate your scripts.",
    image: "path/to/image3.jpg",
  },
  {
    title: "Notes and Chat",
    content:
      "Communicate with your team using the integrated notes and chat features.",
    image: "path/to/image4.jpg",
  },
];

const BentoBox1 = () => {
  return (
    <div className="bento-container">
      {data.map((item, index) => (
        <div key={index} className="bento-item">
          <img src={item.image} alt={item.title} className="bento-image" />
          <div className="bento-content">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoBox1;
