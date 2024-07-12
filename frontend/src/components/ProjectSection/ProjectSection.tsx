import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./ProjectSection.module.css";

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleScrollDebounced = () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollDebounced);
    return () => {
      window.removeEventListener("scroll", handleScrollDebounced);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return scrollY;
};

const ProjectsSection = () => {
  const scrollY = useScrollPosition();
  const marqueeControls1 = useAnimation();
  const marqueeControls2 = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && sectionBottom > 0) {
        marqueeControls1.start({
          x: -scrollY * 2.5,
          transition: {
            ease: "linear",
            duration: 0,
          },
        });
        marqueeControls2.start({
          x: scrollY * 0.5,
          transition: {
            ease: "linear",
            duration: 0,
          },
        });
      }
    }
  }, [scrollY, marqueeControls1, marqueeControls2]);

  return (
    <section className={styles.wrapper} ref={sectionRef}>
      <div className={styles.mainContainer}></div>
      <div className={styles.contentContainer}>
        <div className={styles.marqueeContainer1}>
          <motion.div
            className={styles.marqueeInner1}
            animate={marqueeControls1}
          >
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
          </motion.div>
        </div>
        <div className={styles.marqueeContainer2}>
          <motion.div
            className={styles.marqueeInner2}
            animate={marqueeControls2}
          >
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
          </motion.div>
        </div>
        <p className={styles.projectParagraph}>
          Meet Quack!, a cutting-edge mobile screenwriting app designed for the
          modern screenwriter on the go. Seamlessly blending functionality and
          convenience, Quack! allows users to craft, edit, and collaborate on
          scripts directly from their mobile devices. Quack is a great
          experience you've always dreamed about!
        </p>
        <p className={styles.projectMoreAbout}>MORE ABOUT US</p>
      </div>
    </section>
  );
};

export default ProjectsSection;

/////////////

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import styles from "./ProjectSection.module.css";

// const useScrollDirection = () => {
//   const [lastScrollTop, setLastScrollTop] = useState(0);
//   const [scrollDirection, setScrollDirection] = useState("down");

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollTop = window.scrollY;
//       if (currentScrollTop > lastScrollTop) {
//         setScrollDirection("down");
//       } else {
//         setScrollDirection("up");
//       }
//       setLastScrollTop(currentScrollTop);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollTop]);

//   return scrollDirection;
// };

// const ProjectsSection = () => {
//   const scrollDirection = useScrollDirection();
//   const marqueeControls1 = useAnimation();
//   const marqueeControls2 = useAnimation();
//   const [position1, setPosition1] = useState(0);
//   const [position2, setPosition2] = useState(0);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const section = sectionRef.current;
//       const sectionTop = section.getBoundingClientRect().top;
//       const sectionBottom = section.getBoundingClientRect().bottom;
//       const windowHeight = window.innerHeight;

//       if (sectionTop < windowHeight && sectionBottom > 0) {
//         if (scrollDirection === "down") {
//           setPosition1((prev) => prev - 10);
//           setPosition2((prev) => prev + 10);
//         } else {
//           setPosition1((prev) => prev + 10);
//           setPosition2((prev) => prev - 10);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrollDirection]);

//   useEffect(() => {
//     marqueeControls1.start({
//       x: position1,
//       transition: {
//         ease: "linear",
//         duration: 0.1,
//       },
//     });
//     marqueeControls2.start({
//       x: position2,
//       transition: {
//         ease: "linear",
//         duration: 0.1,
//       },
//     });
//   }, [position1, position2, marqueeControls1, marqueeControls2]);

//   return (
//     <section className={styles.wrapper} ref={sectionRef}>
//       <div className={styles.mainContainer}></div>
//       <div className={styles.contentContainer}>
//         <div className={styles.marqueeContainer1}>
//           <motion.div
//             className={styles.marqueeInner1}
//             animate={marqueeControls1}
//           >
//             <span className={styles.marqueeText1}>WELCOME TO</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//             <span className={styles.marqueeText1}>WELCOME TO</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//             <span className={styles.marqueeText1}>WELCOME TO</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//             <span className={styles.marqueeText1}>WELCOME TO</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//           </motion.div>
//         </div>
//         <div className={styles.marqueeContainer2}>
//           <motion.div
//             className={styles.marqueeInner2}
//             animate={marqueeControls2}
//           >
//             <span className={styles.marqueeText1}>HELLO FROM</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//             <span className={styles.marqueeText1}>HELLO FROM</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//             <span className={styles.marqueeText1}>HELLO FROM</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//             <span className={styles.marqueeText1}>HELLO FROM</span>
//             <span className={styles.marqueeText2}>QUACK!</span>
//           </motion.div>
//         </div>
//         <p className={styles.projectParagraph}>
//           Meet Quack!, a cutting-edge mobile screenwriting app designed for the
//           modern screenwriter on the go. Seamlessly blending functionality and
//           convenience, Quack! allows users to craft, edit, and collaborate on
//           scripts directly from their mobile devices. Quack is a great
//           experience you've always dreamed about!
//         </p>
//         <p className={styles.projectMoreAbout}>MORE ABOUT US</p>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;
