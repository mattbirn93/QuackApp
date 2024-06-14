import React, { useState, useEffect } from "react";
import { ModalProps } from "./AddScriptModalInterface";
import styles from "./AddScriptModal.module.css";

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

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  const handleSave = () => {
    onAdd(newTitle, newWrittenBy, newAddress, newPhoneNumber);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton}>
          <button className={styles.closeButtonBtn} onClick={onClose}>
            X
          </button>
        </div>

        <h2 className={styles.h2}>Add New Script</h2>

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
      </div>
    </div>
  );
};

export default AddScriptModal;
