import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./sidePanel.css";

const SidePanel = ({ scriptName }: { scriptName: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  console.log("SCRIPTNAME: ", scriptName);

  return (
    <div className={`sidePanel ${isOpen ? "open" : "collapsed"}`}>
      <div className="toggleButtonContainer">
        <button className="toggleButton" onClick={toggleSidePanel}>
          {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      {isOpen && (
        <div className="sidePanelContent">
          <div className="titleContainer">
            <p className="scriptName">{scriptName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
