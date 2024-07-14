import React, { useRef } from "react";

import Picture1 from "../../assets/images/10.jpg";
import Picture2 from "../../assets/images/11.jpg";
import Picture3 from "../../assets/images/12.jpg";
import Picture4 from "../../assets/images/13.jpg";
import Picture5 from "../../assets/images/14.jpg";
import Picture6 from "../../assets/images/15.jpg";
import Picture7 from "../../assets/images/16.jpg";
// import Picture1 from "../../assets/images/Film1.webp";
// import Picture2 from "../../assets/images/Film2.webp";
// import Picture3 from "../../assets/images/Film3.webp";
// import Picture4 from "../../assets/images/Film4.webp";
// import Picture5 from "../../assets/images/Film5.webp";
// import Picture6 from "../../assets/images/Film6.webp";
// import Picture7 from "../../assets/images/Film9.webp";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./ZoomParallax1.module.css";

const ZoomParallax1 = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <img src={src} alt="image" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoomParallax1;
