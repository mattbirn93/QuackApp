import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CharacterDeckButton, CharacterDeckButtonAdd, } from "./CharacterDeckButton";
import CharacterDeckModal1 from "./modals/CharacterDeckModal1";
import styles from "./CharacterDeckComponent.module.css";
const CharacterDeckComponent = ({ characterArray: initialCharacterArray, onCharacterButtonClick, }) => {
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
    const moveCharacter = (dragIndex, hoverIndex) => {
        const draggedCharacter = characterArray[dragIndex];
        const updatedArray = [...characterArray];
        updatedArray.splice(dragIndex, 1);
        updatedArray.splice(hoverIndex, 0, draggedCharacter);
        setCharacterArray(updatedArray);
    };
    const removeCharacter = (character) => {
        setCharacterArray((prevArray) => prevArray.filter((item) => item !== character));
    };
    return (_jsx(DndProvider, { backend: HTML5Backend, children: _jsx("div", { className: styles.wrapper, children: _jsxs("div", { className: styles.mainContainer, children: [isModalOpen && _jsx(CharacterDeckModal1, { onClose: handleCloseModal }), _jsx(CharacterDeckButtonAdd, { letter: "+", onClick: handleAddButtonClick }), characterArray.map((character, index) => (_jsx(CharacterButton, { index: index, letter: character[0], character: character, moveCharacter: moveCharacter, onClick: () => onCharacterButtonClick(character), onRemove: () => removeCharacter(character) }, index)))] }) }) }));
};
const CharacterButton = ({ index, letter, character, moveCharacter, onClick, onRemove, }) => {
    const ref = React.useRef(null);
    const [showRemove, setShowRemove] = useState(false);
    const holdTimeout = useRef(null);
    const [, drop] = useDrop({
        accept: "character",
        hover(item) {
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
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current &&
                !ref.current.contains(event.target) &&
                !event.target.closest(`.${styles.removeButton}`)) {
                setShowRemove(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return (_jsxs("div", { className: styles.characterButtonContainer, children: [_jsx(CharacterDeckButton, { ref: ref, letter: letter, onClick: onClick, onDragStart: () => { }, onDragEnd: () => { }, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, className: isDragging ? styles.dragging : "" }), showRemove && (_jsx("button", { className: styles.removeButton, onClick: handleRemoveClick, children: "-" }))] }));
};
export default CharacterDeckComponent;
