import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoginView.module.css";

const LoginView = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.homeNavContainer}>
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
        <p className={styles.heading1}>Quack!</p>
        <p className={styles.heading2}>
          A Realtime Collaborative Screenwriting App
        </p>
      </div>
    </div>
  );
};

export default LoginView;
