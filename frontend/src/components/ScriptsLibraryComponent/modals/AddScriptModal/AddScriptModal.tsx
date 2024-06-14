import React, { useState, useEffect } from "react";
import { ModalProps } from "./AddScriptModalInterface";
import Modal from "../../../common/Modal";
import styles from "../../../common/Modal.module.css";

const AddScriptModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  onAdd,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newWrittenBy, setNewWrittenBy] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Add New Script">
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Title:
          <input
            className={styles.formInput}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Written By:
          <input
            className={styles.formInput}
            type="text"
            value={newWrittenBy}
            onChange={(e) => setNewWrittenBy(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Address:
          <input
            className={styles.formInput}
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Phone Number:
          <input
            className={styles.formInput}
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={handleSave}>
          Save
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddScriptModal;
