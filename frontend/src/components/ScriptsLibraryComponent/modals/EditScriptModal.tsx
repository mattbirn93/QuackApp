import React, { useState, useEffect } from "react";
import { ModalProps } from "./EditScriptModalInterface";
import styles from "./EditScriptModal.module.css";

const EditScriptModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  writtenBy,
  address,
  phoneNumber,

  onEdit,
  onDelete,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newWrittenBy, setNewWrittenBy] = useState(writtenBy);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  useEffect(() => {
    setNewTitle(title);
    setNewWrittenBy(writtenBy);
    setNewAddress(address);
    setNewPhoneNumber(phoneNumber);
  }, [title, writtenBy, address, phoneNumber]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

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

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton}>
          <button className={styles.closeButtonBtn} onClick={onClose}>
            X
          </button>
        </div>
        <h2 className={styles.modalContentH2}>Edit Script</h2>
        <div>
          <label className={styles.modalContentLabel}>
            Title:
            <input
              className={styles.modalContentInput}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className={styles.modalContentLabel}>
            Written by:
            <input
              className={styles.modalContentInput}
              type="text"
              value={newWrittenBy}
              onChange={(e) => setNewWrittenBy(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className={styles.modalContentLabel}>
            Address:
            <input
              className={styles.modalContentInput}
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className={styles.modalContentLabel}>
            Phone Number:
            <input
              className={styles.modalContentInput}
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.modalActions}>
          <button
            className={`${styles.modalActionsBtn} ${styles.modalActionsBtnPrimary}`}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className={`${styles.modalActionsBtn} ${styles.modalActionsBtnSecondary}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${styles.modalActionsBtn} ${styles.deleteButton}`}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
        {showDeleteConfirmation && (
          <div className={styles.deleteConfirmation}>
            <p>Are you sure you want to delete this script?</p>
            <div className={styles.confirmationActions}>
              <button className={styles.confirmDelete} onClick={confirmDelete}>
                Yes
              </button>
              <button className={styles.cancelDelete} onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditScriptModal;
