import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, useDragControls } from "framer-motion";
import ReactCurvedText from "react-curved-text";
import Arrow1 from "../../assets/images/right-arrow1.png";
import "./CurvedText.css";

const CurvedText: React.FC = () => {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  return (
    <div className="InfoSection__wrapper">
      <div className="InfoSection__container">
        <div className="Right__Arrow1">{Arrow1}</div>
        <div
          ref={constraintsRef}
          onPointerDown={(event) => dragControls.start(event)}
        >
          <div>
            <a href="https://www.google.com" className="Circle1__Animation">
              <ReactCurvedText
                width={446}
                height={446}
                cx={138}
                cy={138}
                rx={115}
                ry={115}
                startOffset={0}
                text="QUACK! - QUACK! - QUACK! - QUACK! - QUACK! - QUACK! - "
                textProps={{
                  style: {
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "0.5rem",
                  },
                }}
                textPathProps={{ fill: "#bed74e" }}
                reversed={true}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurvedText;

///////////////

// import React, { useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import { motion, useAnimation, useDragControls } from "framer-motion";
// import ReactCurvedText from "react-curved-text";
// // import Arrow1 from "../../assets/images/right-arrow1.png";
// import "./infoSection.css";

// function InfoSection() {
//   const constraintsRef = useRef(null);
//   const dragControls = useDragControls();

//   const animate1 = useAnimation();
//   const { ref: ref1, inView: inView1 } = useInView();
//   useEffect(() => {
//     if (inView1) {
//       animate1.start("visible");
//     }
//     if (!inView1) {
//       animate1.start("hidden");
//     }
//   }, [inView1]);

//   const animate2 = useAnimation();
//   const { ref: ref2, inView: inView2 } = useInView();
//   useEffect(() => {
//     if (inView2) {
//       animate2.start("visible");
//     }
//     if (!inView2) {
//       animate2.start("hidden");
//     }
//   }, [inView2]);

//   return (
//     <div className="InfoSection__wrapper">
//       <div className="InfoSection__container section__padding">
//         {/* <div className="Right__Arrow1">{Arrow1}</div> */}

//         <div
//           ref={constraintsRef}
//           onPointerDown={(event) => dragControls.start(event)}
//         >
//           <motion.div
//             className="InfoSection__dragBox1"
//             drag
//             dragConstraints={constraintsRef}
//             dragControls={dragControls}
//           >
//             <a href="www.google.com" className="Circle1__Animation">
//               <ReactCurvedText
//                 textProps={{ style: { fontSize: "22.5", fontWeight: "400" } }}
//                 width={146}
//                 height={146}
//                 cx={72}
//                 cy={72}
//                 rx={60}
//                 ry={60}
//                 startOffset={0}
//                 textPathProps={{ fill: "black" }}
//                 text="contact - contact - contact - contact -"
//                 reversed={true}
//               />
//             </a>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InfoSection;
