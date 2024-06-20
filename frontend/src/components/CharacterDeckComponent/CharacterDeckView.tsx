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
  const [height, setHeight] = useState(150); // Initial height of the characterDeck in pixels
  const isResizing = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    document.body.style.cursor = "ns-resize";
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isResizing.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newHeight = window.innerHeight - e.clientY;
    if (newHeight >= 80 && newHeight <= 320) {
      setHeight(newHeight);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isResizing.current) return;
    const touch = e.touches[0];
    const newHeight = window.innerHeight - touch.clientY;
    if (newHeight >= 80 && newHeight <= 320) {
      setHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
  };

  const handleTouchEnd = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.characterDeck} style={{ height: `${height}px` }}>
          <div
            className={styles.resizeHandle}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className={styles.resizeIcon}></div>
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
