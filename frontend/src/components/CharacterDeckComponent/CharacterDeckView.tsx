import React from "react";
import CharacterDeckComponent from "./CharacterDeckComponent";
import styles from "./CharacterDeckView.module.css";

interface CharacterDeckViewProps {
  characterArray: string[];
  onCharacterButtonClick: (character: string) => void;
}

const CharacterDeckView: React.FC<CharacterDeckViewProps> = ({
  characterArray,
  onCharacterButtonClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.characterDeck}>
          <CharacterDeckComponent
            characterArray={characterArray}
            onCharacterButtonClick={onCharacterButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterDeckView;
