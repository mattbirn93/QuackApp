import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  title,
}) => {
  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton}>
          <button className={styles.closeButtonBtn} onClick={onClose}>
            X
          </button>
        </div>
        <h2 className={styles.h2}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
