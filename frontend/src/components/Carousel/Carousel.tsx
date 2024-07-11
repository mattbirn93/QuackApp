import React, { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import InfoSection21 from "../../assets/images/InfoSection2-1.jpeg";
import InfoSection22 from "../../assets/images/InfoSection2-2.jpeg";
import InfoSection23 from "../../assets/images/InfoSection2-3.jpeg";
import InfoSection24 from "../../assets/images/InfoSection2-4.jpeg";
import InfoSection25 from "../../assets/images/InfoSection2-5.jpeg";
import InfoSection26 from "../../assets/images/InfoSection2-6.jpeg";
import InfoSection27 from "../../assets/images/InfoSection2-7.jpeg";
import InfoSection28 from "../../assets/images/InfoSection2-8.jpeg";
import useKeypress from "react-use-keypress";
import "./Carousel.css";

const images = [
  InfoSection21,
  InfoSection22,
  InfoSection23,
  InfoSection24,
  InfoSection25,
  InfoSection26,
  InfoSection27,
  InfoSection28,
];

const collapsedAspectRatio = 1 / 3;
const fullAspectRatio = 3 / 2;
const margin = 12;
const gap = 2;

function Carousel() {
  const [index, setIndex] = useState(0);

  useKeypress("ArrowRight", () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="Carousel__wrapper">
        {/* <div className="Carousel__liveText1">Live Use Images</div>

        <div className="Carousel__liveText2"></div> */}

        <div className="Carousel__container">
          <div className="Carousel__imagesContainer">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="Carousel__flexDiv"
            >
              {images.map((image, i) => (
                <motion.img
                  key={image}
                  src={image}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="Carousel__aspectImages"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="Carousel__leftSide"
                  onClick={() => setIndex(index - 1)}
                >
                  <FaLessThan />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="Carousel__rightSide"
                  onClick={() => setIndex(index + 1)}
                >
                  <FaGreaterThan />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="Carousel__thumbnails">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  margin +
                  index * gap
                }%`,
              }}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`,
              }}
              className="Carousel__flexDiv"
            >
              {images.map((image, i) => (
                <motion.button
                  onClick={() => setIndex(i)}
                  initial={false}
                  whileHover={{ opacity: 1 }}
                  animate={i === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1,
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5,
                    },
                  }}
                  className="Carousel__thumbSize"
                  key={image}
                >
                  <img src={image} className="Carousel__thumbHeight" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default Carousel;
