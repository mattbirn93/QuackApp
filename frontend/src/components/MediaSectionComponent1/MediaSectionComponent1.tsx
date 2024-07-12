import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const MediaSectionComponent1: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!carouselRef.current || !sectionRef.current) return;

    const totalScrollDistance =
      carouselRef.current.scrollWidth - sectionRef.current.offsetWidth;

    gsap.to(carouselRef.current, {
      x: -totalScrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", /// Pin the section for the duration of the animation
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <div className="InfoSection2__wrapper" ref={sectionRef}>
      <div className="InfoSection2__mainContainer">
        <div className="InfoSection2__title">Media</div>
        <div className="InfoSection2__picsContainerWrapper">
          <div className="InfoSection2__picsContainer" ref={carouselRef}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSectionComponent1;

/////

// import React, { useEffect, useRef } from "react";
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

// const MediaSectionComponent1: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const carouselRef = useRef<HTMLDivElement | null>(null);
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!carouselRef.current || !sectionRef.current) return;

//       const currentScrollY = window.scrollY;
//       const scrollDelta = (currentScrollY - lastScrollY.current) * 20; // Significantly increase the sensitivity
//       lastScrollY.current = currentScrollY;

//       const currentX =
//         parseFloat(
//           getComputedStyle(carouselRef.current).transform.split(",")[4],
//         ) || 0;
//       const newX = currentX - scrollDelta;

//       // Ensure newX is within bounds
//       const maxScroll = -(
//         carouselRef.current.scrollWidth - sectionRef.current.offsetWidth
//       );
//       if (newX > 0) {
//         carouselRef.current.style.transform = `translateX(0px)`;
//       } else if (newX < maxScroll) {
//         carouselRef.current.style.transform = `translateX(${maxScroll}px)`;
//       } else {
//         carouselRef.current.style.transform = `translateX(${newX}px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
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

///////////////

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

//     const updateDirection = () => {
//       let lastScrollY = 0;

//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//         onUpdate: (self) => {
//           const currentScrollY = self.scroll();
//           const direction = currentScrollY > lastScrollY ? -1 : 1;
//           lastScrollY = currentScrollY;

//           gsap.to(carouselRef.current, {
//             x:
//               direction *
//               ((carouselRef.current?.scrollWidth ?? 0) -
//                 (sectionRef.current?.offsetWidth ?? 0)),
//             ease: "none",
//             overwrite: "auto",
//           });
//         },
//       });
//     };

//     updateDirection();
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
