import React, { useState } from "react";
import { CharacterDeckButton } from "./CharacterDeckButton";
import { CharacterDeckButtonAdd } from "./CharacterDeckButton";
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

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
    console.log("hi");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDragStart = (character: string) => {
    // Highlight the button being dragged (optional)
  };

  const handleDragEnd = (character: string, event: DragEvent) => {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    const { clientX, clientY } = event;

    if (
      clientX < 0 ||
      clientY < 0 ||
      clientX > screenWidth ||
      clientY > screenHeight
    ) {
      setCharacterArray((prevArray) =>
        prevArray.filter((item) => item !== character),
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        {isModalOpen && <CharacterDeckModal1 onClose={handleCloseModal} />}
        <CharacterDeckButtonAdd letter={"+"} onClick={handleAddButtonClick} />
        {characterArray.map((character, index) => (
          <CharacterDeckButton
            key={index}
            letter={character[0]}
            onClick={() => onCharacterButtonClick(character)}
            onDragStart={() => handleDragStart(character)}
            onDragEnd={(event) => handleDragEnd(character, event)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterDeckComponent;

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
