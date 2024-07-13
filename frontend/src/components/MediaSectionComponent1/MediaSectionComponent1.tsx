import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Film1 from "../../assets/images/Film1.webp";
import Film2 from "../../assets/images/Film2.webp";
import Film3 from "../../assets/images/Film3.webp";
import Film4 from "../../assets/images/Film4.webp";
import Film5 from "../../assets/images/Film5.webp";
import Film6 from "../../assets/images/Film6.webp";
import Film7 from "../../assets/images/Film7.webp";
import Film8 from "../../assets/images/Film8.webp";
import Film9 from "../../assets/images/Film9.webp";
import "./MediaSectionComponent1.css";

const MediaSectionComponent1: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const totalScrollDistance =
    carouselRef.current && sectionRef.current
      ? carouselRef.current.scrollWidth - sectionRef.current.offsetWidth
      : 0;

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollDistance]);

  return (
    <div className="InfoSection2__wrapper" ref={sectionRef}>
      <div className="InfoSection2__mainContainer">
        <div className="InfoSection2__title">Media</div>
        <div className="InfoSection2__picsContainerWrapper">
          <motion.div
            className="InfoSection2__picsContainer"
            ref={carouselRef}
            style={{ x }}
          >
            {[
              Film1,
              Film2,
              Film3,
              Film4,
              Film5,
              Film6,
              Film7,
              Film8,
              Film9,
            ].map((film, index) => (
              <div key={index} className="InfoSection__Box">
                <img
                  className="InfoSection2__playPics"
                  src={film}
                  alt={`Film ${index + 1}`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MediaSectionComponent1;

//////////////////////////

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Film1 from "../../assets/images/Film1.webp";
// import Film2 from "../../assets/images/Film2.webp";
// import Film3 from "../../assets/images/Film3.webp";
// import Film4 from "../../assets/images/Film4.webp";
// import Film5 from "../../assets/images/Film5.webp";
// import Film6 from "../../assets/images/Film6.webp";
// import Film7 from "../../assets/images/Film7.webp";
// import Film8 from "../../assets/images/Film8.webp";
// import Film9 from "../../assets/images/Film9.webp";
// import "./MediaSectionComponent1.css";

// gsap.registerPlugin(ScrollTrigger);

// const MediaSectionComponent1: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const carouselRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!carouselRef.current || !sectionRef.current) return;

//     const totalScrollDistance =
//       carouselRef.current.scrollWidth - sectionRef.current.offsetWidth;

//     gsap.to(carouselRef.current, {
//       x: -totalScrollDistance,
//       ease: "none",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: () => `+=${totalScrollDistance}`,
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <div className="InfoSection2__wrapper" ref={sectionRef}>
//       <div className="InfoSection2__mainContainer">
//         <div className="InfoSection2__title">Media</div>
//         <div className="InfoSection2__picsContainerWrapper">
//           <div className="InfoSection2__picsContainer" ref={carouselRef}>
//             {[
//               Film1,
//               Film2,
//               Film3,
//               Film4,
//               Film5,
//               Film6,
//               Film7,
//               Film8,
//               Film9,
//             ].map((film, index) => (
//               <div key={index} className="InfoSection__Box">
//                 <img
//                   className="InfoSection2__playPics"
//                   src={film}
//                   alt={`Film ${index + 1}`}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MediaSectionComponent1;
