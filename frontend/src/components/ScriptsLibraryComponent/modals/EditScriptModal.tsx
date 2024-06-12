import React, { useState, useEffect } from "react";
import "./EditScriptModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  author: string;
  dateCreated: string;
  dateModified: string;
  onEdit: (newTitle: string, newAuthor: string) => void;
}

const EditScriptModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  author,
  dateCreated,
  dateModified,
  onEdit,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);

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
    setNewAuthor(author);
  }, [title, author]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSave = () => {
    onEdit(newTitle, newAuthor);
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
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
          </label>
        </div>
        <p>Date Created: {dateCreated}</p>
        <p>Date Modified: {dateModified}</p>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditScriptModal;
