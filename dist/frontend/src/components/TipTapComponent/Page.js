import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Page = ({ content, pageNumber, }) => {
    return (_jsxs("div", { className: "page", children: [_jsx("div", { className: "ProseMirror", dangerouslySetInnerHTML: { __html: content } }), _jsx("div", { className: "page-number", children: pageNumber })] }));
};
export default Page;
