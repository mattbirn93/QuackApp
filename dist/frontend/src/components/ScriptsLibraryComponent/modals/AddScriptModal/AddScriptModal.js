import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import styles from "../../../common/Modal.module.css";
const AddScriptModal = ({ isVisible, onClose, onAdd, }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newWrittenBy, setNewWrittenBy] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isVisible) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, onClose]);
    const handleSave = () => {
        onAdd(newTitle, newWrittenBy, newAddress, newPhoneNumber);
        onClose();
    };
    return (_jsxs(Modal, { isVisible: isVisible, onClose: onClose, title: "Create Script", children: [_jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Title:", _jsx("input", { className: styles.formInput, type: "text", value: newTitle, onChange: (e) => setNewTitle(e.target.value) })] }) }), _jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Written By:", _jsx("input", { className: styles.formInput, type: "text", value: newWrittenBy, onChange: (e) => setNewWrittenBy(e.target.value) })] }) }), _jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Address:", _jsx("input", { className: styles.formInput, type: "text", value: newAddress, onChange: (e) => setNewAddress(e.target.value) })] }) }), _jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Phone Number:", _jsx("input", { className: styles.formInput, type: "text", value: newPhoneNumber, onChange: (e) => setNewPhoneNumber(e.target.value) })] }) }), _jsxs("div", { className: styles.buttonContainer, children: [_jsx("button", { className: styles.submitButton, onClick: handleSave, children: "Save" }), _jsx("button", { className: styles.cancelButton, onClick: onClose, children: "Cancel" })] })] }));
};
export default AddScriptModal;
