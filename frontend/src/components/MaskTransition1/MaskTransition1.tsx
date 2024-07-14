import React, { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Background1 from "../../assets/images/Quack-Screen1.png";
import "./MaskTransition1.css";

const MaskTransition1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  }) as MotionValue<number>;
  const scale = useTransform(scrollYProgressSpring, [0, 1], [1, 12]);
  const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
  const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

  return (
    <main>
      <div ref={ref} className="relative z-10 h-[200vh] overflow-clip">
        <motion.div
          style={{ scale }}
          className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
        >
          <div className="window-mask flex flex-col rounded-3xl bg-[black] p-12 md:flex-row">
            <div className="flex h-full flex-col">
              <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-[80px] xl:text-[128px] text-[white]">
                Quack is your personal screenwriting solution.
              </h1>
              <p className="text-lg md:text-3xl text-[#004085]">
                Record speech for your app right on your mobile phone <br /> and
                continue working on your shared scripts <br />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-[-200vh] h-[200vh] overflow-clip bg-blue-100 pb-20">
        <motion.span
          style={{ x: imageXCalc }}
          className="sticky top-1/2 mx-auto block aspect-video w-[1600px] max-w-[90%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4"
        />
      </div>
      <div className="quackActionTitle">
        <p>Quack In Action!</p>

        <img src={Background1} alt="Background" className="w-full h-full" />
      </div>
    </main>
  );
};

export default MaskTransition1;

////////////

// import React, { useRef } from "react";
// import {
//   MotionValue,
//   motion,
//   useMotionTemplate,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import Background1 from "../../assets/images/Quack-Screen1.png";
// import "./MaskTransition1.css";

// const MaskTransition1 = () => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end end"],
//   });
//   const scrollYProgressSpring = useSpring(scrollYProgress, {
//     stiffness: 300,
//     damping: 40,
//   }) as MotionValue<number>;
//   const scale = useTransform(scrollYProgressSpring, [0, 1], [1, 12]);
//   const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
//   const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

//   return (
//     <main>
//       <div ref={ref} className="relative z-10 h-[200vh] overflow-clip">
//         <motion.div
//           style={{ scale }}
//           className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
//         >
//           <div className="window-mask flex flex-col rounded-3xl bg-[black] p-12 md:flex-row">
//             <div className="flex h-full flex-col">
//               <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-[80px] xl:text-[128px] text-[white]">
//                 Quack is your personal screenwriting solution.
//               </h1>
//               <p className="text-lg md:text-3xl text-[#004085]">
//                 Record speech for your app right on your mobile phone <br /> and
//                 continue working on your shared scripts <br />
//               </p>
//             </div>
//             <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[150px] min-w-[150px] rounded-full border-[4px] border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[300px] md:min-w-[300px]" />
//           </div>
//         </motion.div>
//       </div>
//       <div className="mt-[-200vh] h-[200vh] overflow-clip bg-blue-100 pb-20">
//         <motion.span
//           style={{ x: imageXCalc }}
//           className="sticky top-1/2 mx-auto block aspect-video w-[1600px] max-w-[90%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4"
//         />
//       </div>
//       <div className="quackActionTitle">
//         <p>Quack In Action!</p>

//         <img src={Background1} alt="Background" className="w-full h-full" />
//       </div>
//     </main>
//   );
// };

// export default MaskTransition1;
