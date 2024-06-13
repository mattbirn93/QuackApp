// src/components/ScriptsLibraryComponent/modals/EditScriptModal.tsx
import React, { useState, useEffect } from "react";
import "./EditScriptModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  writtenBy: string;
  address: string;
  phoneNumber: string;
  dateCreated: string;
  dateModified: string;
  onEdit: (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string,
  ) => void;
}

const EditScriptModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  writtenBy,
  address,
  phoneNumber,
  dateCreated,
  dateModified,
  onEdit,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newWrittenBy, setNewWrittenBy] = useState(writtenBy);
  const [newAddress, setNewAddress] = useState(address);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

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
    if ((e.target as Element).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSave = () => {
    onEdit(newTitle, newWrittenBy, newAddress, newPhoneNumber);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="close-button">
          <button onClick={onClose}>X</button>
        </div>
        <h2>Edit Script</h2>
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
        <div>
          <p>Date Created: {dateCreated}</p>
          <p>Date Modified: {dateModified}</p>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditScriptModal;
