import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const NodeButton = ({ editor, command, label, className, onClick }) => {
    if (!editor) {
        return null;
    }
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        else {
            editor.chain().focus()[command]().run();
        }
    };
    return (_jsx("button", { onClick: handleClick, className: className, children: label }));
};
export default NodeButton;
