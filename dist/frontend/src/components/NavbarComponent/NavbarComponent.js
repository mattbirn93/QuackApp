import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
    return (_jsxs("div", { className: "navbar", children: [_jsx(Link, { to: "/", children: "ScriptsInterface" }), _jsx(Link, { to: "/scriptslibrary", children: "ScriptsLibrary" })] }));
}
export default Navbar;
