import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import CurvedText from "../../components/CurvedText/CurvedText";
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
  const paragraphControls = useAnimation();
  const moreAboutControls = useAnimation();
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
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
          </motion.div>
        </div>
        <div className={styles.marqueeContainer2}>
          <motion.div
            className={styles.marqueeInner2}
            animate={marqueeControls2}
          >
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
            <span className={styles.marqueeText1}>WELCOME</span>
            <span className={styles.marqueeText3}>TO</span>
            <span className={styles.marqueeText2}>QUACK!</span>
          </motion.div>
        </div>
        <motion.p
          className={styles.projectParagraph}
          initial={{ opacity: 0, x: 200, scale: 0.3 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          Meet Quack!, a cutting-edge mobile screenwriting app designed for the
          modern screenwriter on the go. Seamlessly blending functionality and
          convenience, Quack! allows users to craft, edit, and collaborate on
          scripts directly from their mobile devices. Quack is a great
          experience you've always dreamed about!
        </motion.p>
        <div className={styles.curvedTextContainer}>
          <CurvedText />
        </div>
        <motion.p
          className={styles.projectMoreAbout}
          initial={{ opacity: 0, x: 500 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          }}
        >
          MORE ABOUT US
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;

/////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import styles from "./ProjectSection.module.css";

// const useScrollPosition = () => {
//   const [scrollY, setScrollY] = useState<number>(0);
//   const requestRef = useRef<number | null>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     const handleScrollDebounced = () => {
//       if (requestRef.current !== null) {
//         cancelAnimationFrame(requestRef.current);
//       }
//       requestRef.current = requestAnimationFrame(handleScroll);
//     };

//     window.addEventListener("scroll", handleScrollDebounced);
//     return () => {
//       window.removeEventListener("scroll", handleScrollDebounced);
//       if (requestRef.current !== null) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, []);

//   return scrollY;
// };

// const ProjectsSection = () => {
//   const scrollY = useScrollPosition();
//   const marqueeControls1 = useAnimation();
//   const marqueeControls2 = useAnimation();
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (sectionRef.current) {
//       const section = sectionRef.current;
//       const sectionTop = section.getBoundingClientRect().top;
//       const sectionBottom = section.getBoundingClientRect().bottom;
//       const windowHeight = window.innerHeight;

//       if (sectionTop < windowHeight && sectionBottom > 0) {
//         marqueeControls1.start({
//           x: -scrollY * 2.5,
//           transition: {
//             ease: "linear",
//             duration: 0,
//           },
//         });
//         marqueeControls2.start({
//           x: scrollY * 0.5,
//           transition: {
//             ease: "linear",
//             duration: 0,
//           },
//         });
//       }
//     }
//   }, [scrollY, marqueeControls1, marqueeControls2]);

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
//         <motion.p
//           className={styles.projectParagraph}
//           initial={{ opacity: 0, x: 200, scale: 0.3 }}
//           whileInView={{ opacity: 1, x: 0, scale: 1 }}
//           viewport={{ once: false, amount: 0.1 }}
//           transition={{ type: "spring", stiffness: 100, damping: 20 }}
//         >
//           Meet Quack!, a cutting-edge mobile screenwriting app designed for the
//           modern screenwriter on the go. Seamlessly blending functionality and
//           convenience, Quack! allows users to craft, edit, and collaborate on
//           scripts directly from their mobile devices. Quack is a great
//           experience you've always dreamed about!
//         </motion.p>
//         <p className={styles.projectMoreAbout}>MORE ABOUT US</p>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;
