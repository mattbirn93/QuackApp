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

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".InfoSection__Box");
    const title = sectionRef.current.querySelector(".InfoSection2__title");
    const header = sectionRef.current.querySelector(".InfoSection2__header");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    elements.forEach((el, index) => {
      tl.fromTo(
        el,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        index * 1, // delay for each image
      );
    });

    if (title) {
      gsap.fromTo(
        title,
        { scale: 5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    }

    if (header) {
      gsap.fromTo(
        header,
        { scale: 5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    }
  }, []);

  return (
    <div className="InfoSection2__wrapper">
      <div className="InfoSection2__mainContainer" ref={sectionRef}>
        <div className="InfoSection2__title">Media</div>
        <hr />
        <div className="InfoSection2__header">Quack In Use:</div>
        <div className="InfoSection2__picsContainer">
          {[Film1, Film2, Film3, Film4, Film5, Film6, Film7, Film8, Film9].map(
            (film, index) => (
              <div key={index} className="InfoSection__Box">
                <img
                  className="InfoSection2__playPics"
                  src={film}
                  alt={`Film ${index + 1}`}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaSectionComponent1;

///////////////////////////////////

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

//   useEffect(() => {
//     if (!sectionRef.current) return;

//     const elements = sectionRef.current.querySelectorAll(".InfoSection__Box");
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 80%",
//         end: "bottom 20%",
//         scrub: true,
//       },
//     });

//     elements.forEach((el, index) => {
//       tl.fromTo(
//         el,
//         { x: -300, opacity: 0 },
//         { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
//         index * 1, // delay for each image
//       );
//     });
//   }, []);

//   return (
//     <div className="InfoSection2__wrapper">
//       <div className="InfoSection2__mainContainer" ref={sectionRef}>
//         <div className="InfoSection2__title">Media</div>
//         <hr />
//         <div className="InfoSection2__header">Quack In Use:</div>
//         <div className="InfoSection2__picsContainer">
//           {[Film1, Film2, Film3, Film4, Film5, Film6, Film7, Film8, Film9].map(
//             (film, index) => (
//               <div key={index} className="InfoSection__Box">
//                 <img
//                   className="InfoSection2__playPics"
//                   src={film}
//                   alt={`Film ${index + 1}`}
//                 />
//               </div>
//             ),
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MediaSectionComponent1;
