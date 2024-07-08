import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Spline from "@splinetool/react-spline";
import background4 from "../../assets/images/background4.png";
import Ball3D1 from "../../components/Ball3D1/Ball3D1";
import ErrorBoundary from "../../MyErrorBoundary";
import styles from "./LoginView.module.css";

const SplineScene: React.FC = () => (
  <Spline scene="https://prod.spline.design/XYZ123/scene.splinecode" />
);

const LoginView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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
            className={styles.heading1}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Quack!
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
                Quack is a screenwriting app made for busy people on the go. Our
                platform allows you to seamlessly work on your home computer,
                and then pick right up and go on your mobile phone. We allow for
                real time collaboration, AI help and a robust communication
                platform, featuring a notes section and a chat app. Quack is a
                screenwriting app made for busy people on the go. Our platform
                allows you to seamlessly work on your home computer, and then
                pick right up and go on your mobile phone. We allow for real
                time collaboration, AI help and a robust communication platform,
                featuring a notes section and a chat app. Quack is a
                screenwriting app made for busy people on the go. Our platform
                allows you to seamlessly work on your home computer, and then
                pick right up and go on your mobile phone. We allow for real
                time collaboration.
              </p>
            </motion.div>
            <motion.div
              className={styles.textBox}
              initial={{ opacity: 0, x: 100 }}
              animate={textBoxesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              <p>
                Quack is a screenwriting app made for busy people on the go. Our
                platform allows you to seamlessly work on your home computer,
                and then pick right up and go on your mobile phone. We allow for
                real time collaboration, AI help and a robust communication
                platform, featuring a notes section and a chat app. Quack is a
                screenwriting app made for busy people on the go. Our platform
                allows you to seamlessly work on your home computer, and then
                pick right up and go on your mobile phone. We allow for real
                time collaboration, AI help and a robust communication platform,
                featuring a notes section and a chat app. Quack is a
                screenwriting app made for busy people on the go. Our platform
                allows you to seamlessly work on your home computer, and then
                pick right up and go on your mobile phone. We allow for real
                time collaboration.
              </p>
            </motion.div>
            <motion.div
              className={styles.textBox}
              initial={{ opacity: 0, x: 100 }}
              animate={textBoxesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 2, duration: 1.5 }}
            >
              <p>
                Quack is a screenwriting app made for busy people on the go. Our
                platform allows you to seamlessly work on your home computer,
                and then pick right up and go on your mobile phone. We allow for
                real time collaboration, AI help and a robust communication
                platform, featuring a notes section and a chat app. Quack is a
                screenwriting app made for busy people on the go. Our platform
                allows you to seamlessly work on your home computer, and then
                pick right up and go on your mobile phone. We allow for real
                time collaboration, AI help and a robust communication platform,
                featuring a notes section and a chat app. Quack is a
                screenwriting app made for busy people on the go. Our platform
                allows you to seamlessly work on your home computer, and then
                pick right up and go on your mobile phone. We allow for real
                time collaboration.
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
                Record speech for your script right on your mobile phone and
                continue working on your shared scripts
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={phoneSectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 3 }}
              className={styles.phoneImage}
            >
              <Spline scene="https://prod.spline.design/LuVV6x9TaIevJB6h/scene.splinecode" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

///////////

// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Spline from "@splinetool/react-spline";
// import background4 from "../../assets/images/background4.png";
// import Ball3D1 from "../../components/Ball3D1/Ball3D1";
// import ErrorBoundary from "../../MyErrorBoundary";
// import styles from "./LoginView.module.css";

// const SplineScene: React.FC = () => (
//   <Spline scene="https://prod.spline.design/XYZ123/scene.splinecode" />
// );

// const LoginView: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSignInClick = () => {
//     navigate("/scriptslibrary");
//   };

//   return (
//     <div className={styles.wrapper}>
//       <motion.div
//         className={styles.mainContainer}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.div className={styles.homeNavContainer}>
//           <motion.div className={styles.searchBarContainer}>
//             <motion.div className={styles.searchBarWrapper}>
//               <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className={styles.searchBar}
//               />
//             </motion.div>
//           </motion.div>
//           <motion.img
//             src={background4}
//             className={styles.backgroundImage}
//             initial={{ opacity: 1 }}
//             animate={{
//               opacity: 1,
//               rotateX: [-5, 15, -15],
//               rotateY: [-10, 10, -10],
//             }}
//             transition={{
//               duration: 3,
//               opacity: { duration: 30 },
//               rotateX: {
//                 duration: 7,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 ease: "easeInOut",
//               },
//               rotateY: {
//                 duration: 30,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 ease: "easeInOut",
//               },
//             }}
//           />

//           <motion.div className={styles.signInButtonContainer}>
//             <button className={styles.signInButton} onClick={handleSignInClick}>
//               <FontAwesomeIcon
//                 icon={faUser}
//                 className={styles.signInButtonIcon}
//               />
//               Sign In
//             </button>
//           </motion.div>
//         </motion.div>
//         <motion.div
//           className={styles.loginSectionContainer}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           {/* <motion.div className={styles.ball3D1Container}>
//             <div className={styles.ball3D1Wrapper}>
//               <Ball3D1 />
//             </div>
//           </motion.div> */}
//           <motion.p
//             className={styles.heading1}
//             initial={{ x: -200, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100 }}
//           >
//             Quack!
//           </motion.p>
//           <motion.p
//             className={styles.heading2}
//             initial={{ x: -200, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//           >
//             A Realtime Collaborative Screenwriting App
//           </motion.p>
//           <motion.p
//             className={styles.missionStatement1}
//             initial={{ x: -200, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//           >
//             Create and share scripts with other users and create the vision you
//             have always dreamed about!.
//           </motion.p>
//           <motion.button
//             className={styles.tryItButton}
//             onClick={() => {}}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             Try It Now
//           </motion.button>
//         </motion.div>
//         <ErrorBoundary fallback={""}>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             {/* <SplineScene /> */}
//           </motion.div>
//         </ErrorBoundary>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginView;

/////////////////////////////

// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import background4 from "../../assets/images/background4.png";
// import Ball3D1 from "../../components/Ball3D1/Ball3D1";
// import styles from "./LoginView.module.css";

// const LoginView: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSignInClick = () => {
//     navigate("/scriptslibrary");
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.mainContainer}>
//         <div className={styles.homeNavContainer}>
//           <div className={styles.searchBarContainer}>
//             <div className={styles.searchBarWrapper}>
//               <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className={styles.searchBar}
//               />
//             </div>
//           </div>
//           <img src={background4} className={styles.backgroundImage} />
//           <div className={styles.signInButtonContainer}>
//             <button className={styles.signInButton} onClick={handleSignInClick}>
//               <FontAwesomeIcon
//                 icon={faUser}
//                 className={styles.signInButtonIcon}
//               />
//               Sign In
//             </button>
//           </div>
//         </div>
//         <div className={styles.loginSectionContainer}>
//           <div className={styles.ball3D1Container}>
//             <Ball3D1 />
//           </div>
//           <p className={styles.heading1}>Quack!</p>
//           <p className={styles.heading2}>
//             A Realtime Collaborative Screenwriting App
//           </p>
//           <p className={styles.missionStatement1}>
//             Create and share scripts with other users and create the vision you
//             have always dreamed about!.
//           </p>
//           <button className={styles.tryItButton} onClick={() => {}}>
//             Try It Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginView;
