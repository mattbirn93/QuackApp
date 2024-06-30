import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonLoader = () => {
    return (_jsxs("div", { children: [_jsx(Skeleton, { height: 40, width: 300 }), _jsx(Skeleton, { height: 20, width: 200 }), _jsx(Skeleton, { height: 20, width: 200 }), _jsx(Skeleton, { height: 20, width: 200 })] }));
};
export default SkeletonLoader;
