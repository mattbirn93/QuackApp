import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import styles from "./CharacterDeckButton.module.css";
export const CharacterDeckButton = forwardRef(({ letter, onClick, onDragStart, onDragEnd, className, onMouseDown, onMouseUp, onMouseLeave, ...props }, ref) => {
    return (_jsx("button", { ref: ref, className: `${styles.characterDeckButton} ${className}`, onClick: onClick, draggable: true, onDragStart: onDragStart, onDragEnd: onDragEnd, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseLeave: onMouseLeave, ...props, children: letter }));
});
export const CharacterDeckButtonAdd = ({ letter, onClick }) => {
    return (_jsx("button", { className: styles.characterDeckButtonAdd, onClick: onClick, children: letter }));
};
