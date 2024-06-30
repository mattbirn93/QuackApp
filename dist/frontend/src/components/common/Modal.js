import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Modal.module.css";
const Modal = ({ isVisible, onClose, children, title, }) => {
    if (!isVisible)
        return null;
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains(styles.modalOverlay)) {
            onClose();
        }
    };
    return (_jsx("div", { className: styles.modalOverlay, onClick: handleOverlayClick, children: _jsxs("div", { className: styles.modalContent, children: [_jsx("div", { className: styles.closeButton, children: _jsx("button", { className: styles.closeButtonBtn, onClick: onClose, children: _jsx("span", { className: styles.closeIcon, children: "\u00D7" }) }) }), _jsx("h2", { className: styles.h2, children: title }), children] }) }));
};
export default Modal;
