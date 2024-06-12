// src/components/ScriptsLibraryComponent/modals/ScriptsLibraryInfoModal.tsx
import React, { useEffect } from "react";
import "./ScriptsLibraryInfoModal.css";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  author: string;
  dateCreated: string;
  dateModified: string;
}

const ScriptsLibraryInfoModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  author,
  dateCreated,
  dateModified,
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
          "The Blue Ribbon Killer"
        </h2>
        <p>Written by: Michael Filoramo</p>
        <p>Date Created: 2020-10-05</p>
        <p>Date Modified: 2024-10-05</p>
        {/* <h2>{title}</h2>
        <p>Written by: {author}</p>
         <p>Date Created: {dateCreated}</p>
        <p>Date Modified: {dateModified}</p> */}
      </div>
    </div>
  );
};

export default ScriptsLibraryInfoModal;
