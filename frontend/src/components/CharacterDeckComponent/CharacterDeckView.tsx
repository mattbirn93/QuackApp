import React, { useRef, useEffect } from "react";
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
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deckElement = deckRef.current;
    let startY = 0;
    let startHeight = 0;

    const onMouseMove = (e: MouseEvent) => {
      const newHeight = startHeight - (e.clientY - startY); // Invert scroll direction
      if (deckElement) {
        deckElement.style.height = `${newHeight}px`;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newHeight = startHeight - (touch.clientY - startY); // Invert scroll direction
      if (deckElement) {
        deckElement.style.height = `${newHeight}px`;
      }
    };

    const stopResizing = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", stopResizing);
      document.removeEventListener("touchend", stopResizing);
      document.removeEventListener("touchcancel", stopResizing);
    };

    const startResizingMouse = (e: MouseEvent) => {
      startY = e.clientY;
      startHeight = deckElement?.offsetHeight || 0;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResizing);
      e.preventDefault();
    };

    const startResizingTouch = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startHeight = deckElement?.offsetHeight || 0;
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", stopResizing);
      document.addEventListener("touchcancel", stopResizing);
      e.preventDefault();
    };

    const handleElement = deckElement?.querySelector(`.${styles.resizeHandle}`);
    if (handleElement) {
      handleElement.addEventListener(
        "mousedown",
        startResizingMouse as EventListener,
      );
      handleElement.addEventListener(
        "touchstart",
        startResizingTouch as EventListener,
      );
    }

    return () => {
      if (handleElement) {
        handleElement.removeEventListener(
          "mousedown",
          startResizingMouse as EventListener,
        );
        handleElement.removeEventListener(
          "touchstart",
          startResizingTouch as EventListener,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.style.height = "7.5rem";
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.characterDeck} ref={deckRef}>
          <div className={styles.characterDeckTitle}>Character Deck</div>
          <CharacterDeckComponent
            characterArray={characterArray}
            onCharacterButtonClick={onCharacterButtonClick}
          />
          <div className={styles.resizeHandle}>
            <span className={styles.plusSign}>⇕</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDeckView;
