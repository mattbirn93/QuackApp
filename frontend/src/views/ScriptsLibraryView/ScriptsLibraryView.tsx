import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import ScriptsLibraryComponent from "../../components/ScriptsLibraryComponent/ScriptsLibraryComponent";
import Duck from "../../assets/images/duck1.png";
import styles from "./ScriptsLibraryView.module.css";

const ScriptsLibraryView: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <div className={styles.searchBarContainer}>
            <div className={styles.searchBarWrapper}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchBar}
              />
            </div>
          </div>
          <div className={styles.signInButtonContainer}>
            <button className={styles.signInButton}>
              <FontAwesomeIcon
                icon={faUser}
                className={styles.signInButtonIcon}
              />
              Sign In
            </button>
          </div>
        </div>
        <div className={styles.headingsContainer}>
          <h1 className={styles.heading1}>Scripts Library Home preview</h1>
          <h2 className={styles.heading2}>Open up a script to get started</h2>
        </div>

        <ScriptsLibraryComponent />
      </div>
    </div>
  );
};
export default ScriptsLibraryView;
