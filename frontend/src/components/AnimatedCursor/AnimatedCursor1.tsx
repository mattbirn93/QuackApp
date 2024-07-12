import React from "react";
import AnimatedCursor from "react-animated-cursor";

export default function AnimatedCursor1() {
  return (
    <AnimatedCursor
      color="179, 237, 62"
      innerSize={30}
      outerSize={45}
      innerScale={1}
      outerScale={1.7}
      outerAlpha={0}
      trailingSpeed={6}
      outerStyle={{
        border: "0.1px solid #FFFFFF",
      }}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
      ]}
    />
  );
}
