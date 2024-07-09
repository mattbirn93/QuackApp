import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import ErrorBoundary from "../../MyErrorBoundary";
import background4 from "../../assets/images/background4.png";
import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
import Carousel from "../../components/carousel/Carousel";
// import Carousel2 from "../../components/Carousel2/Carousel2";
import styles from "./LoginView.module.css";

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleSignInClick = () => {
    navigate("/scriptslibrary");
  };

  const { ref: textBoxesRef, inView: textBoxesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: phoneSectionRef, inView: phoneSectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: artisticSectionRef, inView: artisticSectionInView } = useInView({
    triggerOnce: true,
    threshold: 0,
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
      <motion.div
        className={styles.mainContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className={styles.homeNavContainer}>
          <motion.div className={styles.searchBarContainer}>
            <motion.div className={styles.searchBarWrapper}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
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
            <button className={styles.signInButton} onClick={handleSignInClick}>
              <FontAwesomeIcon
                icon={faUser}
                className={styles.signInButtonIcon}
              />
              Sign In
            </button>
          </motion.div>
        </motion.div>
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
            Create and share scripts with other users and create the vision you
            have always dreamed about!.
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
      </motion.div>

      {/* New Section with Text Boxes */}
      <div>
        <div ref={textBoxesRef}>
          <motion.div
            className={styles.textBoxesContainer}
            initial={{ opacity: 0 }}
            animate={textBoxesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.0, duration: 2 }}
          >
            <motion.div
              className={styles.textBox}
              initial={{ opacity: 0, x: 100 }}
              animate={textBoxesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1, duration: 1.5 }}
            >
              <p>
                Quack! is a cutting-edge mobile screenwriting app designed for
                the modern screenwriter on the go. Seamlessly blending
                functionality and convenience, Quack! allows users to craft,
                edit, and collaborate on scripts directly from their mobile
                devices. Whether you’re brainstorming ideas, writing dialogue,
                or revising scenes, Quack! provides a user-friendly interface
                that makes screenwriting a breeze. With real-time collaboration
                features, multiple users can work on the same script
                simultaneously, ensuring that creativity flows uninterrupted and
                ideas are shared instantaneously. One of the standout features
                of Quack! is its integration of advanced speech-to-text
                capabilities.
              </p>
            </motion.div>
            <motion.div
              className={styles.textBox}
              initial={{ opacity: 0, x: 100 }}
              animate={textBoxesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              <p>
                Quack! is a cutting-edge mobile screenwriting app designed for
                the modern screenwriter on the go. Seamlessly blending
                functionality and convenience, Quack! allows users to craft,
                edit, and collaborate on scripts directly from their mobile
                devices. Whether you’re brainstorming ideas, writing dialogue,
                or revising scenes, Quack! provides a user-friendly interface
                that makes screenwriting a breeze. With real-time collaboration
                features, multiple users can work on the same script
                simultaneously, ensuring that creativity flows uninterrupted and
                ideas are shared instantaneously. One of the standout features
                of Quack! is its integration of advanced speech-to-text
                capabilities.
              </p>
            </motion.div>
            <motion.div
              className={styles.textBox}
              initial={{ opacity: 0, x: 100 }}
              animate={textBoxesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 2, duration: 1.5 }}
            >
              <p>
                Quack! is a cutting-edge mobile screenwriting app designed for
                the modern screenwriter on the go. Seamlessly blending
                functionality and convenience, Quack! allows users to craft,
                edit, and collaborate on scripts directly from their mobile
                devices. Whether you’re brainstorming ideas, writing dialogue,
                or revising scenes, Quack! provides a user-friendly interface
                that makes screenwriting a breeze. With real-time collaboration
                features, multiple users can work on the same script
                simultaneously, ensuring that creativity flows uninterrupted and
                ideas are shared instantaneously. One of the standout features
                of Quack! is its integration of advanced speech-to-text
                capabilities.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Phone section */}
        <div className={styles.phoneSectionHeader}>
          <div ref={phoneSectionRef}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={phoneSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className={styles.phoneHeading}>
                Record speech for your app right on your mobile phone and
                continue working on your shared scripts
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={phoneSectionInView ? { opacity: 1 } : {}}
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

        {/* dark frontiers section */}
        <div className={styles.darkFrontiersContainer}>
          <div className={styles.darkBlackBox}></div>
          <div className={styles.darkTextContainer}>
            <h1 className={styles.darkHeading}>What is Quack!</h1>
            <p className={styles.darkParagraph}>
              Meet Quack!, a cutting-edge mobile screenwriting app designed for
              the modern screenwriter on the go. Seamlessly blending
              functionality and convenience, Quack! allows users to craft, edit,
              and collaborate on scripts directly from their mobile devices.
              Whether you’re brainstorming ideas, writing dialogue, or revising
              scenes, Quack! provides a user-friendly interface that makes
              screenwriting a breeze.
            </p>
          </div>

          <div className={styles.cubeContainer}>
            <div className={styles.cubeWrapper}>
              <Spline scene="https://prod.spline.design/hlJIQzJ8X2DX6g5J/scene.splinecode" />
            </div>
          </div>
        </div>

        {/* carousel section */}
        <div>
          <Carousel />
        </div>

        {/* Artistic Section */}
        <div ref={artisticSectionRef}>
          <motion.div
            className={styles.artisticContainer}
            initial={{ opacity: 0 }}
            animate={artisticSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 2 }}
          >
            <motion.div
              className={styles.artisticBox}
              initial={{ opacity: 0, x: 100 }}
              animate={artisticSectionInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className={styles.titleText}>Desktop</div>
              <motion.div
                className={styles.revealText}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className={styles.artisticPragraph}>
                  Quack! is a cutting-edge mobile screenwriting app designed for
                  the modern screenwriter on the go. Seamlessly blending
                  functionality and convenience, Quack! allows users to craft,
                  edit, and collaborate on scripts directly from their mobile
                  devices. Whether you’re brainstorming ideas, writing dialogue,
                  or revising scenes, Quack! provides a user-friendly interface
                  that makes screenwriting a breeze. With real-time
                  collaboration features, multiple users can work on the same
                  script simultaneously, ensuring that creativity flows
                  uninterrupted and ideas are shared instantaneously. One of the
                  standout features of Quack! is its integration of advanced
                  speech-to-text capabilities. This allows screenwriters to
                  dictate their thoughts and ideas, which are then transcribed
                  directly into the script. The app also boasts a robust
                  communication platform that includes a notes section and an
                  in-app chat function, making it easy for writers to
                  communicate and leave feedback. With Quack!, screenwriters can
                  transition smoothly between their home computer and mobile
                  phone, ensuring that they can capture their creativity
                  whenever and wherever inspiration strikes.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.artisticBox}
              initial={{ opacity: 0, x: 100 }}
              animate={artisticSectionInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className={styles.titleText}>Mobile</div>
              <motion.div
                className={styles.revealText}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className={styles.artisticPragraph}>
                  Quack! is a cutting-edge mobile screenwriting app designed for
                  the modern screenwriter on the go. Seamlessly blending
                  functionality and convenience, Quack! allows users to craft,
                  edit, and collaborate on scripts directly from their mobile
                  devices. Whether you’re brainstorming ideas, writing dialogue,
                  or revising scenes, Quack! provides a user-friendly interface
                  that makes screenwriting a breeze. With real-time
                  collaboration features, multiple users can work on the same
                  script simultaneously, ensuring that creativity flows
                  uninterrupted and ideas are shared instantaneously. One of the
                  standout features of Quack! is its integration of advanced
                  speech-to-text capabilities. This allows screenwriters to
                  dictate their thoughts and ideas, which are then transcribed
                  directly into the script. The app also boasts a robust
                  communication platform that includes a notes section and an
                  in-app chat function, making it easy for writers to
                  communicate and leave feedback. With Quack!, screenwriters can
                  transition smoothly between their home computer and mobile
                  phone, ensuring that they can capture their creativity
                  whenever and wherever inspiration strikes.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.artisticBox}
              initial={{ opacity: 0, x: 100 }}
              animate={artisticSectionInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className={styles.titleText}>Speech To Text</div>
              <motion.div
                className={styles.revealText}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className={styles.artisticPragraph}>
                  Quack! is a cutting-edge mobile screenwriting app designed for
                  the modern screenwriter on the go. Seamlessly blending
                  functionality and convenience, Quack! allows users to craft,
                  edit, and collaborate on scripts directly from their mobile
                  devices. Whether you’re brainstorming ideas, writing dialogue,
                  or revising scenes, Quack! provides a user-friendly interface
                  that makes screenwriting a breeze. With real-time
                  collaboration features, multiple users can work on the same
                  script simultaneously, ensuring that creativity flows
                  uninterrupted and ideas are shared instantaneously. One of the
                  standout features of Quack! is its integration of advanced
                  speech-to-text capabilities. This allows screenwriters to
                  dictate their thoughts and ideas, which are then transcribed
                  directly into the script. The app also boasts a robust
                  communication platform that includes a notes section and an
                  in-app chat function, making it easy for writers to
                  communicate and leave feedback. With Quack!, screenwriters can
                  transition smoothly between their home computer and mobile
                  phone, ensuring that they can capture their creativity
                  whenever and wherever inspiration strikes.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Page Section */}
          <div className={styles.pageSection}>
            <div className={styles.maskedImageContainer}>
              <img
                src={PageIcon1}
                alt="masked"
                className={styles.maskedImage}
              />
            </div>
            <motion.p
              className={styles.pageText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5 }}
            >
              Quack! is a cutting-edge mobile screenwriting app designed for the
              modern screenwriter on the go. Seamlessly blending functionality
              and convenience, Quack! allows users to craft, edit, and
              collaborate on scripts directly from their mobile devices. Whether
              you’re brainstorming ideas, writing dialogue, or revising scenes,
              Quack! provides a user-friendly interface that makes screenwriting
              a breeze. With real-time collaboration features, multiple users
              can work on the same script simultaneously, ensuring that
              creativity flows uninterrupted and ideas are shared
              instantaneously. One of the standout features of Quack! is its
              integration of advanced speech-to-text capabilities. This allows
              screenwriters to dictate their thoughts and ideas, which are then
              transcribed directly into the script. The app also boasts a robust
              communication platform that includes a notes section and an in-app
              chat function, making it easy for writers to communicate and leave
              feedback. With Quack!, screenwriters can transition smoothly
              between their home computer and mobile phone, ensuring that they
              can capture their creativity whenever and wherever inspiration
              strikes.
            </motion.p>
            <div className={styles.maskedImageContainer2}>
              <img
                src={PageIcon1}
                alt="masked2"
                className={styles.maskedImage2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
