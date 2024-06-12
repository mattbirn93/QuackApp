import React, { useState, useEffect } from "react";
import scripts from "./scripts.json";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import Button1 from "../Button/Button1";
import "./ScriptsLibraryComponent.css";

interface Script {
  title: string;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>(scripts);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    console.log("I was clicked!");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="scriptsButtonContainer">
        <Button1 onClick={handleClick} variant="tertiary" size="small">
          Add Scripts +
        </Button1>
      </div>
      <div className="scripts-library-component">
        {loading ? (
          <p>Loading...</p>
        ) : (
          scriptList.map((scripts, index) => (
            <div className="script-container" key={index}>
              <img
                src={PageIcon1}
                alt="Script Icon"
                className="script-icon-image"
              />
              <p className="script-title">{scripts.title}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ScriptsLibraryComponent;
