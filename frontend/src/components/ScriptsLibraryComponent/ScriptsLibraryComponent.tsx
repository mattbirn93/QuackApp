import React, { useState, useEffect } from "react";
import scripts from "./scripts.json";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import Button1 from "../Button/Button1";
import ScriptsLibraryInfoModal from "./modals/ScriptsLibraryInfoModal";
import AddScriptModal from "./modals/AddScriptModal";
import "./ScriptsLibraryComponent.css";

interface Script {
  title: string;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>(scripts);
  const [loading, setLoading] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleScriptClick = () => {
    setIsInfoModalVisible(true);
  };

  const handleAddScriptClick = () => {
    setIsAddScriptModalVisible(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalVisible(false);
  };

  const handleCloseAddScriptModal = () => {
    setIsAddScriptModalVisible(false);
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
            <div
              className="script-container"
              key={index}
              onClick={handleScriptClick}
            >
              <img
                src={PageIcon1}
                alt="Script Icon"
                className="script-icon-image"
              />
              <p className="script-title">{script.title}</p>
            </div>
          ))
        )}
      </div>
      <ScriptsLibraryInfoModal
        isVisible={isInfoModalVisible}
        onClose={handleCloseInfoModal}
      />
      <AddScriptModal
        isVisible={isAddScriptModalVisible}
        onClose={handleCloseAddScriptModal}
      />
    </div>
  );
};

export default ScriptsLibraryComponent;
