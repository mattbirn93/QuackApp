import { jsx as _jsx } from "react/jsx-runtime";
const MainLayout = ({ children }) => {
    return (_jsx("div", { children: _jsx("main", { children: children }) }));
};
export default MainLayout;
