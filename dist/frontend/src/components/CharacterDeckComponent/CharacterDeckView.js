import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import CharacterDeckComponent from "./CharacterDeckComponent";
import styles from "./CharacterDeckView.module.css";
const CharacterDeckView = ({ characterArray, onCharacterButtonClick, }) => {
    const deckRef = useRef(null);
    useEffect(() => {
        const deckElement = deckRef.current;
        let startY = 0;
        let startHeight = 0;
        const onMouseMove = (e) => {
            const newHeight = startHeight - (e.clientY - startY); // Invert scroll direction
            if (deckElement) {
                deckElement.style.height = `${newHeight}px`;
            }
        };
        const onTouchMove = (e) => {
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
        const startResizingMouse = (e) => {
            startY = e.clientY;
            startHeight = deckElement?.offsetHeight || 0;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", stopResizing);
            e.preventDefault();
        };
        const startResizingTouch = (e) => {
            startY = e.touches[0].clientY;
            startHeight = deckElement?.offsetHeight || 0;
            document.addEventListener("touchmove", onTouchMove);
            document.addEventListener("touchend", stopResizing);
            document.addEventListener("touchcancel", stopResizing);
            e.preventDefault();
        };
        const handleElement = deckElement?.querySelector(`.${styles.resizeHandle}`);
        if (handleElement) {
            handleElement.addEventListener("mousedown", startResizingMouse);
            handleElement.addEventListener("touchstart", startResizingTouch);
        }
        return () => {
            if (handleElement) {
                handleElement.removeEventListener("mousedown", startResizingMouse);
                handleElement.removeEventListener("touchstart", startResizingTouch);
            }
        };
    }, []);
    useEffect(() => {
        if (deckRef.current) {
            deckRef.current.style.height = "7.5rem";
        }
    }, []);
    return (_jsx("div", { className: styles.wrapper, children: _jsx("div", { className: styles.mainContainer, children: _jsxs("div", { className: styles.characterDeck, ref: deckRef, children: [_jsx("div", { className: styles.characterDeckTitle, children: "Character Deck" }), _jsx(CharacterDeckComponent, { characterArray: characterArray, onCharacterButtonClick: onCharacterButtonClick }), _jsx("div", { className: styles.resizeHandle, children: _jsx("span", { className: styles.plusSign, children: "\u21D5" }) })] }) }) }));
};
export default CharacterDeckView;
