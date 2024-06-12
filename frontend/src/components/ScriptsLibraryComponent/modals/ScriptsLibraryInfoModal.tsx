// src/components/ScriptsLibraryComponent/modals/ScriptsLibraryInfoModal.tsx
import React, { useEffect, useState } from "react";
import "./ScriptsLibraryInfoModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  author: string;
  dateCreated: string;
  dateModified: string;
  onEdit: (newTitle: string, newAuthor: string) => void;
  onDelete: () => void;
}

const ScriptsLibraryInfoModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  author,
  dateCreated,
  dateModified,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
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

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsConfirmingDelete(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTitle(title);
    setNewAuthor(author);
  };

  const handleSaveEdit = () => {
    onEdit(newTitle, newAuthor);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="close-button">
          <button onClick={onClose}>X</button>
        </div>
        {isEditing ? (
          <>
            <div className="modal-field">
              <label>Title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="modal-field">
              <label>Written by:</label>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSaveEdit} className="save-button">
                Save
              </button>
              <button onClick={handleCancelEdit} className="cancel-button">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontWeight: 600, textAlign: "center" }}>
              "The Blue Ribbon Killer"
            </h2>
            <p>Written by: Michael Filoramo</p>
            <p>Date Created: 2020-10-05</p>
            <p>Date Modified: 2024-10-05</p>
            {/* <h2 style={{ fontWeight: 600, textAlign: "center" }}>{title}</h2>
            <p>Written by: {author}</p>
            <p>Date Created: {dateCreated}</p>
            <p>Date Modified: {dateModified}</p> */}
            {isConfirmingDelete ? (
              <div className="modal-confirm-delete">
                <p>Are you sure you want to delete this script?</p>
                <button
                  onClick={handleConfirmDelete}
                  className="confirm-button"
                >
                  Yes
                </button>
                <button onClick={handleCancelDelete} className="cancel-button">
                  No
                </button>
              </div>
            ) : (
              <div className="modal-actions">
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScriptsLibraryInfoModal;
