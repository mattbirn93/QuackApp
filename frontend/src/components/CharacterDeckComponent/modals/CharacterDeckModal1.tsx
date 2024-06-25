import React from "react";
import "./CharacterDeckModal1.css";

interface CharacterDeckModal1Props {
  onClose: () => void;
}

const CharacterDeckModal1: React.FC<CharacterDeckModal1Props> = ({
  onClose,
}) => {
  return (
    <div className="characterDeckModal1">
      <div className="characterDeckModal1-content">
        <span className="characterDeckModal1-close " onClick={onClose}>
          &times;
        </span>
        <p>Character Deck Modal Content</p>
      </div>
    </div>
  );
};

export default CharacterDeckModal1;
