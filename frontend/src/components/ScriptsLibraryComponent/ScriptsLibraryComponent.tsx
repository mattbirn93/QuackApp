/////////////////////////////////

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scripts from "./scripts.json";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import Button1 from "../Button/Button1";
import EditScriptModal from "./modals/EditScriptModal";
import AddScriptModal from "./modals/AddScriptModal";
import DeleteScriptModal from "./modals/DeleteScriptModal";
import "./ScriptsLibraryComponent.css";
import editIcon from "../../assets/images/editIcon.png";
import deleteIcon from "../../assets/images/deleteIcon.png";

interface Script {
  title: string;
  writtenBy: string;
  address: string;
  phoneNumber: string;
  dateCreated: string;
  dateModified: string;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>(scripts);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleScriptClick = () => {
    navigate("/"); // Redirect to home page
  };

  const handleEditClick = (script: Script) => {
    setSelectedScript(script);
    setIsEditModalVisible(true);
  };

  const handleDeleteClick = (script: Script) => {
    setSelectedScript(script);
    setIsDeleteModalVisible(true);
  };

  const handleAddScriptClick = () => {
    setIsAddScriptModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleCloseAddScriptModal = () => {
    setIsAddScriptModalVisible(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleEditScript = (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string,
  ) => {
    if (selectedScript) {
      setScriptList((prevList) =>
        prevList.map((script) =>
          script.title === selectedScript.title
            ? {
                ...script,
                title: newTitle,
                writtenBy: newWrittenBy,
                address: newAddress,
                phoneNumber: newPhoneNumber,
              }
            : script,
        ),
      );
      setIsEditModalVisible(false);
    }
  };

  const handleDeleteScript = () => {
    if (selectedScript) {
      setScriptList((prevList) =>
        prevList.filter((script) => script.title !== selectedScript.title),
      );
      setIsDeleteModalVisible(false);
    }
  };

  return (
    <div className="scripts-library-component">
      <div className="scriptsButtonContainer">
        <Button1 onClick={handleAddScriptClick} variant="tertiary" size="small">
          Add Scripts +
        </Button1>
      </div>
      <div className="scripts-library-component">
        {loading ? (
          <p>Loading...</p>
        ) : (
          scriptList.map((script, index) => (
            <div className="script-container" key={index}>
              <div className="script-icons-container">
                <img
                  src={editIcon}
                  alt="Edit Icon"
                  className="icon"
                  onClick={() => handleEditClick(script)}
                />
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  className="icon"
                  onClick={() => handleDeleteClick(script)}
                />
              </div>
              <img
                src={PageIcon1}
                alt="Script Icon"
                className="script-icon-image"
                onClick={handleScriptClick}
              />
              <p className="script-title">{script.title}</p>
            </div>
          ))
        )}
      </div>
      {selectedScript && (
        <EditScriptModal
          isVisible={isEditModalVisible}
          onClose={handleCloseEditModal}
          onEdit={handleEditScript}
          title={selectedScript.title}
          writtenBy={selectedScript.writtenBy}
          address={selectedScript.address}
          phoneNumber={selectedScript.phoneNumber}
          dateCreated={selectedScript.dateCreated}
          dateModified={selectedScript.dateModified}
        />
      )}
      <AddScriptModal
        isVisible={isAddScriptModalVisible}
        onClose={handleCloseAddScriptModal}
      />
      {selectedScript && (
        <DeleteScriptModal
          isVisible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteScript}
          title={selectedScript.title}
        />
      )}
    </div>
  );
};

export default ScriptsLibraryComponent;
