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

const testimonials = [
  "Quack has transformed the way we collaborate on scripts!",
  "The speech-to-text feature is a game-changer.",
  "I love how intuitive and easy-to-use Quack is.",
  "Collaborating in real-time has never been easier.",
  "The best tool for screenwriters!",
  "Quack has made scriptwriting a breeze.",
  "Highly recommend Quack for any writing team.",
  "The collaborative features are top-notch.",
  "Quack is the future of scriptwriting.",
  "Fantastic tool for remote collaboration.",
];

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
    content: "",
    image: null,
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
  const isInView = refs.map((ref) => useInView(ref, { once: false }));
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // const variants = {
  //   hidden: { opacity: 0, x: 0 },
  //   visible: (index: number) => ({
  //     opacity: 1,
  //     x: 0,
  //     transition: { duration: 0.5, delay: index * 0.1 },
  //     // ease: [0.6, -0.05, 0.01, 0.99],
  //   }),
  // };

  return (
    <div className={styles.bentoBoxContainer}>
      <div className={styles.bentoBlackBox}></div>
      <div className={styles.bentoBox}>
        {data.map((item, index) => (
          <motion.div
            key={index}
            ref={refs[index]}
            className={`${styles.box} ${styles[`box${index + 1}`]}`}
            custom={index}
            initial="hidden"
            animate={isInView[index] ? "visible" : "hidden"}
            whileHover={{ zIndex: 3 }}
          >
            <motion.h3 className={styles.title} whileHover={{ scale: 1.1 }}>
              {item.title}
            </motion.h3>
            <motion.p
              className={styles.content}
              whileHover={{ x: [0, -5, 5, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {item.content}
            </motion.p>
            {item.image && (
              <div>
                <motion.img
                  src={item.image}
                  alt={item.title}
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            )}
            {index === 1 || index === 4 ? (
              <motion.div
                className={styles.hoverContent}
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            ) : null}
          </motion.div>
        ))}
        <div className={`${styles.box} ${styles.box4}`}>
          <div className={styles.box4Title}>Notes and Chat</div>
          <div className={styles.testimonialFeed}>
            <div className={styles.testimonialTrack}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonial}>
                  {testimonial}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          <button className={styles.marqueeButton}>Quack</button>
          <button className={styles.marqueeButton}>Powerful</button>
          <button className={styles.marqueeButton}>Collaborative</button>
          <button className={styles.marqueeButton}>Creative</button>
          <button className={styles.marqueeButton}>Efficient</button>
          <button className={styles.marqueeButton}>Intuitive</button>
          <button className={styles.marqueeButton}>Dynamic</button>
          <button className={styles.marqueeButton}>Seamless</button>
          <button className={styles.marqueeButton}>Versatile</button>
          <button className={styles.marqueeButton}>Innovative</button>
          <button className={styles.marqueeButton}>Streamlined</button>
          <button className={styles.marqueeButton}>Productive</button>
          <button className={styles.marqueeButton}>User-friendly</button>
          <button className={styles.marqueeButton}>Flexible</button>
          <button className={styles.marqueeButton}>Secure</button>
        </div>
      </div>
    </div>
  );
};

export default BentoBox;

//////////////

// import React, { useRef, useState, useEffect, useMemo } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import styles from "./BentoBox.module.css";
// import Neon1 from "../../assets/images/neon-icon1.jpg";
// import Neon2 from "../../assets/images/neon-icon2.jpg";
// import Neon3 from "../../assets/images/neon-icon3.jpg";
// import Neon4 from "../../assets/images/neon-icon4.jpg";
// import Neon5 from "../../assets/images/neon-icon5.jpg";
// import Neon6 from "../../assets/images/neon-icon6.jpg";

// gsap.registerPlugin(ScrollTrigger);

// const carouselImages = [Neon1, Neon2, Neon3, Neon4, Neon5, Neon6];

// const testimonials = [
//   "Quack has transformed the way we collaborate on scripts!",
//   "The speech-to-text feature is a game-changer.",
//   "I love how intuitive and easy-to-use Quack is.",
//   "Collaborating in real-time has never been easier.",
//   "The best tool for screenwriters!",
//   "Quack has made scriptwriting a breeze.",
//   "Highly recommend Quack for any writing team.",
//   "The collaborative features are top-notch.",
//   "Quack is the future of scriptwriting.",
//   "Fantastic tool for remote collaboration.",
// ];

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
//     content: "",
//     image: null,
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
//     image: null,
//     flip: false,
//   },
// ];

// const BentoBox = () => {
//   const refs = useMemo(
//     () => data.map(() => React.createRef<HTMLDivElement>()),
//     [],
//   );
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
//     }, 7000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     refs.forEach((ref, index) => {
//       if (ref.current) {
//         gsap.fromTo(
//           ref.current,
//           { opacity: 0 },
//           {
//             opacity: 1,
//             delay: index * 0.1,
//             duration: 0.3,
//             scrollTrigger: {
//               trigger: ref.current,
//               start: "top 80%",
//               toggleActions: "play none none none",
//               once: true,
//             },
//           },
//         );
//       }
//     });
//   }, [refs]);

//   return (
//     <div className={styles.bentoBoxContainer}>
//       <div className={styles.bentoBlackBox}></div>
//       <div className={styles.bentoBox}>
//         {data.map((item, index) => (
//           <div
//             key={index}
//             ref={refs[index]}
//             className={`${styles.box} ${styles[`box${index + 1}`]}`}
//           >
//             <h3 className={styles.title}>{item.title}</h3>
//             <p className={styles.content}>{item.content}</p>
//             {item.image && (
//               <div className={item.flip ? styles.flipCard : ""}>
//                 <img
//                   className={styles.flipCardFront}
//                   src={item.image}
//                   alt={item.title}
//                 />
//                 {item.flip && <div className={styles.flipCardBack}></div>}
//               </div>
//             )}
//             {index === 1 || index === 4 ? (
//               <div className={styles.hoverContent}>
//                 <p>
//                   More about Quack: This is an amazing feature that enhances
//                   your experience.
//                 </p>
//               </div>
//             ) : null}
//           </div>
//         ))}
//         <div className={`${styles.box} ${styles.box4}`}>
//           <div className={styles.box4Title}>Notes and Chat</div>
//           <div className={styles.testimonialFeed}>
//             <div className={styles.testimonialTrack}>
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className={styles.testimonial}>
//                   {testimonial}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={styles.marquee}>
//         <div className={styles.marqueeTrack}>
//           <button className={styles.marqueeButton}>Quack</button>
//           <button className={styles.marqueeButton}>Powerful</button>
//           <button className={styles.marqueeButton}>Collaborative</button>
//           <button className={styles.marqueeButton}>Creative</button>
//           <button className={styles.marqueeButton}>Efficient</button>
//           <button className={styles.marqueeButton}>Intuitive</button>
//           <button className={styles.marqueeButton}>Dynamic</button>
//           <button className={styles.marqueeButton}>Seamless</button>
//           <button className={styles.marqueeButton}>Versatile</button>
//           <button className={styles.marqueeButton}>Innovative</button>
//           <button className={styles.marqueeButton}>Streamlined</button>
//           <button className={styles.marqueeButton}>Productive</button>
//           <button className={styles.marqueeButton}>User-friendly</button>
//           <button className={styles.marqueeButton}>Flexible</button>
//           <button className={styles.marqueeButton}>Secure</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BentoBox;

//////////////////////

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

// const testimonials = [
//   "Quack has transformed the way we collaborate on scripts!",
//   "The speech-to-text feature is a game-changer.",
//   "I love how intuitive and easy-to-use Quack is.",
//   "Collaborating in real-time has never been easier.",
//   "The best tool for screenwriters!",
//   "Quack has made scriptwriting a breeze.",
//   "Highly recommend Quack for any writing team.",
//   "The collaborative features are top-notch.",
//   "Quack is the future of scriptwriting.",
//   "Fantastic tool for remote collaboration.",
// ];

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
//     content: "",
//     image: null,
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
//     image: null,
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
//         <div className={`${styles.box} ${styles.box4}`}>
//           <div className={styles.box4Title}>Notes and Chat</div>
//           <div className={styles.testimonialFeed}>
//             <div className={styles.testimonialTrack}>
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className={styles.testimonial}>
//                   {testimonial}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={styles.marquee}>
//         <div className={styles.marqueeTrack}>
//           <button className={styles.marqueeButton}>Quack</button>
//           <button className={styles.marqueeButton}>Powerful</button>
//           <button className={styles.marqueeButton}>Collaborative</button>
//           <button className={styles.marqueeButton}>Creative</button>
//           <button className={styles.marqueeButton}>Efficient</button>
//           <button className={styles.marqueeButton}>Intuitive</button>
//           <button className={styles.marqueeButton}>Dynamic</button>
//           <button className={styles.marqueeButton}>Seamless</button>
//           <button className={styles.marqueeButton}>Versatile</button>
//           <button className={styles.marqueeButton}>Innovative</button>
//           <button className={styles.marqueeButton}>Streamlined</button>
//           <button className={styles.marqueeButton}>Productive</button>
//           <button className={styles.marqueeButton}>User-friendly</button>
//           <button className={styles.marqueeButton}>Flexible</button>
//           <button className={styles.marqueeButton}>Secure</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BentoBox;
