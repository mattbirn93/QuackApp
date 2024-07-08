import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
// import Ball3D1 from "../../components/Ball3D1/Ball3D1";
// import background2 from "../../assets/images/background2.jpg";
// import background3 from "../../assets/images/background3.png";
import background4 from "../../assets/images/background4.png";
// import background5 from "../../assets/images/background5.png";
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
          <img src={background4} className={styles.backgroundImage} />
          {/* <Ball3D1 /> */}
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
        <div className={styles.loginSectionContainer}>
          <p className={styles.heading1}>Quack!</p>
          <p className={styles.heading2}>
            A Realtime Collaborative Screenwriting App
          </p>
          <p className={styles.missionStatement1}>
            Create and share scripts with other users and create the vision you
            have always dreamed about!.
          </p>
          <button className={styles.tryItButton} onClick={() => {}}>
            Try It Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
