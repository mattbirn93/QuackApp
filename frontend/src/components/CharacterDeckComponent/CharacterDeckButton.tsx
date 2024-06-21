import React from "react";
import styles from "./CharacterDeckButton.module.css";

interface CharacterDeckButtonProps {
  letter: string;
  onClick: () => void;
}

export const CharacterDeckButton: React.FC<CharacterDeckButtonProps> = ({
  letter,
  onClick,
}) => {
  return (
    <button className={styles.characterDeckButton} onClick={onClick}>
      {letter}
    </button>
  );
};

export const CharacterDeckButtonAdd: React.FC<CharacterDeckButtonProps> = ({
  letter,
  onClick,
}) => {
  return (
    <button className={styles.characterDeckButtonAdd} onClick={onClick}>
      {letter}
    </button>
  );
};
