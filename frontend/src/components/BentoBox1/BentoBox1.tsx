import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BentoBox.module.css";
import Image1 from "../../assets/images/background6.jpg";
import Image2 from "../../assets/images/background6.jpg";
import Image3 from "../../assets/images/background6.jpg";
import Image4 from "../../assets/images/background6.jpg";

const data = [
  {
    title: "Create Scripts",
    content: "Easily create and edit scripts with a user-friendly interface.",
    image: Image1,
  },
  {
    title: "Collaborate",
    content: "Work together with others in real-time.",
    image: Image2,
  },
  {
    title: "Speech-to-Text",
    content:
      "Use advanced speech-to-text capabilities to dictate your scripts.",
    image: Image3,
  },
  {
    title: "Notes and Chat",
    content:
      "Communicate with your team using the integrated notes and chat features.",
    image: Image4,
  },
  {
    title: "Review and Feedback",
    content: "Receive feedback and review scripts collaboratively.",
    image: Image4,
  },
  {
    title: "Export Scripts",
    content: "Easily export your scripts in multiple formats.",
    image: Image4,
  },
];

const BentoBox = () => {
  const refs = data.map(() => useRef(null));
  const isInView = refs.map((ref) => useInView(ref, { triggerOnce: true }));

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={styles.bentoBoxContainer}>
      <div className={styles.bentoBlackBox}></div>
      <div className={styles.bentoBox}>
        {data.map((item, index) => (
          <div
            key={index}
            ref={refs[index]}
            className={`${styles.box} ${styles[`box${index + 1}`]}`}
          >
            <motion.h3
              className={styles.title}
              initial="hidden"
              animate={isInView[index] ? "visible" : "hidden"}
              variants={textVariants}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              {item.title}
            </motion.h3>
            <motion.p
              className={styles.content}
              initial="hidden"
              animate={isInView[index] ? "visible" : "hidden"}
              variants={textVariants}
              transition={{ duration: 0.5, delay: index * 0.4 }}
            >
              {item.content}
            </motion.p>
            <motion.img
              src={item.image}
              alt={item.title}
              initial="hidden"
              animate={isInView[index] ? "visible" : "hidden"}
              variants={imageVariants}
              transition={{ duration: 0.5, delay: index * 0.5 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoBox;

/////////

// import React, { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import styles from "./BentoBox.module.css";
// import Image1 from "../../assets/images/background6.jpg";
// import Image2 from "../../assets/images/background6.jpg";
// import Image3 from "../../assets/images/background6.jpg";
// import Image4 from "../../assets/images/background6.jpg";

// const data = [
//   {
//     title: "Create Scripts",
//     content: "Easily create and edit scripts with a user-friendly interface.",
//     image: Image1,
//   },
//   {
//     title: "Collaborate",
//     content: "Work together with others in real-time.",
//     image: Image2,
//   },
//   {
//     title: "Speech-to-Text",
//     content:
//       "Use advanced speech-to-text capabilities to dictate your scripts.",
//     image: Image3,
//   },
//   {
//     title: "Notes and Chat",
//     content:
//       "Communicate with your team using the integrated notes and chat features.",
//     image: Image4,
//   },
//   {
//     title: "Review and Feedback",
//     content: "Receive feedback and review scripts collaboratively.",
//     image: Image4,
//   },
//   {
//     title: "Export Scripts",
//     content: "Easily export your scripts in multiple formats.",
//     image: Image4,
//   },
// ];

// const BentoBox = () => {
//   const refs = data.map(() => useRef(null));
//   const isInView = refs.map((ref) => useInView(ref, { once: true }));

//   const animationVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
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
//             variants={animationVariants}
//             transition={{ duration: 0.5, delay: index * 0.3 }}
//           >
//             <motion.h3 className={styles.title}>{item.title}</motion.h3>
//             <motion.p className={styles.content}>{item.content}</motion.p>
//             <motion.img src={item.image} alt={item.title} />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BentoBox;
