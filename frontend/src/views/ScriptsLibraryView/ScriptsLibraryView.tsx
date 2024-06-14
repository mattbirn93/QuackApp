import React from "react";
import ScriptsLibraryComponent from "../../components/ScriptsLibraryComponent/ScriptsLibraryComponent";
import styles from "./ScriptsLibraryView.module.css";

const ScriptsLibraryView: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <h1 className={styles.heading1}>Scripts Library View</h1>
        </div>
        <div className={styles.scriptsDocumentContainer}>
          <ScriptsLibraryComponent />
        </div>
      </div>
    </div>
  );
};

export default ScriptsLibraryView;
