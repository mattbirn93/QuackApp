import React from "react";
import { motion } from "framer-motion";

const ExampleComponent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 10 }}
    >
      <p className="text-[4rem]">
        Hello, From Fading In Framer Motion Suckah MC From Haiti!
      </p>
    </motion.div>
  );
};

export default ExampleComponent;
