import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BentoBox.module.css";
import Neon1 from "../../assets/images/neon-icon1.jpg";
import Neon2 from "../../assets/images/neon-icon2.jpg";
import Neon3 from "../../assets/images/neon-icon3.jpg";
import Neon4 from "../../assets/images/neon-icon4.jpg";
import Neon5 from "../../assets/images/neon-icon5.jpg";
import Neon6 from "../../assets/images/neon-icon6.jpg";

const carouselImages = [Neon1, Neon2, Neon3, Neon4, Neon5, Neon6];

const data = [
  {
    title: "Create Scripts",
    content: "Easily create and edit scripts with a user-friendly interface.",
    image: Neon1,
    customElement: (
      <div className={styles.customBox1}>
        Quack is a powerful collaborative app that allows you to achieve the
        story of your dreams
      </div>
    ),
    flip: true,
  },
  {
    title: "Collaborate",
    content: "Work together with others in real-time.",
    image: Neon2,
    flip: false,
  },
  {
    title: "Speech-to-Text",
    content:
      "Use advanced speech-to-text capabilities to dictate your scripts.",
    image: Neon3,
    flip: false,
  },
  {
    title: "Notes and Chat",
    content:
      "Communicate with your team using the integrated notes and chat features.",
    image: Neon4,
    flip: false,
  },
  {
    title: "Review and Feedback",
    content: "Receive feedback and review scripts collaboratively.",
    image: Neon5,
    flip: true,
  },
  {
    title: "Voice Commands",
    content: "Record your ideas and watch them come to life.",
    image: Neon6,
    flip: false,
  },
  {
    title: "Mobile",
    content: "Works on any mobile device.",
    image: null,
    flip: false,
  },
  {
    title: "Desktop",
    content: "Works on any desktop device.",
    image: null,
    flip: false,
  },
  {
    title: "Portable",
    content: "Create on the go.",
    image: null,
    flip: false,
  },
];

const BentoBox = () => {
  const refs = data.map(() => useRef<HTMLDivElement>(null));
  const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.1, rotate: 5 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.bentoBoxContainer}>
      <div className={styles.bentoBlackBox}></div>
      <div className={styles.bentoBox}>
        {data.map((item, index) => (
          <motion.div
            key={index}
            ref={refs[index]}
            className={`${styles.box} ${styles[`box${index + 1}`]}`}
            initial="hidden"
            animate={isInView[index] ? "visible" : "hidden"}
            whileHover={{ zIndex: 3 }}
          >
            <motion.h3
              className={styles.title}
              variants={textVariants}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              {item.title}
            </motion.h3>
            <motion.p
              className={styles.content}
              variants={contentVariants}
              transition={{ duration: 0.5, delay: index * 0.4 }}
            >
              {item.content}
            </motion.p>
            {item.image && (
              <motion.div
                className={item.flip ? styles.flipCard : ""}
                whileHover={item.flip ? { rotateY: 180 } : {}}
              >
                <motion.img
                  className={styles.flipCardFront}
                  src={item.image}
                  alt={item.title}
                  variants={imageVariants}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                />
                {item.flip && (
                  <motion.div className={styles.flipCardBack}></motion.div>
                )}
              </motion.div>
            )}
            {/* {item.customElement && (
              <motion.div
                className={styles.customElement}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {item.customElement}
              </motion.div>
            )} */}
            {index === 0 && (
              <div className={styles.carouselContainer}>
                <motion.img
                  key={currentImage}
                  src={carouselImages[currentImage]}
                  alt="carousel"
                  className={styles.carouselImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </div>
            )}
            {index === 1 || index === 4 ? (
              <motion.div
                className={styles.hoverContent}
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <p>
                  More about Quack: This is an amazing feature that enhances
                  your experience.
                </p>
              </motion.div>
            ) : null}
          </motion.div>
        ))}
      </div>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[
            "Fast",
            "Reliable",
            "Secure",
            "Collaborate",
            "Efficient",
            "Powerful",
            "Creative",
            "User-Friendly",
            "Innovative",
            "Robust",
            "Flexible",
            "Versatile",
            "Dynamic",
            "Adaptive",
            "Responsive",
          ].map((word, index) => (
            <div key={index} className={styles.marqueeButton}>
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoBox;

//////

// import React, { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import styles from "./BentoBox.module.css";
// import Neon1 from "../../assets/images/neon-icon1.jpg";
// import Neon2 from "../../assets/images/neon-icon2.jpg";
// import Neon3 from "../../assets/images/neon-icon3.jpg";
// import Neon4 from "../../assets/images/neon-icon4.jpg";
// import Neon5 from "../../assets/images/neon-icon5.jpg";
// import Neon6 from "../../assets/images/neon-icon6.jpg";

// const data = [
//   {
//     title: "Create Scripts",
//     content: "Easily create and edit scripts with a user-friendly interface.",
//     image: Neon1,
//     customElement: (
//       <div className={styles.customBox1}>
//         Quack is a powerful collaborative app that allows you to achieve the
//         story of your dreams
//       </div>
//     ),
//     flip: true,
//   },
//   {
//     title: "Collaborate",
//     content: "Work together with others in real-time.",
//     image: Neon2,
//     flip: false,
//   },
//   {
//     title: "Speech-to-Text",
//     content:
//       "Use advanced speech-to-text capabilities to dictate your scripts.",
//     image: Neon3,
//     flip: false,
//   },
//   {
//     title: "Notes and Chat",
//     content:
//       "Communicate with your team using the integrated notes and chat features.",
//     image: Neon4,
//     flip: false,
//   },
//   {
//     title: "Review and Feedback",
//     content: "Receive feedback and review scripts collaboratively.",
//     image: Neon5,
//     flip: true,
//   },
//   {
//     title: "Voice Commands",
//     content: "Record your ideas and watch them come to life.",
//     image: Neon6,
//     flip: false,
//   },
//   {
//     title: "Mobile",
//     content: "Works on any mobile device.",
//     image: null, // No image for this box
//     flip: false,
//   },
//   {
//     title: "Desktop",
//     content: "Works on any desktop device.",
//     image: null, // No image for this box
//     flip: false,
//   },
//   {
//     title: "Portable",
//     content: "Create on the go.",
//     image: null,
//     flip: false,
//   },
// ];

// const BentoBox = () => {
//   const refs = data.map(() => useRef<HTMLDivElement>(null));
//   const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));
//   const [isOpen, setIsOpen] = React.useState(false);

//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { scale: 1.1 },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//     hover: { scale: 1.1, rotate: 5 },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
//   };

//   return (
//     <div className={styles.bentoBoxContainer}>
//       <div className={styles.bentoBlackBox}></div>
//       <div className={styles.bentoBox}>
//         {data.map((item, index) => (
//           <motion.div
//             key={index}
//             ref={refs[index]}
//             className={`${styles.box} ${styles[`box${index + 1}`]}`}
//             initial="hidden"
//             animate={isInView[index] ? "visible" : "hidden"}
//             whileHover={{ zIndex: 3 }}
//           >
//             <motion.h3
//               className={styles.title}
//               variants={textVariants}
//               transition={{ duration: 0.5, delay: index * 0.3 }}
//             >
//               {item.title}
//             </motion.h3>
//             <motion.p
//               className={styles.content}
//               variants={contentVariants}
//               transition={{ duration: 0.5, delay: index * 0.4 }}
//             >
//               {item.content}
//             </motion.p>
//             {item.image && (
//               <motion.div
//                 className={item.flip ? styles.flipCard : ""}
//                 whileHover={item.flip ? { rotateY: 180 } : {}}
//               >
//                 <motion.img
//                   className={styles.flipCardFront}
//                   src={item.image}
//                   alt={item.title}
//                   variants={imageVariants}
//                   transition={{ duration: 0.5, delay: index * 0.5 }}
//                 />
//                 {item.flip && (
//                   <motion.div className={styles.flipCardBack}></motion.div>
//                 )}
//               </motion.div>
//             )}
//             {item.customElement && (
//               <motion.div
//                 className={styles.customElement}
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {item.customElement}
//               </motion.div>
//             )}
//             {index === 0 || index === 1 || index === 4 ? (
//               <motion.div
//                 className={styles.hoverContent}
//                 initial={{ opacity: 0, height: 0 }}
//                 whileHover={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p>
//                   More about Quack: This is an amazing feature that enhances
//                   your experience.
//                 </p>
//               </motion.div>
//             ) : null}
//           </motion.div>
//         ))}
//         <div className={styles.marquee}>
//           <div className={styles.marqueeTrack}>
//             {[
//               "Fast",
//               "Reliable",
//               "Secure",
//               "Collaborate",
//               "Efficient",
//               "Powerful",
//               "Creative",
//               "User-Friendly",
//               "Innovative",
//               "Robust",
//               "Flexible",
//               "Versatile",
//               "Dynamic",
//               "Adaptive",
//               "Responsive",
//             ].map((word, index) => (
//               <div key={index} className={styles.marqueeButton}>
//                 {word}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BentoBox;

///////////////////

// import React, { useRef, useState, useEffect } from "react";
// import { motion, useInView } from "framer-motion";
// import styles from "./BentoBox.module.css";
// import Neon1 from "../../assets/images/neon-icon1.jpg";
// import Neon2 from "../../assets/images/neon-icon2.jpg";
// import Neon3 from "../../assets/images/neon-icon3.jpg";
// import Neon4 from "../../assets/images/neon-icon4.jpg";
// import Neon5 from "../../assets/images/neon-icon5.jpg";
// import Neon6 from "../../assets/images/neon-icon6.jpg";

// const carouselImages = [Neon1, Neon2, Neon3, Neon4, Neon5, Neon6];

// const data = [
//   {
//     title: "Create Scripts",
//     content: "Easily create and edit scripts with a user-friendly interface.",
//     image: Neon1,
//     customElement: (
//       <div className={styles.customBox1}>
//         Quack is a powerful collaborative app that allows you to achieve the
//         story of your dreams
//       </div>
//     ),
//     flip: true,
//   },
//   {
//     title: "Collaborate",
//     content: "Work together with others in real-time.",
//     image: Neon2,
//     flip: false,
//   },
//   {
//     title: "Speech-to-Text",
//     content:
//       "Use advanced speech-to-text capabilities to dictate your scripts.",
//     image: Neon3,
//     flip: false,
//   },
//   {
//     title: "Notes and Chat",
//     content:
//       "Communicate with your team using the integrated notes and chat features.",
//     image: Neon4,
//     flip: false,
//   },
//   {
//     title: "Review and Feedback",
//     content: "Receive feedback and review scripts collaboratively.",
//     image: Neon5,
//     flip: true,
//   },
//   {
//     title: "Voice Commands",
//     content: "Record your ideas and watch them come to life.",
//     image: Neon6,
//     flip: false,
//   },
//   {
//     title: "Mobile",
//     content: "Works on any mobile device.",
//     image: null,
//     flip: false,
//   },
//   {
//     title: "Desktop",
//     content: "Works on any desktop device.",
//     image: null,
//     flip: false,
//   },
//   {
//     title: "Portable",
//     content: "Create on the go.",
//     image: Neon1,
//     flip: false,
//   },
// ];

// const BentoBox = () => {
//   const refs = data.map(() => useRef<HTMLDivElement>(null));
//   const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
//     }, 7000);

//     return () => clearInterval(interval);
//   }, []);

//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { scale: 1.1 },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//     hover: { scale: 1.1, rotate: 5 },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
//   };

//   return (
//     <div className={styles.bentoBoxContainer}>
//       <div className={styles.bentoBlackBox}></div>
//       <div className={styles.bentoBox}>
//         {data.map((item, index) => (
//           <motion.div
//             key={index}
//             ref={refs[index]}
//             className={`${styles.box} ${styles[`box${index + 1}`]}`}
//             initial="hidden"
//             animate={isInView[index] ? "visible" : "hidden"}
//             whileHover={{ zIndex: 3 }}
//           >
//             <motion.h3
//               className={styles.title}
//               variants={textVariants}
//               transition={{ duration: 0.5, delay: index * 0.3 }}
//             >
//               {item.title}
//             </motion.h3>
//             <motion.p
//               className={styles.content}
//               variants={contentVariants}
//               transition={{ duration: 0.5, delay: index * 0.4 }}
//             >
//               {item.content}
//             </motion.p>
//             {item.image && (
//               <motion.div
//                 className={item.flip ? styles.flipCard : ""}
//                 whileHover={item.flip ? { rotateY: 180 } : {}}
//               >
//                 <motion.img
//                   className={styles.flipCardFront}
//                   src={item.image}
//                   alt={item.title}
//                   variants={imageVariants}
//                   transition={{ duration: 0.5, delay: index * 0.5 }}
//                 />
//                 {item.flip && (
//                   <motion.div className={styles.flipCardBack}></motion.div>
//                 )}
//               </motion.div>
//             )}
//             {/* {item.customElement && (
//               <motion.div
//                 className={styles.customElement}
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {item.customElement}
//               </motion.div>
//             )} */}
//             {index === 0 && (
//               <div className={styles.carouselContainer}>
//                 <motion.img
//                   key={currentImage}
//                   src={carouselImages[currentImage]}
//                   alt="carousel"
//                   className={styles.carouselImage}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 1 }}
//                 />
//               </div>
//             )}
//             {index === 1 || index === 4 ? (
//               <motion.div
//                 className={styles.hoverContent}
//                 initial={{ opacity: 0, height: 0 }}
//                 whileHover={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p>
//                   More about Quack: This is an amazing feature that enhances
//                   your experience.
//                 </p>
//               </motion.div>
//             ) : null}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BentoBox;

////////////

// import React, { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import styles from "./BentoBox.module.css";
// import Neon1 from "../../assets/images/neon-icon1.jpg";
// import Neon2 from "../../assets/images/neon-icon2.jpg";
// import Neon3 from "../../assets/images/neon-icon3.jpg";
// import Neon4 from "../../assets/images/neon-icon4.jpg";
// import Neon5 from "../../assets/images/neon-icon5.jpg";
// import Neon6 from "../../assets/images/neon-icon6.jpg";

// const data = [
//   {
//     title: "Create Scripts",
//     content: "Easily create and edit scripts with a user-friendly interface.",
//     image: Neon1,
//     customElement: (
//       <div className={styles.customBox1}>
//         Quack is a powerful collaborative app that allows you to achieve the
//         story of your dreams
//       </div>
//     ),
//     flip: true,
//   },
//   {
//     title: "Collaborate",
//     content: "Work together with others in real-time.",
//     image: Neon2,
//     flip: false,
//   },
//   {
//     title: "Speech-to-Text",
//     content:
//       "Use advanced speech-to-text capabilities to dictate your scripts.",
//     image: Neon3,
//     flip: false,
//   },
//   {
//     title: "Notes and Chat",
//     content:
//       "Communicate with your team using the integrated notes and chat features.",
//     image: Neon4,
//     flip: false,
//   },
//   {
//     title: "Review and Feedback",
//     content: "Receive feedback and review scripts collaboratively.",
//     image: Neon5,
//     flip: true,
//   },
//   {
//     title: "Voice Commands",
//     content: "Record your ideas and watch them come to life.",
//     image: Neon6,
//     flip: false,
//   },
//   {
//     title: "Mobile",
//     content: "Works on any mobile device.",
//     image: null, // No image for this box
//     flip: false,
//   },
//   {
//     title: "Desktop",
//     content: "Works on any desktop device.",
//     image: null, // No image for this box
//     flip: false,
//   },
//   {
//     title: "Portable",
//     content: "Create on the go.",
//     image: Neon1,
//     flip: false,
//   },
// ];

// const BentoBox = () => {
//   const refs = data.map(() => useRef<HTMLDivElement>(null));
//   const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));
//   const [isOpen, setIsOpen] = React.useState(false);

//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { scale: 1.1 },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//     hover: { scale: 1.1, rotate: 5 },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
//   };

//   return (
//     <div className={styles.bentoBoxContainer}>
//       <div className={styles.bentoBlackBox}></div>
//       <div className={styles.bentoBox}>
//         {data.map((item, index) => (
//           <motion.div
//             key={index}
//             ref={refs[index]}
//             className={`${styles.box} ${styles[`box${index + 1}`]}`}
//             initial="hidden"
//             animate={isInView[index] ? "visible" : "hidden"}
//             whileHover={{ zIndex: 3 }}
//           >
//             <motion.h3
//               className={styles.title}
//               variants={textVariants}
//               transition={{ duration: 0.5, delay: index * 0.3 }}
//             >
//               {item.title}
//             </motion.h3>
//             <motion.p
//               className={styles.content}
//               variants={contentVariants}
//               transition={{ duration: 0.5, delay: index * 0.4 }}
//             >
//               {item.content}
//             </motion.p>
//             {item.image && (
//               <motion.div
//                 className={item.flip ? styles.flipCard : ""}
//                 whileHover={item.flip ? { rotateY: 180 } : {}}
//               >
//                 <motion.img
//                   className={styles.flipCardFront}
//                   src={item.image}
//                   alt={item.title}
//                   variants={imageVariants}
//                   transition={{ duration: 0.5, delay: index * 0.5 }}
//                 />
//                 {item.flip && (
//                   <motion.div className={styles.flipCardBack}></motion.div>
//                 )}
//               </motion.div>
//             )}
//             {item.customElement && (
//               <motion.div
//                 className={styles.customElement}
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {item.customElement}
//               </motion.div>
//             )}
//             {index === 0 || index === 1 || index === 4 ? (
//               <motion.div
//                 className={styles.hoverContent}
//                 initial={{ opacity: 0, height: 0 }}
//                 whileHover={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p>
//                   More about Quack: This is an amazing feature that enhances
//                   your experience.
//                 </p>
//               </motion.div>
//             ) : null}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BentoBox;

////////

// import React, { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import styles from "./BentoBox.module.css";
// import Neon1 from "../../assets/images/neon-icon1.jpg";
// import Neon2 from "../../assets/images/neon-icon2.jpg";
// import Neon3 from "../../assets/images/neon-icon3.jpg";
// import Neon4 from "../../assets/images/neon-icon4.jpg";
// import Neon5 from "../../assets/images/neon-icon5.jpg";
// import Neon6 from "../../assets/images/neon-icon6.jpg";

// const data = [
//   {
//     title: "Create Scripts",
//     content: "Easily create and edit scripts with a user-friendly interface.",
//     image: Neon1,
//     customElement: <div className={styles.customBox1}>AVAILABLE TODAY</div>,
//   },
//   {
//     title: "Collaborate",
//     content: "Work together with others in real-time.",
//     image: Neon2,
//   },
//   {
//     title: "Speech-to-Text",
//     content:
//       "Use advanced speech-to-text capabilities to dictate your scripts.",
//     image: Neon3,
//   },
//   {
//     title: "Notes and Chat",
//     content:
//       "Communicate with your team using the integrated notes and chat features.",
//     image: Neon4,
//   },
//   {
//     title: "Review and Feedback",
//     content: "Receive feedback and review scripts collaboratively.",
//     image: Neon5,
//   },
//   {
//     title: "Voice Commands",
//     content: "Record your ideas and watch them come to life.",
//     image: Neon6,
//   },
//   {
//     title: "Mobile",
//     content: "Works on any mobile device.",
//     image: null, // No image for this box
//   },
//   {
//     title: "Desktop",
//     content: "Works on any desktop device.",
//     image: null, // No image for this box
//   },
//   {
//     title: "Portable",
//     content: "Create on the go.",
//     image: Neon1,
//   },
// ];

// const BentoBox = () => {
//   const refs = data.map(() => useRef<HTMLDivElement>(null));
//   const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));

//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { scale: 1.1 },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//     hover: { scale: 1.1, rotate: 5 },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
//   };

//   return (
//     <div className={styles.bentoBoxContainer}>
//       <div className={styles.bentoBlackBox}></div>
//       <div className={styles.bentoBox}>
//         {data.map((item, index) => (
//           <motion.div
//             key={index}
//             ref={refs[index]}
//             className={`${styles.box} ${styles[`box${index + 1}`]}`}
//             initial="hidden"
//             animate={isInView[index] ? "visible" : "hidden"}
//             whileHover={{ zIndex: 3 }}
//           >
//             <motion.h3
//               className={styles.title}
//               variants={textVariants}
//               transition={{ duration: 0.5, delay: index * 0.3 }}
//             >
//               {item.title}
//             </motion.h3>
//             <motion.p
//               className={styles.content}
//               variants={contentVariants}
//               transition={{ duration: 0.5, delay: index * 0.4 }}
//             >
//               {item.content}
//             </motion.p>
//             {item.image && (
//               <motion.div
//                 className={styles.flipCard}
//                 whileHover={{ rotateY: 180 }}
//               >
//                 <motion.img
//                   className={styles.flipCardFront}
//                   src={item.image}
//                   alt={item.title}
//                   variants={imageVariants}
//                   transition={{ duration: 0.5, delay: index * 0.5 }}
//                 />
//                 <motion.div className={styles.flipCardBack}></motion.div>
//               </motion.div>
//             )}
//             {item.customElement && (
//               <motion.div
//                 className={styles.customElement}
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {item.customElement}
//               </motion.div>
//             )}
//             {index === 0 || index === 1 || index === 4 ? (
//               <motion.div
//                 className={styles.hoverContent}
//                 initial={{ opacity: 0, height: 0 }}
//                 whileHover={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p>
//                   More about Quack: This is an amazing feature that enhances
//                   your experience.
//                 </p>
//               </motion.div>
//             ) : null}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BentoBox;
