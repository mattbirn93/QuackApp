import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
const ExampleComponent = () => {
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 10 }, children: _jsx("p", { className: "text-[4rem]", children: "Hello, From Fading In Framer Motion Suckah MC From Haiti in the summertime!" }) }));
};
export default ExampleComponent;
