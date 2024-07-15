import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./MaskReveal.css";
import background4 from "../../assets/images/Backpack1.webp";

const MaskReveal = () => {
  const { scrollY } = useScroll();
  const sectionRef = useRef(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setElementHeight(rect.height);
    }
  }, [sectionRef]);

  const radius = useTransform(
    scrollY,
    [elementTop, elementTop + elementHeight],
    [0, 1000],
  );

  return (
    <div className="revealWrapper">
      <div className="revealContainer">
        <div
          className="revealSection"
          style={{
            height: "200vh",
            position: "relative",
          }}
        >
          <div
            className="stickySection"
            style={{
              height: "100vh",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
            ref={sectionRef}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `url(${background4}) center/cover no-repeat`,
              }}
            ></div>
            <motion.svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <defs>
                <mask id="circleMask">
                  <rect width="100%" height="100%" fill="white" />
                  <motion.circle cx="50%" cy="50%" fill="black" r={radius} />
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="black"
                mask="url(#circleMask)"
              />
            </motion.svg>
            <div className="centeredTextConatiner">
              <p className="textParagraph1">
                Quack is a great choice for on the go seamless collaboration and
                creation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskReveal;

/////////////////////

// import React, { useEffect, useState, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import "./MaskReveal.css";
// import background4 from "../../assets/images/1.jpg";

// const MaskReveal = () => {
//   const { scrollY } = useScroll();
//   const sectionRef = useRef(null);
//   const [elementTop, setElementTop] = useState(0);
//   const [elementHeight, setElementHeight] = useState(0);

//   useEffect(() => {
//     if (sectionRef.current) {
//       const rect = sectionRef.current.getBoundingClientRect();
//       setElementTop(rect.top + window.scrollY);
//       setElementHeight(rect.height);
//     }
//   }, [sectionRef]);

//   const radius = useTransform(
//     scrollY,
//     [elementTop, elementTop + elementHeight],
//     [0, 1000],
//   );

//   return (
//     <div className="revealWrapper">
//       <div className="revealContainer">
//         <div
//           className="revealSection"
//           style={{
//             height: "200vh",
//             position: "relative",
//           }}
//         >
//           <div
//             className="stickySection"
//             style={{
//               height: "100vh",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//             ref={sectionRef}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 background: `url(${background4}) center/cover no-repeat`,
//               }}
//             ></div>
//             <motion.svg
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//             >
//               <defs>
//                 <mask id="circleMask">
//                   <rect width="100%" height="100%" fill="white" />
//                   <motion.circle cx="50%" cy="50%" fill="black" r={radius} />
//                 </mask>
//               </defs>
//               <rect
//                 width="100%"
//                 height="100%"
//                 fill="black"
//                 mask="url(#circleMask)"
//               />
//             </motion.svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaskReveal;

//////////////////

// import React, { useEffect, useState, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import "./MaskReveal.css";
// import background4 from "../../assets/images/1.jpg";
// import background5 from "../../assets/images/2.jpg";

// const MaskReveal = () => {
//   const { scrollY } = useScroll();
//   const sectionRef = useRef(null);
//   const [elementTop, setElementTop] = useState(0);
//   const [elementHeight, setElementHeight] = useState(0);

//   useEffect(() => {
//     if (sectionRef.current) {
//       const rect = sectionRef.current.getBoundingClientRect();
//       setElementTop(rect.top + window.scrollY);
//       setElementHeight(rect.height);
//     }
//   }, [sectionRef]);

//   const radius = useTransform(
//     scrollY,
//     [elementTop, elementTop + elementHeight],
//     [0, 1000],
//   );

//   return (
//     <div className="revealWrapper">
//       <div className="revealContainer">
//         <div
//           className="revealSection"
//           style={{
//             height: "200vh",
//             position: "relative",
//           }}
//         >
//           <div
//             className="stickySection"
//             style={{
//               height: "100vh",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//             ref={sectionRef}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 background: `url(${background4}) center/cover no-repeat`,
//               }}
//             ></div>
//             <motion.svg
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//             >
//               <defs>
//                 <mask id="circleMask">
//                   <rect width="100%" height="100%" fill="white" />
//                   <motion.circle cx="50%" cy="50%" fill="black" r={radius} />
//                 </mask>
//               </defs>
//               <image
//                 href={background5}
//                 width="100%"
//                 height="100%"
//                 preserveAspectRatio="xMidYMid slice"
//                 mask="url(#circleMask)"
//               />
//             </motion.svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaskReveal;
