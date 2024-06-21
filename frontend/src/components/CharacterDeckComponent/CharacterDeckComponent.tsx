import React from "react";
import { CharacterDeckButton } from "./CharacterDeckButton";
import { CharacterDeckButtonAdd } from "./CharacterDeckButton";
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
        <CharacterDeckButtonAdd
          letter={"+"}
          onClick={() => console.log("hi")}
        />
        {characterArray.map((character, index) => (
          <CharacterDeckButton
            key={index}
            letter={character[0]}
            onClick={() => onCharacterButtonClick(character)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterDeckComponent;
