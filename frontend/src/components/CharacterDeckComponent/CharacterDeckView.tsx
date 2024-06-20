import React, { useState, useRef, useEffect } from "react";
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
  const [height, setHeight] = useState(150);
  const isResizing = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    document.body.style.cursor = "ns-resize";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newHeight = window.innerHeight - e.clientY;
    if (newHeight >= 80 && newHeight <= 320) {
      setHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.characterDeck} style={{ height: `${height}px` }}>
          <div className={styles.resizeHandle} onMouseDown={handleMouseDown}>
            <span className={styles.plusSign}>+</span>
          </div>
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
