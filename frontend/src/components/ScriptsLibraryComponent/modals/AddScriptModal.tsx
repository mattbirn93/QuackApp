import React, { useState, useEffect } from "react";
import "./AddScriptModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddScriptModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dateModified, setDateModified] = useState("");

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
    const currentDate = new Date().toISOString().split("T")[0];
    setDateCreated(currentDate);
    setDateModified(currentDate);
  }, [isVisible]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, author, dateCreated, dateModified });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="close-button">
          <button onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Written By:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Add Script</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScriptModal;
