import React, { useEffect, useState } from "react";
import "./appleScroll.css";

function AppleScroll() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);
    return () => window.removeEventListener("scroll", scrollProgress);
  }, []);

  const scrollProgress = () => {
    const scrollpx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrollLen = Math.ceil(((scrollpx / winHeightPx) * 100) / 0.69);

    setScrolled(scrollLen);
  };

  return (
    <div className="AppleScroll">
      <header className="AppleScroll-header">
        <img
          src={`https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${scrolled
            .toString()
            .padStart(4, "0")}.jpg`}
        />
      </header>
    </div>
  );
}

export default AppleScroll;
