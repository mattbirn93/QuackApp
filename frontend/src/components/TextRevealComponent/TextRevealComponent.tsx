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
        <div className="textRevealContainer">
          <div className="text">
            Seamlessly blending functionality and convenience, Quack! allows
            users to craft, edit, and collaborate on scripts directly from their
            mobile devices.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextComponent;
