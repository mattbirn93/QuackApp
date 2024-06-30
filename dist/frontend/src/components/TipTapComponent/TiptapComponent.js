import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
import NodeButton from "../nodes/NodeButton";
import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
import MicOn from "../../assets/images/icons8-microphone-On.png";
import MicOff from "../../assets/images/icons8-microphone-Off.png";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import CharacterDeckView from "../CharacterDeckComponent/CharacterDeckView";
import SidePanelComponent from "../SidePanelComponent/SidePanelComponent";
import ChatPanelComponent from "../ChatPanelComponent/ChatPanelComponent";
import "./tiptap.css";
import { FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaStrikethrough, FaUnderline, FaUndo, FaBars, } from "react-icons/fa";
const ydoc = new Y.Doc();
const provider = new WebrtcProvider("TipTap", ydoc);
const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }
    return (_jsxs("div", { className: "menuBar", children: [_jsx("button", { onClick: () => editor.chain().focus().toggleBold().run(), className: editor.isActive("bold") ? "is_active" : "", children: _jsx(FaBold, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleItalic().run(), className: editor.isActive("italic") ? "is_active" : "", children: _jsx(FaItalic, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleUnderline().run(), className: editor.isActive("underline") ? "is_active" : "", children: _jsx(FaUnderline, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleStrike().run(), className: editor.isActive("strike") ? "is_active" : "", children: _jsx(FaStrikethrough, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), className: editor.isActive("heading", { level: 2 }) ? "is_active" : "", children: _jsx(FaHeading, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), className: editor.isActive("heading", { level: 3 }) ? "is_active" : "", children: _jsx(FaHeading, { className: "heading3" }) }), _jsx("button", { onClick: () => editor.chain().focus().toggleBulletList().run(), className: editor.isActive("bulletList") ? "is_active" : "", children: _jsx(FaListUl, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleOrderedList().run(), className: editor.isActive("orderedList") ? "is_active" : "", children: _jsx(FaListOl, {}) }), _jsx("button", { onClick: () => editor.chain().focus().toggleBlockquote().run(), className: editor.isActive("blockquote") ? "is_active" : "", children: _jsx(FaQuoteLeft, {}) })] }));
};
const HamburgerMenu = ({ toggleFileMenu, toggleEditMenu, toggleMenu }) => (_jsxs("div", { className: "hamburgerMenu", children: [_jsx("button", { onClick: toggleFileMenu, children: "File" }), _jsx("button", { onClick: toggleEditMenu, children: "Edit" }), _jsx("button", { onClick: toggleMenu, children: "Styles" })] }));
const extensions = [
    StarterKit,
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({
        provider: provider,
        user: { name: "Mike Giffin", color: "red" },
    }),
    Action,
    SceneHeader,
    Character,
    Dialogue,
];
export const Tiptap = ({ initialContent, setDescription, scriptId, scriptName, characterArray, }) => {
    const [recordingState, setRecordingState] = useState("stop");
    const [listening, setListening] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [fileMenuVisible, setFileMenuVisible] = useState(false);
    const [editMenuVisible, setEditMenuVisible] = useState(false);
    const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);
    const fileMenuRef = useRef(null);
    const editMenuRef = useRef(null);
    const hamburgerMenuRef = useRef(null);
    const API_BASE_URL = getApiBaseUrl();
    console.log(initialContent, "initial content");
    const toggleRecording = () => {
        setRecordingState((prev) => {
            const newState = prev === "stop" ? "start" : "stop";
            console.log("Toggled recording state to:", newState);
            setListening(newState === "start");
            return newState;
        });
    };
    const stopRecording = () => {
        setRecordingState("stop");
        setListening(false);
    };
    const startRecording = () => {
        setRecordingState("start");
        setListening(true);
    };
    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };
    const toggleFileMenu = () => {
        setFileMenuVisible((prev) => {
            if (editMenuVisible)
                setEditMenuVisible(false);
            return !prev;
        });
    };
    const toggleEditMenu = () => {
        setEditMenuVisible((prev) => {
            if (fileMenuVisible)
                setFileMenuVisible(false);
            return !prev;
        });
    };
    const toggleHamburgerMenu = () => {
        setHamburgerMenuVisible((prev) => !prev);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fileMenuRef.current &&
                !fileMenuRef.current.contains(event.target) &&
                !editMenuRef.current.contains(event.target) &&
                !hamburgerMenuRef.current.contains(event.target)) {
                setFileMenuVisible(false);
                setEditMenuVisible(false);
                setHamburgerMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const editor = useEditor({
        extensions,
        content: initialContent,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            const json = editor.getJSON();
            const text = editor.getText();
            console.log("HTML:", html);
            console.log("JSON:", JSON.stringify(json, null, 2));
            console.log("Text:", text);
            setDescription(html);
        },
    });
    const handleSpeechText = (text) => {
        if (editor) {
            editor.chain().focus().insertContent(text).run();
        }
    };
    const insertNewLine = () => {
        if (editor) {
            const { state, dispatch } = editor.view;
            const { tr } = state;
            tr.split(state.selection.head);
            dispatch(tr);
        }
    };
    const handleCharacterButtonClick = (character) => {
        console.log("Character button clicked:", character);
        if (editor) {
            if (listening) {
                stopRecording(); // Stop current recording if listening
                setTimeout(() => {
                    insertNewLine(); // Insert a new line after stopping recording
                    insertNewLine(); // Extra new line for space between dialogue pairs
                    editor
                        .chain()
                        .focus()
                        .setNode("character")
                        .insertContent(character)
                        .run();
                    setTimeout(() => {
                        insertNewLine(); // Insert a new line after character node
                        editor.chain().focus().setNode("dialogue").run();
                        setTimeout(() => {
                            startRecording(); // Start recording when dialogue node is created
                        }, 500); // Small delay before starting the new recording
                    }, 0);
                }, 500);
            }
            else {
                insertNewLine(); // Insert a new line before inserting character node
                editor
                    .chain()
                    .focus()
                    .setNode("character")
                    .insertContent(character)
                    .run();
                setTimeout(() => {
                    insertNewLine(); // Insert a new line after character node
                    editor.chain().focus().setNode("dialogue").run();
                    startRecording(); // Start recording when dialogue node is created if not already listening
                }, 500); // Small delay before starting the new recording
            }
        }
    };
    const handleActionButtonClick = () => {
        console.log("Action button clicked");
        if (editor) {
            if (listening) {
                stopRecording();
                setTimeout(() => {
                    insertNewLine();
                    editor.chain().focus().setNode("action").run();
                    setTimeout(() => {
                        insertNewLine();
                        startRecording();
                    }, 500);
                }, 500);
            }
            else {
                insertNewLine();
                editor.chain().focus().setNode("action").run();
                setTimeout(() => {
                    insertNewLine();
                    startRecording();
                }, 500);
            }
        }
    };
    const handleSceneHeaderButtonClick = () => {
        console.log("Scene Header button clicked");
        if (editor) {
            if (listening) {
                stopRecording();
                setTimeout(() => {
                    insertNewLine();
                    editor.chain().focus().setNode("sceneHeader").run();
                    setTimeout(() => {
                        insertNewLine();
                        startRecording();
                    }, 500);
                }, 500);
            }
            else {
                insertNewLine();
                editor.chain().focus().setNode("sceneHeader").run();
                setTimeout(() => {
                    insertNewLine();
                    startRecording();
                }, 500);
            }
        }
    };
    const handleDialogueButtonClick = () => {
        console.log("Dialogue button clicked");
        if (editor) {
            if (listening) {
                stopRecording();
                setTimeout(() => {
                    insertNewLine();
                    editor.chain().focus().setNode("dialogue").run();
                    setTimeout(() => {
                        insertNewLine();
                        startRecording();
                    }, 500);
                }, 500);
            }
            else {
                insertNewLine();
                editor.chain().focus().setNode("dialogue").run();
                setTimeout(() => {
                    insertNewLine();
                    startRecording();
                }, 500);
            }
        }
    };
    // Update editor content when initialContent changes
    useEffect(() => {
        if (editor && initialContent) {
            editor.commands.setContent(initialContent);
        }
    }, [initialContent, editor]);
    // Add event listener for Shift key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Shift") {
                handleActionButtonClick();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [editor, listening]);
    // Responsible for updating content
    const updateContent = async () => {
        if (editor) {
            const newContent = editor.getJSON();
            try {
                const response = await fetch(`${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newContent: newContent }),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("Script content updated successfully:", data);
                }
                else {
                    console.error("Failed to update script content:", data.message);
                }
            }
            catch (error) {
                console.error("Error updating script content:", error);
            }
        }
    };
    const handleMenuClick = (callback) => {
        callback();
        setFileMenuVisible(false);
        setEditMenuVisible(false);
        setHamburgerMenuVisible(false);
    };
    return (_jsxs("div", { className: "wrapper", children: [_jsxs("div", { className: "mainContainer", children: [_jsx("div", { children: _jsx(SidePanelComponent, { scriptName: scriptName }) }), _jsx("div", { children: _jsx(ChatPanelComponent, {}) }), _jsxs("div", { className: "mainNavbar", children: [_jsx("div", { className: "controlButtonsWrapper", children: _jsxs("div", { className: "controlButtonsContainer", children: [_jsxs("div", { className: "fileMenuContainer", ref: fileMenuRef, children: [_jsx("button", { className: "fileButton", onClick: toggleFileMenu, children: _jsx("p", { className: "fileButton", children: "File" }) }), fileMenuVisible && (_jsx("div", { className: "menu fileMenu", children: _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("button", { onClick: () => handleMenuClick(updateContent), children: "Save" }), _jsx("span", { className: "hotkey hide-on-mobile", children: "\u2318S" })] }), _jsxs("li", { children: [_jsx("a", { href: "/scriptsLibrary", className: "scriptLibraryLink no-visited-style", onClick: () => handleMenuClick(() => { }), children: "Scripts Library" }), _jsx("span", { className: "hotkey hide-on-mobile", children: "\u2318L" })] })] }) }))] }), _jsxs("div", { className: "editMenuContainer", ref: editMenuRef, children: [_jsx("button", { className: "editButton", onClick: toggleEditMenu, children: _jsx("p", { className: "editButton", children: "Edit" }) }), editMenuVisible && (_jsx("div", { className: "menu editMenu", children: _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("button", { onClick: () => handleMenuClick(() => editor.chain().focus().undo().run()), children: "Undo" }), _jsx("span", { className: "hotkey hide-on-mobile", children: "\u2318Z" })] }), _jsxs("li", { children: [_jsx("button", { onClick: () => handleMenuClick(() => editor.chain().focus().redo().run()), children: "Redo" }), _jsx("span", { className: "hotkey hide-on-mobile", children: "\u2318\u21E7Z" })] })] }) }))] }), _jsx("div", { children: _jsx("button", { onClick: toggleMenu, children: _jsx("p", { className: "stylingButton", children: "Styles" }) }) }), _jsxs("div", { className: "undoRedoButtonContainer", children: [_jsx("button", { onClick: () => editor.chain().focus().undo().run(), className: "undoRedoButton", children: _jsx(FaUndo, {}) }), _jsx("button", { onClick: () => editor.chain().focus().redo().run(), className: "undoRedoButton", children: _jsx(FaRedo, {}) })] })] }) }), _jsx(SpeechToText, { recordingState: recordingState, onSpeechText: handleSpeechText }), _jsxs("div", { className: "menuBarButtonContainer", children: [_jsx(NodeButton, { editor: editor, command: "setAction", label: "Action", className: "nodeButton1", onClick: handleActionButtonClick }), _jsx(NodeButton, { editor: editor, command: "setSceneHeader", label: "Scene", className: "nodeButton1", onClick: handleSceneHeaderButtonClick }), _jsx(NodeButton, { editor: editor, command: "setCharacter", label: "Character", className: "nodeButton1", onClick: handleCharacterButtonClick }), _jsx(NodeButton, { editor: editor, command: "setDialogue", label: "Dialogue", className: "nodeButton1", onClick: handleDialogueButtonClick })] }), _jsx("button", { className: "hamburgerButton", onClick: toggleHamburgerMenu, children: _jsx(FaBars, {}) })] }), hamburgerMenuVisible && (_jsx("div", { ref: hamburgerMenuRef, children: _jsx(HamburgerMenu, { toggleFileMenu: toggleFileMenu, toggleEditMenu: toggleEditMenu, toggleMenu: toggleMenu }) })), _jsx("div", { children: menuVisible && _jsx(MenuBar, { editor: editor }) }), _jsx(EditorContent, { editor: editor })] }), _jsx(CharacterDeckView, { characterArray: characterArray, onCharacterButtonClick: handleCharacterButtonClick })] }));
};
export default Tiptap;
