import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import "./humanSection.css";

function HumanSection() {
  const animate1 = useAnimation();
  const { ref: ref1, inView: inView1 } = useInView();
  useEffect(() => {
    if (inView1) {
      animate1.start("visible");
    }
    if (!inView1) {
      animate1.start("hidden");
    }
  }, [inView1]);

  return (
    <div className="Human__wrapper">
      <div className="Human__container">
        <motion.div
          ref={ref1}
          animate={animate1}
          initial="hidden"
          variants={{
            visible: { opacity: 1, transition: { duration: 10 } },
            hidden: { opacity: 0 },
          }}
        ></motion.div>

        <div className="HumanSection__animText1">QUACK!</div>
      </div>
    </div>
  );
}

export default HumanSection;
