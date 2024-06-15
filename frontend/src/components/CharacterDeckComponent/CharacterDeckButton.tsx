import React from "react";
import styles from "./CharacterDeckButton.module.css";

interface CharacterDeckButtonProps {
  letter: string;
  color: string;
  onClick: () => void;
}

const CharacterDeckButton: React.FC<CharacterDeckButtonProps> = ({
  letter,
  color,
  onClick,
}) => {
  return (
    <button
      className={styles.characterDeckButton}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {letter}
    </button>
  );
};

export default CharacterDeckButton;
