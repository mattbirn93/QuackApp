import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import SidePanelView from "./SidePanelView";
const SidePanel = ({ scriptName }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        owners: true,
        versions: false,
        details: true,
        characters: true,
    });
    const owners = [
        { name: "Mike Giffin", isOnline: true },
        { name: "Matt Buttholtz", isOnline: false },
    ];
    // Mock list of characters
    const characters = [
        { name: "Mike" },
        { name: "Matt" },
        { name: "Alice" },
        { name: "Bob" },
        { name: "Tim" },
        { name: "Janet" },
        { name: "Sally" },
        { name: "Reed" },
        { name: "Patrick" },
        { name: "Simone" },
        { name: "Peter" },
        { name: "Valencia" },
        { name: "Steve" },
        { name: "York" },
        { name: "Stacy" },
        { name: "Walt" },
        { name: "Jesse" },
        { name: "Saul" },
        { name: "Kim" },
        { name: "Gus" },
        { name: "Skyler" },
        { name: "Junior" },
        { name: "Victor" },
        { name: "Tyrese" },
        { name: "Monica" },
        { name: "Virginia" },
        { name: "Andre" },
        { name: "Jeff" },
    ];
    const toggleSidePanel = () => {
        setIsOpen(!isOpen);
    };
    const handleMouseEnter = () => {
        if (!isOpen) {
            setIsHovered(true);
        }
    };
    const handleMouseLeave = () => {
        if (!isOpen) {
            setIsHovered(false);
        }
    };
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };
    return (_jsx(SidePanelView, { isOpen: isOpen, isHovered: isHovered, toggleSidePanel: toggleSidePanel, scriptName: scriptName, handleMouseEnter: handleMouseEnter, handleMouseLeave: handleMouseLeave, owners: owners, characters: characters, expandedSections: expandedSections, toggleSection: toggleSection }));
};
export default SidePanel;
