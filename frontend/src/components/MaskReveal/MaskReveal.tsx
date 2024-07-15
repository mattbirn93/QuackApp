import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./MaskReveal.css";
import background4 from "../../assets/images/1.jpg";
import background5 from "../../assets/images/2.jpg";

const MaskReveal = () => {
  const { scrollYProgress } = useScroll();
  const radius = useTransform(scrollYProgress, [0, 1], [0, 800]);

  return (
    <div style={{ height: "200vh", position: "relative" }}>
      <div
        className="section"
        style={{
          height: "100vh",
          background: `url(${background4}) center/cover no-repeat`,
        }}
      >
        <h1 style={{ textAlign: "center", paddingTop: "40vh", color: "white" }}>
          Scroll Down
        </h1>
      </div>
      <div
        className="section"
        style={{ height: "100vh", position: "relative" }}
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
          <image
            href={background5}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#circleMask)"
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default MaskReveal;

///////////////////////////

// import React from "react";
// import { motion, useViewportScroll, useTransform } from "framer-motion";
// import "./MaskReveal.css";
// import background4 from "../../assets/images/1.jpg";
// import background5 from "../../assets/images/2.jpg";

// const MaskReveal = () => {
//   const { scrollYProgress } = useViewportScroll();
//   const radius = useTransform(scrollYProgress, [0, 1], [0, 800]);

//   return (
//     <div style={{ height: "200vh", position: "relative" }}>
//       <div
//         className="section"
//         style={{
//           height: "100vh",
//           background: `url(${background4}) center/cover no-repeat`,
//         }}
//       >
//         <h1 style={{ textAlign: "center", paddingTop: "40vh", color: "white" }}>
//           Scroll Down
//         </h1>
//       </div>
//       <div className="section" style={{ height: "100vh" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: `url(${background4}) center/cover no-repeat`,
//           }}
//         ></div>
//         <motion.svg
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <defs>
//             <mask id="circleMask">
//               <rect width="100%" height="100%" fill="white" />
//               <motion.circle cx="50%" cy="50%" fill="black" r={radius} />
//             </mask>
//           </defs>
//           <image
//             href={background5}
//             width="100%"
//             height="100%"
//             preserveAspectRatio="xMidYMid slice"
//             mask="url(#circleMask)"
//           />
//         </motion.svg>
//       </div>
//     </div>
//   );
// };

// export default MaskReveal;

////////////

// import React from "react";
// import { motion, useViewportScroll, useTransform } from "framer-motion";
// import "./MaskReveal.css";
// import background4 from "../../assets/images/1.jpg";
// import background5 from "../../assets/images/2.jpg";

// const MaskReveal = () => {
//   const { scrollYProgress } = useViewportScroll();
//   const radius = useTransform(scrollYProgress, [0, 1], [0, 800]);

//   return (
//     <div style={{ height: "200vh", position: "relative" }}>
//       <div
//         className="section"
//         style={{
//           height: "100vh",
//           background: `url(${background4}) center/cover no-repeat`,
//         }}
//       >
//         <h1 style={{ textAlign: "center", paddingTop: "40vh", color: "white" }}>
//           Scroll Down
//         </h1>
//       </div>
//       <div className="section" style={{ height: "100vh" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: `url(${background4}) center/cover no-repeat`,
//           }}
//         ></div>
//         <motion.svg
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <defs>
//             <mask id="circleMask">
//               <rect width="100%" height="100%" fill="white" />
//               <motion.circle
//                 cx="50%"
//                 cy="50%"
//                 fill="black"
//                 style={{ r: radius }}
//               />
//             </mask>
//           </defs>
//           <image
//             href={background5}
//             width="100%"
//             height="100%"
//             preserveAspectRatio="xMidYMid slice"
//             mask="url(#circleMask)"
//           />
//         </motion.svg>
//       </div>
//     </div>
//   );
// };

// export default MaskReveal;
