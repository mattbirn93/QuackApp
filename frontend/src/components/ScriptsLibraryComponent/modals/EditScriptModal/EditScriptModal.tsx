import React, { useState, useEffect } from "react";
import { ModalProps } from "./EditScriptModalInterface";
import Modal from "../../../common/Modal";
import styles from "../../../common/Modal.module.css";

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
    <Modal isVisible={isVisible} onClose={onClose} title="Edit Script">
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
          Written by:
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
        <button
          className={`${styles.button} ${styles.submitButton}`}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      <hr className={styles.divider} />
      <p className={styles.deleteText}>Do you want to delete script?</p>
      <div className={styles.deleteButtonContainer}>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
      {showDeleteConfirmation && (
        <div className={styles.deleteConfirmation}>
          <p>Are you sure you want to delete this script?</p>
          <div className={styles.confirmationActions}>
            <button
              className={`${styles.confirmButton} ${styles.confirmDelete}`}
              onClick={confirmDelete}
            >
              Yes
            </button>
            <button
              className={`${styles.confirmButton} ${styles.cancelDelete}`}
              onClick={cancelDelete}
            >
              No
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditScriptModal;

//////////////////////////////

// import React, { useState, useEffect } from "react";
// import { ModalProps } from "./EditScriptModalInterface";
// import Modal from "../../../common/Modal";
// import styles from "../../../common/Modal.module.css";

// const EditScriptModal: React.FC<ModalProps> = ({
//   isVisible,
//   onClose,
//   title,
//   writtenBy,
//   address,
//   phoneNumber,
//   onEdit,
//   onDelete,
// }) => {
//   const [newTitle, setNewTitle] = useState(title);
//   const [newWrittenBy, setNewWrittenBy] = useState(writtenBy);
//   const [newAddress, setNewAddress] = useState(address);
//   const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     if (isVisible) {
//       window.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isVisible, onClose]);

//   useEffect(() => {
//     setNewTitle(title);
//     setNewWrittenBy(writtenBy);
//     setNewAddress(address);
//     setNewPhoneNumber(phoneNumber);
//   }, [title, writtenBy, address, phoneNumber]);

//   const handleSave = () => {
//     onEdit(newTitle, newWrittenBy, newAddress, newPhoneNumber);
//     onClose();
//   };

//   const handleDeleteClick = () => {
//     setShowDeleteConfirmation(true);
//   };

//   const confirmDelete = () => {
//     onDelete();
//     onClose();
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirmation(false);
//   };

//   return (
//     <Modal isVisible={isVisible} onClose={onClose} title="Edit Script">
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           Title:
//           <input
//             className={styles.formInput}
//             type="text"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           Written by:
//           <input
//             className={styles.formInput}
//             type="text"
//             value={newWrittenBy}
//             onChange={(e) => setNewWrittenBy(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           Address:
//           <input
//             className={styles.formInput}
//             type="text"
//             value={newAddress}
//             onChange={(e) => setNewAddress(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           Phone Number:
//           <input
//             className={styles.formInput}
//             type="text"
//             value={newPhoneNumber}
//             onChange={(e) => setNewPhoneNumber(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className={styles.buttonContainer}>
//         <button
//           className={`${styles.button} ${styles.submitButton}`}
//           onClick={handleSave}
//         >
//           Save
//         </button>
//         <button
//           className={`${styles.button} ${styles.cancelButton}`}
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button
//           className={`${styles.button} ${styles.deleteButton}`}
//           onClick={handleDeleteClick}
//         >
//           Delete
//         </button>
//       </div>
//       {showDeleteConfirmation && (
//         <div className={styles.deleteConfirmation}>
//           <p>Are you sure you want to delete this script?</p>
//           <div className={styles.confirmationActions}>
//             <button
//               className={`${styles.confirmButton} ${styles.confirmDelete}`}
//               onClick={confirmDelete}
//             >
//               Yes
//             </button>
//             <button
//               className={`${styles.confirmButton} ${styles.cancelDelete}`}
//               onClick={cancelDelete}
//             >
//               No
//             </button>
//           </div>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default EditScriptModal;
