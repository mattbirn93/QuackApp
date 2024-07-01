import { jsx as _jsx } from "react/jsx-runtime";
// src/components/LongPress.js
import React, { useState, useEffect, useRef } from "react";
const LongPress = ({ onLongPress, onClick, children }) => {
    const [isLongPress, setIsLongPress] = useState(false);
    const [timer, setTimer] = useState(null);
    const elementRef = useRef(null);
    useEffect(() => {
        const element = elementRef.current;
        const handleTouchStart = (e) => {
            e.preventDefault(); // Prevent default action on touch start
            e.stopPropagation(); // Stop propagation to avoid triggering other handlers
            setTimer(setTimeout(() => {
                setIsLongPress(true);
                onLongPress();
            }, 500));
        };
        const handleTouchEnd = (e) => {
            e.preventDefault(); // Prevent default action on touch end
            e.stopPropagation(); // Stop propagation to avoid triggering other handlers
            if (timer) {
                clearTimeout(timer);
            }
            if (!isLongPress) {
                onClick();
            }
            setIsLongPress(false);
        };
        const handleContextMenu = (e) => {
            e.preventDefault(); // Prevent default context menu on long press
            e.stopPropagation(); // Stop propagation to avoid triggering other handlers
        };
        if (element) {
            element.addEventListener("touchstart", handleTouchStart, {
                passive: false,
            });
            element.addEventListener("touchend", handleTouchEnd, { passive: false });
            element.addEventListener("contextmenu", handleContextMenu, {
                passive: false,
            });
        }
        return () => {
            if (element) {
                element.removeEventListener("touchstart", handleTouchStart);
                element.removeEventListener("touchend", handleTouchEnd);
                element.removeEventListener("contextmenu", handleContextMenu);
            }
        };
    }, [timer, isLongPress, onClick, onLongPress]);
    return (_jsx("div", { ref: elementRef, onMouseDown: (e) => e.preventDefault(), onMouseUp: (e) => e.preventDefault(), style: { display: "inline-block" }, children: children }));
};
export default LongPress;
