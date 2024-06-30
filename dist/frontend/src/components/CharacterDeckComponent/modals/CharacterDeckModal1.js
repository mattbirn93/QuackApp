import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./CharacterDeckModal1.css";
const CharacterDeckModal1 = ({ onClose, }) => {
    return (_jsx("div", { className: "characterDeckModal1", children: _jsxs("div", { className: "characterDeckModal1-content", children: [_jsx("span", { className: "characterDeckModal1-close ", onClick: onClose, children: "\u00D7" }), _jsx("p", { children: "Character Deck Modal Content" })] }) }));
};
export default CharacterDeckModal1;
