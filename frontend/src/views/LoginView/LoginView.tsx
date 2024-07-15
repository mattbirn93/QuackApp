import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import ErrorBoundary from "../../MyErrorBoundary";
import background4 from "../../assets/images/background4.png";
import HumanSection from "../../components/humanSection/HumanSection";
import BentoBox1 from "../../components/BentoBox1/BentoBox1";
import MediaSectionComponent1 from "../../components/MediaSectionComponent1/MediaSectionComponent1";
import WaveText1 from "../../components/WaveText/WaveText1";
import ProjectsSection from "../../components/ProjectSection/ProjectSection";
import MaskedCursor from "../../components/MaaskedCursor/MaskedCursor";
import BackgroundParallax1 from "../../components/BackgroundParallax1/BackgroundParallax1";
import ZoomParallax1 from "../../components/ZoomParallax1/ZoomParallax1";
import AnimatedCursor1 from "../../components/AnimatedCursor/AnimatedCursor1";
import MaskAnimation1 from "../../components/MaskAnimation1/MaskAnimation1";
import MaskTransition1 from "../../components/MaskTransition1/MaskTransition1";
import TextRevealComponent from "../../components/TextRevealComponent/TextRevealComponent";
import TextOpacityComponent from "../../components/TextOpacityComponent/TextOpacityComponent";
import MaskReveal from "../../components/MaskReveal/MaskReveal";
import styles from "./LoginView.module.css";

gsap.registerPlugin(ScrollTrigger);

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const textRef = useRef<HTMLParagraphElement>(null);

  const containerRef = useRef(null);
  const blackBoxRef = useRef(null);
  const textContainerRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const cubeContainerRef = useRef(null);
  const phoneTextRef = useRef(null);
  const phoneRef = useRef(null);
  const humanSectionRef = useRef(null);
  const heading2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
    tl.fromTo(
      blackBoxRef.current,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: blackBoxRef.current,
          start: "top center",
          end: "top 30%",
          scrub: true,
        },
      },
    )
      .fromTo(
        textContainerRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1 },
        "-=0.8",
      )
      .fromTo(
        headingRef.current,
        { y: "-50%", opacity: 0 },
        { y: "0%", opacity: 1 },
        "-=0.6",
      )
      .fromTo(
        paragraphRef.current,
        { y: "50%", opacity: 0 },
        { y: "0%", opacity: 1 },
        "-=0.4",
      );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      phoneTextRef.current,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: phoneTextRef.current,
          start: "top 135%",
          end: "top 50%",
          scrub: true,
        },
      },
    );
    gsap.fromTo(
      phoneRef.current,
      { x: "100%", opacity: 0, rotate: 90 },
      {
        x: "0%",
        opacity: 1,
        rotate: 0,
        scrollTrigger: {
          trigger: phoneRef.current,
          start: "top 75%",
          end: "top 50%",
          scrub: true,
        },
      },
    );
    gsap.fromTo(
      phoneTextRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phoneTextRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: true,
        },
      },
    );
    gsap.fromTo(
      phoneRef.current,
      { x: 0, opacity: 1, rotate: 0 },
      {
        x: "100%",
        opacity: 0,
        rotate: 90,
        scrollTrigger: {
          trigger: phoneRef.current,
          start: "top 110%",
          end: "top 130%",
          scrub: true,
        },
      },
    );
    gsap.fromTo(
      humanSectionRef.current,
      {
        scale: 4,
        opacity: 0,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      },
      {
        scale: 1,
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
        left: "50%",
        top: "10%",
        transform: "translate(0%, 0%)",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: humanSectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      },
    );
  }, []);

  useEffect(() => {
    const words = document.querySelectorAll(`.${styles.word}`);
    words.forEach((word, index) => {
      gsap.fromTo(
        word,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: word,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reset",
          },
        },
      );
    });
  }, []);

  useEffect(() => {
    const cubeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: cubeContainerRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });

    cubeTimeline.fromTo(
      cubeContainerRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1 },
    );
  }, []);

  const handleSignInClick = () => {
    navigate("/scriptslibrary");
  };

  const handleFaqClick = () => {
    navigate("/faq");
  };

  const { ref: phoneSectionRef, inView: phoneSectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
    initial: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const childVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      {/* <AnimatedCursor1 /> */}
      <div>
        <motion.div
          className={styles.mainContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Navbar section */}
          <div>
            <motion.div className={styles.homeNavContainer}>
              <motion.div className={styles.searchBarContainer}>
                <motion.div className={styles.searchBarWrapper}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={styles.searchIcon}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchBar}
                  />
                </motion.div>
              </motion.div>
              <motion.img
                src={background4}
                className={styles.backgroundImage}
                // initial={{ opacity: 1 }}
                // animate={{
                //   opacity: 1,
                //   rotateX: [-5, 15, -15],
                //   rotateY: [-10, 10, -10],
                // }}
                // transition={{
                //   duration: 3,
                //   opacity: { duration: 30 },
                //   rotateX: {
                //     duration: 7,
                //     repeat: Infinity,
                //     repeatType: "mirror",
                //     ease: "easeInOut",
                //   },
                //   rotateY: {
                //     duration: 30,
                //     repeat: Infinity,
                //     repeatType: "mirror",
                //     ease: "easeInOut",
                //   },
                // }}
              />

              <motion.div className={styles.signInButtonContainer}>
                <button
                  className={styles.signInButton}
                  onClick={handleSignInClick}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.signInButtonIcon}
                  />
                  Sign In
                </button>
              </motion.div>
            </motion.div>
            <button className={styles.faqButton} onClick={handleFaqClick}>
              FAQ
            </button>
          </div>

          {/* Header section */}
          <div>
            <motion.div
              className={styles.loginSectionContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.p
                ref={textRef}
                className={styles.heading1}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                variants={containerVariants}
                whileHover="hover"
                onHoverEnd={() =>
                  textRef.current &&
                  (textRef.current.style.transform = "scale(1)")
                }
              >
                {"Quack!".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={childVariants}
                    className={styles.character}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p
                ref={heading2Ref}
                className={styles.heading2}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                {"A Realtime Collaborative Screenwriting App"
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      className={`${styles.word} ${styles.glowWord}`}
                      style={{ display: "inline-block", marginRight: "0.3rem" }}
                    >
                      {word}
                    </span>
                  ))}
              </motion.p>
              <motion.p
                className={styles.missionStatement1}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              >
                Create and share scripts with other users and create the vision
                you have always dreamed about!.
              </motion.p>
              <motion.button
                className={styles.tryItButton}
                onClick={() => {}}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Try It Now
              </motion.button>
            </motion.div>
            <ErrorBoundary fallback={""}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              ></motion.div>
            </ErrorBoundary>
          </div>
        </motion.div>

        <div>
          <ProjectsSection />
        </div>

        {/* Cube Section */}
        <div ref={containerRef} className={styles.darkFrontiersWrapper}>
          <div ref={containerRef} className={styles.darkFrontiersContainer}>
            <div ref={blackBoxRef} className={styles.darkBlackBox}></div>
            <div ref={textContainerRef} className={styles.darkTextContainer}>
              <h1 ref={headingRef} className={styles.darkHeading}>
                What is Quack!
              </h1>
              <p ref={paragraphRef} className={styles.darkParagraph}>
                Meet Quack!, a cutting-edge mobile screenwriting app designed
                for the modern screenwriter on the go. Seamlessly blending
                functionality and convenience, Quack! allows users to craft,
                edit, and collaborate on scripts directly from their mobile
                devices. Whether you’re brainstorming ideas, writing dialogue,
                or revising scenes, Quack! provides a user-friendly interface
                that makes screenwriting a breeze.
              </p>
            </div>
            <div ref={cubeContainerRef} className={styles.cubeContainer}>
              <div className={styles.cubeWrapper}>
                <Spline scene="https://prod.spline.design/hlJIQzJ8X2DX6g5J/scene.splinecode" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <BentoBox1 />
        </div>

        <div>
          <MaskReveal />
        </div>

        <div>
          <WaveText1 />
        </div>

        <div>
          <BackgroundParallax1 />
        </div>

        <div>
          <MaskAnimation1 />
        </div>

        <div>
          <TextRevealComponent />
        </div>

        <div>
          <TextOpacityComponent />
        </div>

        <div>
          <MaskTransition1 />
        </div>

        {/* Phone Section */}
        <div className={styles.phoneSectionHeader}>
          <div ref={phoneSectionRef}>
            <motion.div
              ref={phoneTextRef}
              initial={{ opacity: 0, y: 50 }}
              animate={phoneSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className={styles.phoneHeading}>
                Record speech for your app right on your mobile phone and
                continue working on your shared scripts
              </div>
              <div ref={humanSectionRef}>
                <HumanSection />
              </div>
            </motion.div>
            <motion.div
              ref={phoneRef}
              initial={{ opacity: 0, x: 100, rotate: 90 }}
              animate={
                phoneSectionInView ? { opacity: 1, x: 0, rotate: 0 } : {}
              }
              transition={{ duration: 1 }}
              className={styles.phoneImage}
            >
              <Spline scene="https://prod.spline.design/LuVV6x9TaIevJB6h/scene.splinecode" />
            </motion.div>
          </div>
        </div>

        <div>
          <ZoomParallax1 />
        </div>

        {/* <div>
          <MediaSectionComponent1 />
        </div> */}

        <div>
          <Spline scene="https://prod.spline.design/52M2yCjRn6qjzfSc/scene.splinecode" />
        </div>

        <div className={styles.quackIconContainer}>
          <motion.div
            animate={{ rotateY: 3600 }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className={styles.quackIconWrapper}>
              <Spline scene="https://prod.spline.design/CIYcRNgqTIgWyLLf/scene.splinecode" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

///////////////////

// import React, { useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Spline from "@splinetool/react-spline";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import ErrorBoundary from "../../MyErrorBoundary";
// import background4 from "../../assets/images/background4.png";
// import HumanSection from "../../components/humanSection/HumanSection";
// import BentoBox1 from "../../components/BentoBox1/BentoBox1";
// // import Carousel from "../../components/Carousel/Carousel";
// import MediaSectionComponent1 from "../../components/MediaSectionComponent1/MediaSectionComponent1";
// import ProjectsSection from "../../components/ProjectSection/ProjectSection";
// // import GalaxyButton1 from "../../components/Button/GalaxyButton1";
// // import AppleScroll from "../../components/appleScroll/appleScroll";
// import AnimatedCursor1 from "../../components/AnimatedCursor/AnimatedCursor1";
// import styles from "./LoginView.module.css";

// gsap.registerPlugin(ScrollTrigger);

// const LoginView: React.FC = () => {
//   const navigate = useNavigate();
//   const textRef = useRef<HTMLParagraphElement>(null);

//   const containerRef = useRef(null);
//   const blackBoxRef = useRef(null);
//   const textContainerRef = useRef(null);
//   const headingRef = useRef(null);
//   const paragraphRef = useRef(null);
//   const cubeContainerRef = useRef(null);
//   const phoneTextRef = useRef(null);
//   const phoneRef = useRef(null);
//   const humanSectionRef = useRef(null);
//   const heading2Ref = useRef<HTMLParagraphElement>(null);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//     tl.fromTo(
//       blackBoxRef.current,
//       { x: "-100%", opacity: 0 },
//       { x: "0%", opacity: 1 },
//     )
//       .fromTo(
//         textContainerRef.current,
//         { x: "100%", opacity: 0 },
//         { x: "0%", opacity: 1 },
//         "-=0.8",
//       )
//       .fromTo(
//         headingRef.current,
//         { y: "-50%", opacity: 0 },
//         { y: "0%", opacity: 1 },
//         "-=0.6",
//       )
//       .fromTo(
//         paragraphRef.current,
//         { y: "50%", opacity: 0 },
//         { y: "0%", opacity: 1 },
//         "-=0.4",
//       )
//       .fromTo(
//         cubeContainerRef.current,
//         { scale: 0, opacity: 0 },
//         { scale: 1, opacity: 1 },
//         "-=0.1",
//       );
//   }, []);

//   useEffect(() => {
//     gsap.fromTo(
//       phoneTextRef.current,
//       { x: "-100%", opacity: 0 },
//       {
//         x: "0%",
//         opacity: 1,
//         scrollTrigger: {
//           trigger: phoneTextRef.current,
//           start: "top 135%",
//           end: "top 50%",
//           scrub: true,
//         },
//       },
//     );
//     gsap.fromTo(
//       phoneRef.current,
//       { x: "100%", opacity: 0, rotate: 90 },
//       {
//         x: "0%",
//         opacity: 1,
//         rotate: 0,
//         scrollTrigger: {
//           trigger: phoneRef.current,
//           start: "top 75%",
//           end: "top 50%",
//           scrub: true,
//         },
//       },
//     );
//     gsap.fromTo(
//       phoneTextRef.current,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: phoneTextRef.current,
//           start: "top 80%",
//           end: "top 60%",
//           scrub: true,
//         },
//       },
//     );
//     gsap.fromTo(
//       phoneRef.current,
//       { x: 0, opacity: 1, rotate: 0 },
//       {
//         x: "100%",
//         opacity: 0,
//         rotate: 90,
//         scrollTrigger: {
//           trigger: phoneRef.current,
//           start: "top 110%",
//           end: "top 130%",
//           scrub: true,
//         },
//       },
//     );
//     gsap.fromTo(
//       humanSectionRef.current,
//       {
//         scale: 4,
//         opacity: 0,
//         xPercent: -50,
//         yPercent: -50,
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%, -50%)",
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         xPercent: 0,
//         yPercent: 0,
//         left: "50%",
//         top: "10%",
//         transform: "translate(0%, 0%)",
//         duration: 2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: humanSectionRef.current,
//           start: "top 80%",
//           end: "top 30%",
//           scrub: true,
//         },
//       },
//     );
//   }, []);

//   useEffect(() => {
//     const words = document.querySelectorAll(`.${styles.word}`);
//     words.forEach((word, index) => {
//       gsap.fromTo(
//         word,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out",
//           stagger: 0.1,
//           delay: index * 0.1,
//           scrollTrigger: {
//             trigger: word,
//             start: "top 90%",
//             end: "top 60%",
//             toggleActions: "play none none reset",
//           },
//         },
//       );
//     });
//   }, []);

//   const handleSignInClick = () => {
//     navigate("/scriptslibrary");
//   };

//   const handleFaqClick = () => {
//     navigate("/faq");
//   };

//   const { ref: phoneSectionRef, inView: phoneSectionInView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const containerVariants = {
//     hover: {
//       transition: {
//         staggerChildren: 0.1,
//         staggerDirection: 1,
//       },
//     },
//     initial: {
//       transition: {
//         staggerChildren: 0.1,
//         staggerDirection: -1,
//       },
//     },
//   };

//   const childVariants = {
//     initial: {
//       scale: 1,
//     },
//     hover: {
//       scale: 1.2,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//   };

//   return (
//     <div className={styles.wrapper}>
//       {/* <AnimatedCursor1 /> */}
//       <div>
//         <motion.div
//           className={styles.mainContainer}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div>
//             <motion.div className={styles.homeNavContainer}>
//               <motion.div className={styles.searchBarContainer}>
//                 <motion.div className={styles.searchBarWrapper}>
//                   <FontAwesomeIcon
//                     icon={faSearch}
//                     className={styles.searchIcon}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className={styles.searchBar}
//                   />
//                 </motion.div>
//               </motion.div>
//               <motion.img
//                 src={background4}
//                 className={styles.backgroundImage}
//                 initial={{ opacity: 1 }}
//                 animate={{
//                   opacity: 1,
//                   rotateX: [-5, 15, -15],
//                   rotateY: [-10, 10, -10],
//                 }}
//                 transition={{
//                   duration: 3,
//                   opacity: { duration: 30 },
//                   rotateX: {
//                     duration: 7,
//                     repeat: Infinity,
//                     repeatType: "mirror",
//                     ease: "easeInOut",
//                   },
//                   rotateY: {
//                     duration: 30,
//                     repeat: Infinity,
//                     repeatType: "mirror",
//                     ease: "easeInOut",
//                   },
//                 }}
//               />

//               <motion.div className={styles.signInButtonContainer}>
//                 <button
//                   className={styles.signInButton}
//                   onClick={handleSignInClick}
//                 >
//                   <FontAwesomeIcon
//                     icon={faUser}
//                     className={styles.signInButtonIcon}
//                   />
//                   Sign In
//                 </button>
//               </motion.div>
//             </motion.div>
//             <button className={styles.faqButton} onClick={handleFaqClick}>
//               FAQ
//             </button>
//           </div>

//           {/* //////header section//// */}
//           <div>
//             <motion.div
//               className={styles.loginSectionContainer}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 1 }}
//             >
//               <motion.p
//                 ref={textRef}
//                 className={styles.heading1}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100 }}
//                 variants={containerVariants}
//                 whileHover="hover"
//                 onHoverEnd={() =>
//                   textRef.current &&
//                   (textRef.current.style.transform = "scale(1)")
//                 }
//               >
//                 {"Quack!".split("").map((char, index) => (
//                   <motion.span
//                     key={index}
//                     variants={childVariants}
//                     className={styles.character}
//                   >
//                     {char}
//                   </motion.span>
//                 ))}
//               </motion.p>
//               <motion.p
//                 ref={heading2Ref}
//                 className={styles.heading2}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//               >
//                 {"A Realtime Collaborative Screenwriting App"
//                   .split(" ")
//                   .map((word, index) => (
//                     <span
//                       key={index}
//                       className={`${styles.word} ${styles.glowWord}`}
//                       style={{ display: "inline-block", marginRight: "0.3rem" }}
//                     >
//                       {word}
//                     </span>
//                   ))}
//               </motion.p>
//               <motion.p
//                 className={styles.missionStatement1}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//               >
//                 Create and share scripts with other users and create the vision
//                 you have always dreamed about!.
//               </motion.p>
//               <motion.button
//                 className={styles.tryItButton}
//                 onClick={() => {}}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.5 }}
//               >
//                 Try It Now
//               </motion.button>
//               {/* <GalaxyButton1>CLICK HERE</GalaxyButton1> */}
//             </motion.div>
//             <ErrorBoundary fallback={""}>
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1, duration: 1 }}
//               >
//                 {/* <SplineScene /> */}
//               </motion.div>
//             </ErrorBoundary>
//           </div>
//         </motion.div>

//         {/* Project section */}
//         <div>
//           <ProjectsSection />
//         </div>

//         {/* dark frontiers section */}
//         <div ref={containerRef} className={styles.darkFrontiersContainer}>
//           <div ref={blackBoxRef} className={styles.darkBlackBox}></div>
//           <div ref={textContainerRef} className={styles.darkTextContainer}>
//             <h1 ref={headingRef} className={styles.darkHeading}>
//               What is Quack!
//             </h1>
//             <p ref={paragraphRef} className={styles.darkParagraph}>
//               Meet Quack!, a cutting-edge mobile screenwriting app designed for
//               the modern screenwriter on the go. Seamlessly blending
//               functionality and convenience, Quack! allows users to craft, edit,
//               and collaborate on scripts directly from their mobile devices.
//               Whether you’re brainstorming ideas, writing dialogue, or revising
//               scenes, Quack! provides a user-friendly interface that makes
//               screenwriting a breeze.
//             </p>
//           </div>
//           <div ref={cubeContainerRef} className={styles.cubeContainer}>
//             <div className={styles.cubeWrapper}>
//               <Spline scene="https://prod.spline.design/hlJIQzJ8X2DX6g5J/scene.splinecode" />
//             </div>
//           </div>
//         </div>

//         {/* BentoBox section */}
//         <div>
//           <BentoBox1 />
//         </div>

//         {/* Phone section */}
//         <div className={styles.phoneSectionHeader}>
//           {/* mask section */}
//           <div ref={phoneSectionRef}>
//             <motion.div
//               ref={phoneTextRef}
//               initial={{ opacity: 0, y: 50 }}
//               animate={phoneSectionInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 1 }}
//             >
//               <div className={styles.phoneHeading}>
//                 Record speech for your app right on your mobile phone and
//                 continue working on your shared scripts
//               </div>
//               <div ref={humanSectionRef}>
//                 <HumanSection />
//               </div>
//             </motion.div>
//             <motion.div
//               ref={phoneRef}
//               initial={{ opacity: 0, x: 100, rotate: 90 }}
//               animate={
//                 phoneSectionInView ? { opacity: 1, x: 0, rotate: 0 } : {}
//               }
//               transition={{ duration: 1 }}
//               className={styles.phoneImage}
//             >
//               <Spline scene="https://prod.spline.design/LuVV6x9TaIevJB6h/scene.splinecode" />
//             </motion.div>
//           </div>
//         </div>

//         {/* MediaSection section */}
//         <div>
//           <MediaSectionComponent1 />
//         </div>

//         {/* Carousel section */}
//         {/* <div>
//           <Carousel />
//         </div> */}

//         {/* Quack Icon section */}
//         <div className={styles.quackIconContainer}>
//           <motion.div
//             animate={{ rotateY: 3600 }}
//             transition={{
//               duration: 100,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           >
//             <div className={styles.quackIconWrapper}>
//               <Spline scene="https://prod.spline.design/CIYcRNgqTIgWyLLf/scene.splinecode" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll section */}
//         {/* <div>
//           <AppleScroll />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default LoginView;

//////////

// import React, { useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Spline from "@splinetool/react-spline";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import ErrorBoundary from "../../MyErrorBoundary";
// import background4 from "../../assets/images/background4.png";
// import HumanSection from "../../components/humanSection/HumanSection";
// import BentoBox1 from "../../components/BentoBox1/BentoBox1";
// import AppleScroll from "../../components/appleScroll/appleScroll";
// import styles from "./LoginView.module.css";

// gsap.registerPlugin(ScrollTrigger);

// const LoginView: React.FC = () => {
//   const navigate = useNavigate();
//   const textRef = useRef<HTMLParagraphElement>(null);

//   const containerRef = useRef(null);
//   const blackBoxRef = useRef(null);
//   const textContainerRef = useRef(null);
//   const headingRef = useRef(null);
//   const paragraphRef = useRef(null);
//   const cubeContainerRef = useRef(null);
//   const phoneTextRef = useRef(null);
//   const phoneRef = useRef(null);
//   const humanSectionRef = useRef(null);
//   const heading2Ref = useRef<HTMLParagraphElement>(null);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });

//     tl.fromTo(
//       blackBoxRef.current,
//       { x: "-100%", opacity: 0 },
//       { x: "0%", opacity: 1 },
//     )
//       .fromTo(
//         textContainerRef.current,
//         { x: "100%", opacity: 0 },
//         { x: "0%", opacity: 1 },
//         "-=0.8",
//       )
//       .fromTo(
//         headingRef.current,
//         { y: "-50%", opacity: 0 },
//         { y: "0%", opacity: 1 },
//         "-=0.6",
//       )
//       .fromTo(
//         paragraphRef.current,
//         { y: "50%", opacity: 0 },
//         { y: "0%", opacity: 1 },
//         "-=0.4",
//       )
//       .fromTo(
//         cubeContainerRef.current,
//         { scale: 0, opacity: 0 },
//         { scale: 1, opacity: 1 },
//         "-=0.1",
//       );
//   }, []);

//   useEffect(() => {
//     gsap.fromTo(
//       phoneTextRef.current,
//       { x: "-100%", opacity: 0 },
//       {
//         x: "0%",
//         opacity: 1,
//         scrollTrigger: {
//           trigger: phoneTextRef.current,
//           start: "top 135%",
//           end: "top 50%",
//           scrub: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       phoneRef.current,
//       { x: "100%", opacity: 0, rotate: 90 },
//       {
//         x: "0%",
//         opacity: 1,
//         rotate: 0,
//         scrollTrigger: {
//           trigger: phoneRef.current,
//           start: "top 75%",
//           end: "top 50%",
//           scrub: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       phoneTextRef.current,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: phoneTextRef.current,
//           start: "top 80%",
//           end: "top 60%",
//           scrub: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       phoneRef.current,
//       { x: 0, opacity: 1, rotate: 0 },
//       {
//         x: "100%",
//         opacity: 0,
//         rotate: 90,
//         scrollTrigger: {
//           trigger: phoneRef.current,
//           start: "top 110%",
//           end: "top 130%",
//           scrub: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       humanSectionRef.current,
//       {
//         scale: 4,
//         opacity: 0,
//         xPercent: -50,
//         yPercent: -50,
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%, -50%)",
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         xPercent: 0,
//         yPercent: 0,
//         left: "50%",
//         top: "10%",
//         transform: "translate(0%, 0%)",
//         duration: 2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: humanSectionRef.current,
//           start: "top 80%",
//           end: "top 30%",
//           scrub: true,
//         },
//       },
//     );
//   }, []);
//   useEffect(() => {
//     const words = document.querySelectorAll(`.${styles.word}`);
//     words.forEach((word, index) => {
//       gsap.fromTo(
//         word,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out",
//           stagger: 0.1,
//           delay: index * 0.1,
//           scrollTrigger: {
//             trigger: word,
//             start: "top 90%",
//             end: "top 60%",
//             toggleActions: "play none none reset",
//           },
//         },
//       );
//     });
//   }, []);

//   const handleSignInClick = () => {
//     navigate("/scriptslibrary");
//   };

//   const handleFaqClick = () => {
//     navigate("/faq");
//   };

//   const { ref: phoneSectionRef, inView: phoneSectionInView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const containerVariants = {
//     hover: {
//       transition: {
//         staggerChildren: 0.1,
//         staggerDirection: 1,
//       },
//     },
//     initial: {
//       transition: {
//         staggerChildren: 0.1,
//         staggerDirection: -1,
//       },
//     },
//   };

//   const childVariants = {
//     initial: {
//       scale: 1,
//     },
//     hover: {
//       scale: 1.2,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div>
//         <motion.div
//           className={styles.mainContainer}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div>
//             <motion.div className={styles.homeNavContainer}>
//               <motion.div className={styles.searchBarContainer}>
//                 <motion.div className={styles.searchBarWrapper}>
//                   <FontAwesomeIcon
//                     icon={faSearch}
//                     className={styles.searchIcon}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className={styles.searchBar}
//                   />
//                 </motion.div>
//               </motion.div>
//               <motion.img
//                 src={background4}
//                 className={styles.backgroundImage}
//                 initial={{ opacity: 1 }}
//                 animate={{
//                   opacity: 1,
//                   rotateX: [-5, 15, -15],
//                   rotateY: [-10, 10, -10],
//                 }}
//                 transition={{
//                   duration: 3,
//                   opacity: { duration: 30 },
//                   rotateX: {
//                     duration: 7,
//                     repeat: Infinity,
//                     repeatType: "mirror",
//                     ease: "easeInOut",
//                   },
//                   rotateY: {
//                     duration: 30,
//                     repeat: Infinity,
//                     repeatType: "mirror",
//                     ease: "easeInOut",
//                   },
//                 }}
//               />

//               <motion.div className={styles.signInButtonContainer}>
//                 <button
//                   className={styles.signInButton}
//                   onClick={handleSignInClick}
//                 >
//                   <FontAwesomeIcon
//                     icon={faUser}
//                     className={styles.signInButtonIcon}
//                   />
//                   Sign In
//                 </button>
//               </motion.div>
//             </motion.div>
//             <button className={styles.faqButton} onClick={handleFaqClick}>
//               FAQ
//             </button>
//           </div>

//           {/* //////header section//// */}
//           <div>
//             <motion.div
//               className={styles.loginSectionContainer}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 1 }}
//             >
//               <motion.p
//                 ref={textRef}
//                 className={styles.heading1}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100 }}
//                 variants={containerVariants}
//                 whileHover="hover"
//                 onHoverEnd={() =>
//                   textRef.current &&
//                   (textRef.current.style.transform = "scale(1)")
//                 }
//               >
//                 {"Quack!".split("").map((char, index) => (
//                   <motion.span
//                     key={index}
//                     variants={childVariants}
//                     className={styles.character}
//                   >
//                     {char}
//                   </motion.span>
//                 ))}
//               </motion.p>

//               <motion.p
//                 ref={heading2Ref}
//                 className={styles.heading2}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//               >
//                 {"A Realtime Collaborative Screenwriting App"
//                   .split(" ")
//                   .map((word, index) => (
//                     <span
//                       key={index}
//                       className={`${styles.word} ${styles.glowWord}`}
//                       style={{ display: "inline-block", marginRight: "0.3rem" }}
//                     >
//                       {word}
//                     </span>
//                   ))}
//               </motion.p>
//               <motion.p
//                 className={styles.missionStatement1}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//               >
//                 Create and share scripts with other users and create the vision
//                 you have always dreamed about!.
//               </motion.p>
//               <motion.button
//                 className={styles.tryItButton}
//                 onClick={() => {}}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.5 }}
//               >
//                 Try It Now
//               </motion.button>
//             </motion.div>
//             <ErrorBoundary fallback={""}>
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1, duration: 1 }}
//               >
//                 {/* <SplineScene /> */}
//               </motion.div>
//             </ErrorBoundary>
//           </div>
//         </motion.div>

//         {/* dark frontiers section */}
//         <div ref={containerRef} className={styles.darkFrontiersContainer}>
//           <div ref={blackBoxRef} className={styles.darkBlackBox}></div>
//           <div ref={textContainerRef} className={styles.darkTextContainer}>
//             <h1 ref={headingRef} className={styles.darkHeading}>
//               What is Quack!
//             </h1>
//             <p ref={paragraphRef} className={styles.darkParagraph}>
//               Meet Quack!, a cutting-edge mobile screenwriting app designed for
//               the modern screenwriter on the go. Seamlessly blending
//               functionality and convenience, Quack! allows users to craft, edit,
//               and collaborate on scripts directly from their mobile devices.
//               Whether you’re brainstorming ideas, writing dialogue, or revising
//               scenes, Quack! provides a user-friendly interface that makes
//               screenwriting a breeze.
//             </p>
//           </div>
//           <div ref={cubeContainerRef} className={styles.cubeContainer}>
//             <div className={styles.cubeWrapper}>
//               <Spline scene="https://prod.spline.design/hlJIQzJ8X2DX6g5J/scene.splinecode" />
//             </div>
//           </div>
//         </div>

//         {/* BentoBox section */}
//         <div>
//           <BentoBox1 />
//         </div>

//         {/* Phone section */}
//         <div className={styles.phoneSectionHeader}>
//           {/* mask section */}
//           <div ref={phoneSectionRef}>
//             <motion.div
//               ref={phoneTextRef}
//               initial={{ opacity: 0, y: 50 }}
//               animate={phoneSectionInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 1 }}
//             >
//               <div className={styles.phoneHeading}>
//                 Record speech for your app right on your mobile phone and
//                 continue working on your shared scripts
//               </div>
//               <div ref={humanSectionRef}>
//                 <HumanSection />
//               </div>
//             </motion.div>
//             <motion.div
//               ref={phoneRef}
//               initial={{ opacity: 0, x: 100, rotate: 90 }}
//               animate={
//                 phoneSectionInView ? { opacity: 1, x: 0, rotate: 0 } : {}
//               }
//               transition={{ duration: 1 }}
//               className={styles.phoneImage}
//             >
//               <Spline scene="https://prod.spline.design/LuVV6x9TaIevJB6h/scene.splinecode" />
//             </motion.div>
//           </div>
//         </div>

//         {/* Quack Icon section */}
//         <div className={styles.quackIconContainer}>
//           <motion.div
//             animate={{ rotateY: 3600 }}
//             transition={{
//               duration: 100,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           >
//             <div className={styles.quackIconWrapper}>
//               <Spline scene="https://prod.spline.design/CIYcRNgqTIgWyLLf/scene.splinecode" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll section */}
//         {/* <div>
//           <AppleScroll />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default LoginView;
