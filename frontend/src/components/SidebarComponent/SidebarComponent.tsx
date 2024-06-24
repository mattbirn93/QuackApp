import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ scriptName }: { scriptName: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  console.log("SCRIPTNAME: ", scriptName);

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="toggleButtonContainer">
        <button className="toggleButton" onClick={toggleSidebar}>
          {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      {isOpen && (
        <div className="sidebarContent">
          <div className="titleContainer">
            <p className="scriptName">{scriptName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
