import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  CharacterDeckButton,
  CharacterDeckButtonAdd,
} from "./CharacterDeckButton";
import CharacterDeckModal1 from "./modals/CharacterDeckModal1";
import styles from "./CharacterDeckComponent.module.css";

interface CharacterDeckComponentProps {
  characterArray: string[];
  onCharacterButtonClick: (character: string) => void;
}

const CharacterDeckComponent: React.FC<CharacterDeckComponentProps> = ({
  characterArray: initialCharacterArray,
  onCharacterButtonClick,
}) => {
  const [characterArray, setCharacterArray] = useState(initialCharacterArray);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (initialCharacterArray && initialCharacterArray.length > 0) {
      setCharacterArray(initialCharacterArray);
    }
  }, [initialCharacterArray]);

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
    console.log("hi");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const moveCharacter = (dragIndex: number, hoverIndex: number) => {
    const draggedCharacter = characterArray[dragIndex];
    const updatedArray = [...characterArray];
    updatedArray.splice(dragIndex, 1);
    updatedArray.splice(hoverIndex, 0, draggedCharacter);
    setCharacterArray(updatedArray);
  };

  const removeCharacter = (character: string) => {
    setCharacterArray((prevArray) =>
      prevArray.filter((item) => item !== character),
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
          {isModalOpen && <CharacterDeckModal1 onClose={handleCloseModal} />}
          <CharacterDeckButtonAdd letter={"+"} onClick={handleAddButtonClick} />
          {characterArray.map((character, index) => (
            <CharacterButton
              key={index}
              index={index}
              letter={character[0]}
              character={character}
              moveCharacter={moveCharacter}
              onClick={() => onCharacterButtonClick(character)}
              onRemove={() => removeCharacter(character)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

interface CharacterButtonProps {
  index: number;
  letter: string;
  character: string;
  moveCharacter: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
  onRemove: () => void;
}

const CharacterButton: React.FC<CharacterButtonProps> = ({
  index,
  letter,
  character,
  moveCharacter,
  onClick,
  onRemove,
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [showRemove, setShowRemove] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const [, drop] = useDrop({
    accept: "character",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCharacter(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "character",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleMouseDown = () => {
    holdTimeout.current = setTimeout(() => {
      setShowRemove(true);
    }, 4000);
  };

  const handleMouseUp = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
  };

  const handleRemoveClick = () => {
    setShowRemove(false);
    onRemove();
  };

  return (
    <div className={styles.characterButtonContainer}>
      <CharacterDeckButton
        ref={ref}
        letter={letter}
        onClick={onClick}
        onDragStart={() => {}}
        onDragEnd={() => {}}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={isDragging ? styles.dragging : ""}
      />
      {showRemove && (
        <button className={styles.removeButton} onClick={handleRemoveClick}>
          -
        </button>
      )}
    </div>
  );
};

export default CharacterDeckComponent;

///////////////////

// import React, { useState, useEffect } from "react";
// import { useDrag, useDrop, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { CharacterDeckButton } from "./CharacterDeckButton";
// import { CharacterDeckButtonAdd } from "./CharacterDeckButton";
// import CharacterDeckModal1 from "./modals/CharacterDeckModal1";
// import styles from "./CharacterDeckComponent.module.css";

// interface CharacterDeckComponentProps {
//   characterArray: string[];
//   onCharacterButtonClick: (character: string) => void;
// }

// const CharacterDeckComponent: React.FC<CharacterDeckComponentProps> = ({
//   characterArray: initialCharacterArray,
//   onCharacterButtonClick,
// }) => {
//   const [characterArray, setCharacterArray] = useState(initialCharacterArray);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Set the initial character array when the component mounts
//     if (initialCharacterArray && initialCharacterArray.length > 0) {
//       setCharacterArray(initialCharacterArray);
//     }
//   }, [initialCharacterArray]);

//   const handleAddButtonClick = () => {
//     setIsModalOpen(true);
//     console.log("hi");
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const moveCharacter = (dragIndex: number, hoverIndex: number) => {
//     const draggedCharacter = characterArray[dragIndex];
//     const updatedArray = [...characterArray];
//     updatedArray.splice(dragIndex, 1);
//     updatedArray.splice(hoverIndex, 0, draggedCharacter);
//     setCharacterArray(updatedArray);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className={styles.wrapper}>
//         <div className={styles.mainContainer}>
//           {isModalOpen && <CharacterDeckModal1 onClose={handleCloseModal} />}
//           <CharacterDeckButtonAdd letter={"+"} onClick={handleAddButtonClick} />
//           {characterArray.map((character, index) => (
//             <CharacterButton
//               key={index}
//               index={index}
//               letter={character[0]}
//               character={character}
//               moveCharacter={moveCharacter}
//               onClick={() => onCharacterButtonClick(character)}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// interface CharacterButtonProps {
//   index: number;
//   letter: string;
//   character: string;
//   moveCharacter: (dragIndex: number, hoverIndex: number) => void;
//   onClick: () => void;
// }

// const CharacterButton: React.FC<CharacterButtonProps> = ({
//   index,
//   letter,
//   character,
//   moveCharacter,
//   onClick,
// }) => {
//   const ref = React.useRef<HTMLButtonElement>(null);

//   const [, drop] = useDrop({
//     accept: "character",
//     hover(item: { index: number }) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       moveCharacter(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: "character",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   return (
//     <button
//       ref={ref}
//       className={`${styles.characterDeckButton} ${
//         isDragging ? styles.dragging : ""
//       }`}
//       onClick={onClick}
//     >
//       {letter}
//     </button>
//   );
// };

// export default CharacterDeckComponent;

//////////////

// import React, { useState } from "react";
// import { CharacterDeckButton } from "./CharacterDeckButton";
// import { CharacterDeckButtonAdd } from "./CharacterDeckButton";
// import CharacterDeckModal1 from "./modals/CharacterDeckModal1";
// import styles from "./CharacterDeckComponent.module.css";

// interface CharacterDeckComponentProps {
//   characterArray: string[];
//   onCharacterButtonClick: (character: string) => void;
// }

// const CharacterDeckComponent: React.FC<CharacterDeckComponentProps> = ({
//   characterArray,
//   onCharacterButtonClick,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddButtonClick = () => {
//     setIsModalOpen(true);
//     console.log("hi");
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.mainContainer}>
//         {isModalOpen && <CharacterDeckModal1 onClose={handleCloseModal} />}
//         <CharacterDeckButtonAdd letter={"+"} onClick={handleAddButtonClick} />
//         {characterArray.map((character, index) => (
//           <CharacterDeckButton
//             key={index}
//             letter={character[0]}
//             onClick={() => onCharacterButtonClick(character)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CharacterDeckComponent;
