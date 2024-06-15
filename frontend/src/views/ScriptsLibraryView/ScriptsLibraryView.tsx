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
        <ScriptsLibraryComponent />
      </div>
    </div>
  );
};

export default ScriptsLibraryView;
