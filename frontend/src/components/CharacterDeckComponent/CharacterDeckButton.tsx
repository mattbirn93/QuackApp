import React, { forwardRef } from "react";
import styles from "./CharacterDeckButton.module.css";

interface CharacterDeckButtonProps {
  letter: string;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: (event: React.DragEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const CharacterDeckButton = forwardRef<
  HTMLButtonElement,
  CharacterDeckButtonProps
>(({ letter, onClick, onDragStart, onDragEnd, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`${styles.characterDeckButton} ${className}`}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
    >
      {letter}
    </button>
  );
});

export const CharacterDeckButtonAdd: React.FC<{
  letter: string;
  onClick: () => void;
}> = ({ letter, onClick }) => {
  return (
    <button className={styles.characterDeckButtonAdd} onClick={onClick}>
      {letter}
    </button>
  );
};

///////////////////////

// import React from "react";
// import styles from "./CharacterDeckButton.module.css";

// interface CharacterDeckButtonProps {
//   letter: string;
//   onClick: () => void;
// }

// export const CharacterDeckButton: React.FC<CharacterDeckButtonProps> = ({
//   letter,
//   onClick,
// }) => {
//   return (
//     <button className={styles.characterDeckButton} onClick={onClick}>
//       {letter}
//     </button>
//   );
// };

// export const CharacterDeckButtonAdd: React.FC<CharacterDeckButtonProps> = ({
//   letter,
//   onClick,
// }) => {
//   return (
//     <button className={styles.characterDeckButtonAdd} onClick={onClick}>
//       {letter}
//     </button>
//   );
// };
