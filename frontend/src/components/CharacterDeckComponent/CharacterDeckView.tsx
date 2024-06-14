import React from "react";
import CharacterDeckComponent from "./CharacterDeckComponent";
import styles from "./CharacterDeckView.module.css";

const CharacterDeckView = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.characterDeck}>
          <h2>
            Hello From The Character View just for rendering child component
          </h2>
          <CharacterDeckComponent />
        </div>
      </div>
    </div>
  );
};

export default CharacterDeckView;
