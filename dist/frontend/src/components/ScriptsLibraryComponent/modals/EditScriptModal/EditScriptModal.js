import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import styles from "../../../common/Modal.module.css";
const EditScriptModal = ({ isVisible, onClose, title, writtenBy, address, phoneNumber, onEdit, onDelete, }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newWrittenBy, setNewWrittenBy] = useState(writtenBy);
    const [newAddress, setNewAddress] = useState(address);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
    useEffect(() => {
        setNewTitle(title);
        setNewWrittenBy(writtenBy);
        setNewAddress(address);
        setNewPhoneNumber(phoneNumber);
    }, [title, writtenBy, address, phoneNumber]);
    const handleSave = () => {
        onEdit(newTitle, newWrittenBy, newAddress, newPhoneNumber);
        onClose();
    };
    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };
    const confirmDelete = () => {
        onDelete();
        onClose();
    };
    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };
    return (_jsxs(Modal, { isVisible: isVisible, onClose: onClose, title: "Edit Script", children: [_jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Title:", _jsx("input", { className: styles.formInput, type: "text", value: newTitle, onChange: (e) => setNewTitle(e.target.value) })] }) }), _jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Written by:", _jsx("input", { className: styles.formInput, type: "text", value: newWrittenBy, onChange: (e) => setNewWrittenBy(e.target.value) })] }) }), _jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Address:", _jsx("input", { className: styles.formInput, type: "text", value: newAddress, onChange: (e) => setNewAddress(e.target.value) })] }) }), _jsx("div", { className: styles.formGroup, children: _jsxs("label", { className: styles.formLabel, children: ["Phone Number:", _jsx("input", { className: styles.formInput, type: "text", value: newPhoneNumber, onChange: (e) => setNewPhoneNumber(e.target.value) })] }) }), _jsxs("div", { className: styles.buttonContainer, children: [_jsx("button", { className: `${styles.button} ${styles.submitButton}`, onClick: handleSave, children: "Save" }), _jsx("button", { className: `${styles.button} ${styles.cancelButton}`, onClick: onClose, children: "Cancel" })] }), _jsx("hr", { className: styles.divider }), _jsx("p", { className: styles.deleteText, children: "Do you want to delete this script?" }), _jsx("div", { className: styles.deleteButtonContainer, children: _jsx("button", { className: `${styles.button} ${styles.deleteButton}`, onClick: handleDeleteClick, children: "Delete" }) }), showDeleteConfirmation && (_jsxs("div", { className: styles.deleteConfirmation, children: [_jsx("p", { children: "Deleting a script is permanent!" }), _jsxs("div", { className: styles.confirmationActions, children: [_jsx("button", { className: `${styles.confirmButton} ${styles.confirmDelete}`, onClick: confirmDelete, children: "Confirm" }), _jsx("button", { className: `${styles.confirmButton} ${styles.cancelDelete}`, onClick: cancelDelete, children: "Cancel" })] })] }))] }));
};
export default EditScriptModal;
