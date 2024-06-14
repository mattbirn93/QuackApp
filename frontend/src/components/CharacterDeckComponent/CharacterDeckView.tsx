import React from "react";
import CharacterDeckComponent from "./CharacterDeckComponent";
import styles from "./CharacterDeckView.module.css";

const CharacterDeckView = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.characterDeck}>
          <CharacterDeckComponent />
        </div>
      </div>
    </div>
  );
};

export default CharacterDeckView;
