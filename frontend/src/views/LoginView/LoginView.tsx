import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ErrorBoundary from "../../MyErrorBoundary";
import background4 from "../../assets/images/background4.png";
import HumanSection from "../../components/humanSection/HumanSection";
import BentoBox1 from "../../components/BentoBox1/BentoBox1";
import AppleScroll from "../../components/appleScroll/appleScroll";
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({
              defaults: { duration: 1, ease: "power2.inOut" },
            });

            tl.fromTo(
              blackBoxRef.current,
              { x: "-100%", opacity: 0 },
              { x: "0%", opacity: 1 },
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
              )
              .fromTo(
                cubeContainerRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1 },
                "-=0.2",
              );
          }
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const letters = textRef.current?.querySelectorAll("span");
    if (letters) {
      letters.forEach((letter) => {
        gsap.fromTo(
          letter,
          { scale: 1 },
          {
            scale: 1.2,
            duration: 0.3,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.5,
            paused: true,
          },
        );

        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, { scale: 1.5, duration: 0.3, ease: "power1.inOut" });
        });

        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, { scale: 1, duration: 0.3, ease: "power1.inOut" });
        });
      });
    }
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
      { x: "100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: humanSectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      },
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
      <div>
        <motion.div
          className={styles.mainContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
                initial={{ opacity: 1 }}
                animate={{
                  opacity: 1,
                  rotateX: [-5, 15, -15],
                  rotateY: [-10, 10, -10],
                }}
                transition={{
                  duration: 3,
                  opacity: { duration: 30 },
                  rotateX: {
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                  rotateY: {
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
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
                <button className={styles.faqButton} onClick={handleFaqClick}>
                  FAQ
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* //////header section//// */}
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
                onHoverEnd={() => gsap.to(textRef.current, { scale: 1 })}
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
                className={styles.heading2}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                A Realtime Collaborative Screenwriting App
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
              >
                {/* <SplineScene /> */}
              </motion.div>
            </ErrorBoundary>
          </div>
        </motion.div>

        {/* dark frontiers section */}
        <div ref={containerRef} className={styles.darkFrontiersContainer}>
          <div ref={blackBoxRef} className={styles.darkBlackBox}></div>
          <div ref={textContainerRef} className={styles.darkTextContainer}>
            <h1 ref={headingRef} className={styles.darkHeading}>
              What is Quack!
            </h1>
            <p ref={paragraphRef} className={styles.darkParagraph}>
              Meet Quack!, a cutting-edge mobile screenwriting app designed for
              the modern screenwriter on the go. Seamlessly blending
              functionality and convenience, Quack! allows users to craft, edit,
              and collaborate on scripts directly from their mobile devices.
              Whether you’re brainstorming ideas, writing dialogue, or revising
              scenes, Quack! provides a user-friendly interface that makes
              screenwriting a breeze.
            </p>
          </div>
          <div ref={cubeContainerRef} className={styles.cubeContainer}>
            <div className={styles.cubeWrapper}>
              <Spline scene="https://prod.spline.design/hlJIQzJ8X2DX6g5J/scene.splinecode" />
            </div>
          </div>
        </div>

        {/* BentoBox section */}
        <div>
          <BentoBox1 />
        </div>

        {/* Phone section */}
        <div className={styles.phoneSectionHeader}>
          {/* mask section */}
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

        {/* Quack Icon section */}
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

        {/* Scroll section */}
        {/* <div>
          <AppleScroll />
        </div> */}
      </div>
    </div>
  );
};

export default LoginView;

//////////////////

// import React, { useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Spline from "@splinetool/react-spline";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
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

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const tl = gsap.timeline({
//               defaults: { duration: 1, ease: "power2.inOut" },
//             });

//             tl.fromTo(
//               blackBoxRef.current,
//               { x: "-100%", opacity: 0 },
//               { x: "0%", opacity: 1 },
//             )
//               .fromTo(
//                 textContainerRef.current,
//                 { x: "100%", opacity: 0 },
//                 { x: "0%", opacity: 1 },
//                 "-=0.8",
//               )
//               .fromTo(
//                 headingRef.current,
//                 { y: "-50%", opacity: 0 },
//                 { y: "0%", opacity: 1 },
//                 "-=0.6",
//               )
//               .fromTo(
//                 paragraphRef.current,
//                 { y: "50%", opacity: 0 },
//                 { y: "0%", opacity: 1 },
//                 "-=0.4",
//               )
//               .fromTo(
//                 cubeContainerRef.current,
//                 { scale: 0, opacity: 0 },
//                 { scale: 1, opacity: 1 },
//                 "-=0.2",
//               );
//           }
//         });
//       },
//       { threshold: 0.1 },
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const letters = textRef.current?.querySelectorAll("span");
//     if (letters) {
//       letters.forEach((letter) => {
//         gsap.fromTo(
//           letter,
//           { scale: 1 },
//           {
//             scale: 1.2,
//             duration: 0.3,
//             ease: "power1.inOut",
//             yoyo: true,
//             repeat: -1,
//             repeatDelay: 0.5,
//             paused: true,
//           },
//         );

//         letter.addEventListener("mouseenter", () => {
//           gsap.to(letter, { scale: 1.5, duration: 0.3, ease: "power1.inOut" });
//         });

//         letter.addEventListener("mouseleave", () => {
//           gsap.to(letter, { scale: 1, duration: 0.3, ease: "power1.inOut" });
//         });
//       });
//     }
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
//           start: "top 80%",
//           end: "top 30%",
//           scrub: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       phoneRef.current,
//       { x: "100%", opacity: 0 },
//       {
//         x: "0%",
//         opacity: 1,
//         scrollTrigger: {
//           trigger: phoneRef.current,
//           start: "top 80%",
//           end: "top 30%",
//           scrub: true,
//         },
//       },
//     );

//     gsap.to(phoneRef.current, {
//       x: "-100%",
//       scrollTrigger: {
//         trigger: phoneRef.current,
//         start: "top 30%",
//         end: "top -20%",
//         scrub: true,
//       },
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
//                 <button className={styles.faqButton} onClick={handleFaqClick}>
//                   FAQ
//                 </button>
//               </motion.div>
//             </motion.div>
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
//                 onHoverEnd={() => gsap.to(textRef.current, { scale: 1 })}
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
//                 className={styles.heading2}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//               >
//                 A Realtime Collaborative Screenwriting App
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
//           <div ref={phoneSectionRef}>
//             <motion.div
//               ref={phoneTextRef}
//               initial={{ opacity: 0, x: -100 }}
//               animate={phoneSectionInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 1 }}
//             >
//               <div className={styles.phoneHeading}>
//                 Record speech for your app right on your mobile phone and
//                 continue working on your shared scripts
//               </div>
//             </motion.div>
//             <motion.div
//               ref={phoneRef}
//               initial={{ opacity: 0, x: 100 }}
//               animate={phoneSectionInView ? { opacity: 1, x: 0 } : {}}
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

//         {/* mask section */}
//         <div>
//           <HumanSection />
//         </div>

//         {/* Scroll section */}
//         <div>
//           <AppleScroll />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginView;

//////////////

// import React, { useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Spline from "@splinetool/react-spline";
// import gsap from "gsap";
// import ErrorBoundary from "../../MyErrorBoundary";
// import background4 from "../../assets/images/background4.png";
// // import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
// import HumanSection from "../../components/humanSection/HumanSection";
// import BentoBox1 from "../../components/BentoBox1/BentoBox1";
// import AppleScroll from "../../components/appleScroll/appleScroll";
// import styles from "./LoginView.module.css";

// const LoginView: React.FC = () => {
//   const navigate = useNavigate();
//   const textRef = useRef<HTMLParagraphElement>(null);

//   const containerRef = useRef(null);
//   const blackBoxRef = useRef(null);
//   const textContainerRef = useRef(null);
//   const headingRef = useRef(null);
//   const paragraphRef = useRef(null);
//   const cubeContainerRef = useRef(null);

//   // useEffect(() => {
//   //   window.scrollTo(0, 0);
//   // }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const tl = gsap.timeline({
//               defaults: { duration: 1, ease: "power2.inOut" },
//             });

//             tl.fromTo(
//               blackBoxRef.current,
//               { x: "-100%", opacity: 0 },
//               { x: "0%", opacity: 1 },
//             )
//               .fromTo(
//                 textContainerRef.current,
//                 { x: "100%", opacity: 0 },
//                 { x: "0%", opacity: 1 },
//                 "-=0.8",
//               )
//               .fromTo(
//                 headingRef.current,
//                 { y: "-50%", opacity: 0 },
//                 { y: "0%", opacity: 1 },
//                 "-=0.6",
//               )
//               .fromTo(
//                 paragraphRef.current,
//                 { y: "50%", opacity: 0 },
//                 { y: "0%", opacity: 1 },
//                 "-=0.4",
//               )
//               .fromTo(
//                 cubeContainerRef.current,
//                 { scale: 0, opacity: 0 },
//                 { scale: 1, opacity: 1 },
//                 "-=0.2",
//               );
//           }
//         });
//       },
//       { threshold: 0.1 },
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const letters = textRef.current?.querySelectorAll("span");
//     if (letters) {
//       letters.forEach((letter) => {
//         gsap.fromTo(
//           letter,
//           { scale: 1 },
//           {
//             scale: 1.2,
//             duration: 0.3,
//             ease: "power1.inOut",
//             yoyo: true,
//             repeat: -1,
//             repeatDelay: 0.5,
//             paused: true,
//           },
//         );

//         letter.addEventListener("mouseenter", () => {
//           gsap.to(letter, { scale: 1.5, duration: 0.3, ease: "power1.inOut" });
//         });

//         letter.addEventListener("mouseleave", () => {
//           gsap.to(letter, { scale: 1, duration: 0.3, ease: "power1.inOut" });
//         });
//       });
//     }
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
//             <div className={styles.faqButtonContainer}>
//               <button className={styles.faqButton} onClick={handleFaqClick}>
//                 FAQ
//               </button>
//             </div>
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
//                 onHoverEnd={() => gsap.to(textRef.current, { scale: 1 })}
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
//                 className={styles.heading2}
//                 initial={{ x: -200, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//               >
//                 A Realtime Collaborative Screenwriting App
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
//           <div ref={phoneSectionRef}>
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={phoneSectionInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 1 }}
//             >
//               <div className={styles.phoneHeading}>
//                 Record speech for your app right on your mobile phone and
//                 continue working on your shared scripts
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={phoneSectionInView ? { opacity: 1 } : {}}
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

//         {/* mask section */}
//         <div>
//           <HumanSection />
//         </div>

//         {/* Scroll section */}
//         <div>
//           <AppleScroll />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginView;
