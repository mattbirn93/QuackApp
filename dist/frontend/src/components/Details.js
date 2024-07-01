import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import parse from "html-react-parser";
const Details = ({ description }) => {
    return (_jsx(_Fragment, { children: _jsx("div", { className: "ProseMirror", children: parse(description) }) }));
};
export default Details;
