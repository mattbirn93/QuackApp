import React from "react";
import "./ScriptsLibraryView.css";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import scripts from "./scripts.json";

const ScriptsLibraryView = () => {
  return (
    <div className="ProseBackground ProseMirror scriptsLibraryBackground">
      <div className="topContainer">
        <h1 className="heading1">Scripts Library View</h1>
        <div className="scriptsDocumentContainer">
          {scripts.map((script, index) => (
            <div className="scriptContainer" key={index}>
              <img
                src={PageIcon1}
                alt="Script Icon"
                className="scriptIconImage"
              />
              <p className="scriptTitle">{script.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScriptsLibraryView;
