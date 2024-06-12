import React, { useState, useEffect } from "react";
import scripts from "./scripts.json";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import "./ScriptsLibraryComponent.css";

interface Script {
  title: string;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>(scripts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="scripts-library-component">
      {loading ? (
        <p>Loading...</p>
      ) : (
        scriptList.map((script, index) => (
          <div className="script-container" key={index}>
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
  );
};

export default ScriptsLibraryComponent;
