import React from "react";
import CharacterDeckButton from "./CharacterDeckButton";
import styles from "./CharacterDeckComponent.module.css";

interface CharacterDeckComponentProps {
  characterArray: string[];
  onCharacterButtonClick: (character: string) => void;
}

const CharacterDeckComponent: React.FC<CharacterDeckComponentProps> = ({
  characterArray,
  onCharacterButtonClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        {characterArray.map((character, index) => (
          <CharacterDeckButton
            key={index}
            letter={character[0]}
            color="#9b439a"
            onClick={() => onCharacterButtonClick(character)}
          />
        ))}
        <CharacterDeckButton
          letter={"+"}
          onClick={() => console.log("hi")}
          color="#9b439a"
        ></CharacterDeckButton>
      </div>
    </div>
  );
};

export default CharacterDeckComponent;
