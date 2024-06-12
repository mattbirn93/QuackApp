import React, { useEffect } from "react";
import "./DeleteScriptModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
}

const DeleteScriptModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  onDelete,
  title,
}) => {
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
    if ((e.target as Element).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="close-button">
          <button onClick={onClose}>X</button>
        </div>
        <h2 style={{ fontWeight: 600, textAlign: "center" }}>
          Are you sure you want to delete "{title}"?
        </h2>
        <div className="modal-actions">
          <button onClick={onDelete} className="confirm-button">
            Yes
          </button>
          <button onClick={onClose} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteScriptModal;
