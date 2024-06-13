import React, { useState, useEffect } from "react";
import "./AddScriptModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string
  ) => void;
}

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
    if ((e.target as Element).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSave = () => {
    onAdd(newTitle, newWrittenBy, newAddress, newPhoneNumber);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="close-button">
          <button onClick={onClose}>X</button>
        </div>
        <h2>Add New Script</h2>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Written by:
            <input
              type="text"
              value={newWrittenBy}
              onChange={(e) => setNewWrittenBy(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddScriptModal;
