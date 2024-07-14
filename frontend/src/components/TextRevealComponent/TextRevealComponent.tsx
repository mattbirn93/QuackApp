import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TextRevealComponent.css";

const TextComponent = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".text", {
      backgroundPosition: "100% center",
      ease: "none",
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.fromTo(
      ".text",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div className="content">
          <div className="text">
            A magical new way to interact with iPhone. A vital safety feature
            designed to save lives. An innovative 48MP camera for mind-blowing
            detail. All powered by the ultimate smartphone chip.
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default TextComponent;
