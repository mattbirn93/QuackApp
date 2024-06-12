import React from "react";
import ScriptsLibraryComponent from "../../components/ScriptsLibraryComponent/ScriptsLibraryComponent";
import "./ScriptsLibraryView.css";

const ScriptsLibraryView: React.FC = () => {
  return (
    <div className="ProseBackground scripts-library-background">
      <div className="top-container">
        <h1 className="heading1">Scripts Library View</h1>
      </div>
      <div className="scripts-document-container">
        <ScriptsLibraryComponent />
      </div>
    </div>
  );
};

export default ScriptsLibraryView;
