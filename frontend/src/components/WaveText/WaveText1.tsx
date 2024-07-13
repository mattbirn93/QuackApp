import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import styles from "./WaveText.module.css";

export default function WaveText1() {
  const container = useRef<HTMLDivElement>(null);
  const paths = useRef<SVGTextPathElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      paths.current.forEach((path, i) => {
        path.setAttribute("startOffset", `${-40 + i * 40 + e * 40}%`);
      });
    });
  }, []);

  return (
    <div ref={container} className={styles.container}>
      <svg className={styles.container} viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className={styles.textPath}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => {
                  if (ref) paths.current[i] = ref;
                }}
                startOffset={`${i * 40}%`}
                href="#curve"
              >
                Record speech for your scripts
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
}

const Logos = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const y = useTransform(scrollProgress, [0, 1], [-700, 0]);
  return <div></div>;
};
