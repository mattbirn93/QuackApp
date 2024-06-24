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
import "./tiptap.css";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaBars,
} from "react-icons/fa";

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("TipTap", ydoc);

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is_active" : ""}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is_active" : ""}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is_active" : ""}
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is_active" : ""}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}
      >
        <FaHeading />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}
      >
        <FaHeading className="heading3" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is_active" : ""}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is_active" : ""}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is_active" : ""}
      >
        <FaQuoteLeft />
      </button>
    </div>
  );
};

const HamburgerMenu = ({ toggleFileMenu, toggleEditMenu, toggleMenu }) => (
  <div className="hamburgerMenu">
    <button onClick={toggleFileMenu}>File</button>
    <button onClick={toggleEditMenu}>Edit</button>
    <button onClick={toggleMenu}>Styles</button>
  </div>
);

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

export const Tiptap = ({
  initialContent,
  setDescription,
  scriptId,
  characterArray,
}) => {
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
      if (editMenuVisible) setEditMenuVisible(false);
      return !prev;
    });
  };

  const toggleEditMenu = () => {
    setEditMenuVisible((prev) => {
      if (fileMenuVisible) setFileMenuVisible(false);
      return !prev;
    });
  };

  const toggleHamburgerMenu = () => {
    setHamburgerMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fileMenuRef.current &&
        !fileMenuRef.current.contains(event.target) &&
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        setFileMenuVisible(false);
      }
      if (
        editMenuRef.current &&
        !editMenuRef.current.contains(event.target) &&
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        setEditMenuVisible(false);
      }
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
        const response = await fetch(
          `${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newContent: newContent }),
          },
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Script content updated successfully:", data);
        } else {
          console.error("Failed to update script content:", data.message);
        }
      } catch (error) {
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

  return (
    <div className="wrapper">
      <div className="mainContainer">
        <div className="mainNavbar">
          <div className="controlButtonsWrapper">
            <div className="controlButtonsContainer">
              <div className="fileMenuContainer" ref={fileMenuRef}>
                <button className="fileButton" onClick={toggleFileMenu}>
                  <p className="fileButton">File</p>
                </button>
                {fileMenuVisible && (
                  <div className="menu fileMenu">
                    <ul>
                      <li>
                        <button onClick={() => handleMenuClick(updateContent)}>
                          Save
                        </button>
                        <span className="hotkey">⌘S</span>
                      </li>
                      <li>
                        <a
                          href="/scriptsLibrary"
                          className="scriptLibraryLink no-visited-style"
                          onClick={() => handleMenuClick(() => {})}
                        >
                          Scripts Library
                        </a>
                        <span className="hotkey">⌘L</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="editMenuContainer" ref={editMenuRef}>
                <button className="editButton" onClick={toggleEditMenu}>
                  <p className="editButton">Edit</p>
                </button>
                {editMenuVisible && (
                  <div className="menu editMenu">
                    <ul>
                      <li>
                        <button
                          onClick={() =>
                            handleMenuClick(() =>
                              editor.chain().focus().undo().run(),
                            )
                          }
                        >
                          Undo
                        </button>
                        <span className="hotkey">⌘Z</span>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleMenuClick(() =>
                              editor.chain().focus().redo().run(),
                            )
                          }
                        >
                          Redo
                        </button>
                        <span className="hotkey">⌘⇧Z</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <button onClick={toggleMenu}>
                  <p className="stylingButton">Styles</p>
                </button>
              </div>
              <div className="undoRedoButtonContainer">
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  className="undoRedoButton"
                >
                  <FaUndo />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  className="undoRedoButton"
                >
                  <FaRedo />
                </button>
              </div>
            </div>
          </div>

          <SpeechToText
            recordingState={recordingState}
            onSpeechText={handleSpeechText}
          />
          <div className="menuBarButtonContainer">
            <NodeButton
              editor={editor}
              command="setAction"
              label="Action"
              className="nodeButton1"
              onClick={handleActionButtonClick}
            />
            <NodeButton
              editor={editor}
              command="setSceneHeader"
              label="Scene"
              className="nodeButton1"
              onClick={handleSceneHeaderButtonClick}
            />
            <NodeButton
              editor={editor}
              command="setCharacter"
              label="Character"
              className="nodeButton1"
              onClick={handleCharacterButtonClick}
            />
            <NodeButton
              editor={editor}
              command="setDialogue"
              label="Dialogue"
              className="nodeButton1"
              onClick={handleDialogueButtonClick}
            />
          </div>
          <button className="hamburgerButton" onClick={toggleHamburgerMenu}>
            <FaBars />
          </button>
        </div>
        {hamburgerMenuVisible && (
          <div ref={hamburgerMenuRef}>
            <HamburgerMenu
              toggleFileMenu={toggleFileMenu}
              toggleEditMenu={toggleEditMenu}
              toggleMenu={toggleMenu}
            />
          </div>
        )}
        <div>{menuVisible && <MenuBar editor={editor} />}</div>
        <EditorContent editor={editor} />
      </div>
      <CharacterDeckView
        characterArray={characterArray}
        onCharacterButtonClick={handleCharacterButtonClick}
      />
    </div>
  );
};

export default Tiptap;

////////////////////////////////////////////////

// import React, { useState, useEffect, useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
// import NodeButton from "../nodes/NodeButton";
// import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
// import MicOn from "../../assets/images/icons8-microphone-On.png";
// import MicOff from "../../assets/images/icons8-microphone-Off.png";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import CharacterDeckView from "../CharacterDeckComponent/CharacterDeckView";
// import "./tiptap.css";
// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
//   FaBars,
// } from "react-icons/fa";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menuBar">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is_active" : ""}
//       >
//         <FaBold />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is_active" : ""}
//       >
//         <FaItalic />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={editor.isActive("underline") ? "is_active" : ""}
//       >
//         <FaUnderline />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is_active" : ""}
//       >
//         <FaStrikethrough />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}
//       >
//         <FaHeading />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}
//       >
//         <FaHeading className="heading3" />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is_active" : ""}
//       >
//         <FaListUl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is_active" : ""}
//       >
//         <FaListOl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive("blockquote") ? "is_active" : ""}
//       >
//         <FaQuoteLeft />
//       </button>
//     </div>
//   );
// };

// const HamburgerMenu = ({ toggleFileMenu, toggleEditMenu, toggleMenu }) => (
//   <div className="hamburgerMenu">
//     <button onClick={toggleFileMenu}>File</button>
//     <button onClick={toggleEditMenu}>Edit</button>
//     <button onClick={toggleMenu}>Styles</button>
//   </div>
// );

// const extensions = [
//   StarterKit,
//   Collaboration.configure({ document: ydoc }),
//   CollaborationCursor.configure({
//     provider: provider,
//     user: { name: "Mike Giffin", color: "red" },
//   }),
//   Action,
//   SceneHeader,
//   Character,
//   Dialogue,
// ];

// export const Tiptap = ({
//   initialContent,
//   setDescription,
//   scriptId,
//   characterArray,
// }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [fileMenuVisible, setFileMenuVisible] = useState(false);
//   const [editMenuVisible, setEditMenuVisible] = useState(false);
//   const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

//   const fileMenuRef = useRef(null);
//   const editMenuRef = useRef(null);
//   const hamburgerMenuRef = useRef(null);

//   const API_BASE_URL = getApiBaseUrl();
//   console.log(initialContent, "initial content");

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const stopRecording = () => {
//     setRecordingState("stop");
//     setListening(false);
//   };

//   const startRecording = () => {
//     setRecordingState("start");
//     setListening(true);
//   };

//   const toggleMenu = () => {
//     setMenuVisible((prev) => !prev);
//   };

//   const toggleFileMenu = () => {
//     setFileMenuVisible((prev) => {
//       if (editMenuVisible) setEditMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleEditMenu = () => {
//     setEditMenuVisible((prev) => {
//       if (fileMenuVisible) setFileMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleHamburgerMenu = () => {
//     setHamburgerMenuVisible((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         fileMenuRef.current &&
//         !fileMenuRef.current.contains(event.target) &&
//         hamburgerMenuRef.current &&
//         !hamburgerMenuRef.current.contains(event.target)
//       ) {
//         setFileMenuVisible(false);
//       }
//       if (
//         editMenuRef.current &&
//         !editMenuRef.current.contains(event.target) &&
//         hamburgerMenuRef.current &&
//         !hamburgerMenuRef.current.contains(event.target)
//       ) {
//         setEditMenuVisible(false);
//       }
//       if (
//         hamburgerMenuRef.current &&
//         !hamburgerMenuRef.current.contains(event.target)
//       ) {
//         setHamburgerMenuVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const editor = useEditor({
//     extensions,
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       console.log("HTML:", html);
//       console.log("JSON:", JSON.stringify(json, null, 2));
//       console.log("Text:", text);
//       setDescription(html);
//     },
//   });

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   const insertNewLine = () => {
//     if (editor) {
//       const { state, dispatch } = editor.view;
//       const { tr } = state;
//       tr.split(state.selection.head);
//       dispatch(tr);
//     }
//   };

//   const handleCharacterButtonClick = (character) => {
//     if (editor) {
//       if (listening) {
//         stopRecording(); // Stop current recording if listening
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after stopping recording
//           insertNewLine(); // Extra new line for space between dialogue pairs
//           editor
//             .chain()
//             .focus()
//             .setNode("character")
//             .insertContent(character)
//             .run();
//           setTimeout(() => {
//             insertNewLine(); // Insert a new line after character node
//             editor.chain().focus().setNode("dialogue").run();
//             setTimeout(() => {
//               startRecording(); // Start recording when dialogue node is created
//             }, 500); // Small delay before starting the new recording
//           }, 0);
//         }, 500);
//       } else {
//         insertNewLine(); // Insert a new line before inserting character node
//         editor
//           .chain()
//           .focus()
//           .setNode("character")
//           .insertContent(character)
//           .run();
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after character node
//           editor.chain().focus().setNode("dialogue").run();
//           startRecording(); // Start recording when dialogue node is created if not already listening
//         }, 500); // Small delay before starting the new recording
//       }
//     }
//   };

//   const handleActionButtonClick = () => {
//     console.log("Action button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("action").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("action").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleSceneHeaderButtonClick = () => {
//     console.log("Scene Header button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("sceneHeader").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("sceneHeader").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleDialogueButtonClick = () => {
//     console.log("Dialogue button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("dialogue").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("dialogue").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   // Update editor content when initialContent changes
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);

//   // Add event listener for Shift key
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Shift") {
//         handleActionButtonClick();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [editor, listening]);

//   // Responsible for updating content
//   const updateContent = async () => {
//     if (editor) {
//       const newContent = editor.getJSON();
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ newContent: newContent }),
//           },
//         );
//         const data = await response.json();
//         if (response.ok) {
//           console.log("Script content updated successfully:", data);
//         } else {
//           console.error("Failed to update script content:", data.message);
//         }
//       } catch (error) {
//         console.error("Error updating script content:", error);
//       }
//     }
//   };

//   const handleMenuClick = (callback) => {
//     callback();
//     setFileMenuVisible(false);
//     setEditMenuVisible(false);
//     setHamburgerMenuVisible(false);
//   };

//   return (
//     <div className="wrapper">
//       <div className="mainContainer">
//         <div className="mainNavbar">
//           <div className="controlButtonsWrapper">
//             <div className="controlButtonsContainer">
//               <div className="fileMenuContainer" ref={fileMenuRef}>
//                 <button className="fileButton" onClick={toggleFileMenu}>
//                   <p className="fileButton">File</p>
//                 </button>
//                 {fileMenuVisible && (
//                   <div className="menu fileMenu">
//                     <ul>
//                       <li>
//                         <button onClick={() => handleMenuClick(updateContent)}>
//                           Save
//                         </button>
//                         <span className="hotkey">⌘S</span>
//                       </li>
//                       <li>
//                         <a
//                           href="/scriptsLibrary"
//                           className="scriptLibraryLink no-visited-style"
//                           onClick={() => handleMenuClick(() => {})}
//                         >
//                           Scripts Library
//                         </a>
//                         <span className="hotkey">⌘L</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="editMenuContainer" ref={editMenuRef}>
//                 <button className="editButton" onClick={toggleEditMenu}>
//                   <p className="editButton">Edit</p>
//                 </button>
//                 {editMenuVisible && (
//                   <div className="menu editMenu">
//                     <ul>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().undo().run(),
//                             )
//                           }
//                         >
//                           Undo
//                         </button>
//                         <span className="hotkey">⌘Z</span>
//                       </li>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().redo().run(),
//                             )
//                           }
//                         >
//                           Redo
//                         </button>
//                         <span className="hotkey">⌘⇧Z</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <button onClick={toggleMenu}>
//                   <p className="stylingButton">Styles</p>
//                 </button>
//               </div>
//               <div className="undoRedoButtonContainer">
//                 <button
//                   onClick={() => editor.chain().focus().undo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaUndo />
//                 </button>
//                 <button
//                   onClick={() => editor.chain().focus().redo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaRedo />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <SpeechToText
//             recordingState={recordingState}
//             onSpeechText={handleSpeechText}
//           />
//           <div className="menuBarButtonContainer">
//             <NodeButton
//               editor={editor}
//               command="setAction"
//               label="Action"
//               className="nodeButton1"
//               onClick={handleActionButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setSceneHeader"
//               label="Scene"
//               className="nodeButton1"
//               onClick={handleSceneHeaderButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setCharacter"
//               label="Character"
//               className="nodeButton1"
//               onClick={handleCharacterButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setDialogue"
//               label="Dialogue"
//               className="nodeButton1"
//               onClick={handleDialogueButtonClick}
//             />
//           </div>
//           <button className="hamburgerButton" onClick={toggleHamburgerMenu}>
//             <FaBars />
//           </button>
//         </div>
//         {hamburgerMenuVisible && (
//           <div ref={hamburgerMenuRef}>
//             <HamburgerMenu
//               toggleFileMenu={toggleFileMenu}
//               toggleEditMenu={toggleEditMenu}
//               toggleMenu={toggleMenu}
//             />
//           </div>
//         )}
//         <div>{menuVisible && <MenuBar editor={editor} />}</div>
//         <EditorContent editor={editor} />
//       </div>
//       <CharacterDeckView
//         characterArray={characterArray}
//         onCharacterButtonClick={handleCharacterButtonClick}
//       />
//     </div>
//   );
// };

// export default Tiptap;

////////////

// import React, { useState, useEffect, useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
// import NodeButton from "../nodes/NodeButton";
// import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
// import MicOn from "../../assets/images/icons8-microphone-On.png";
// import MicOff from "../../assets/images/icons8-microphone-Off.png";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import CharacterDeckView from "../CharacterDeckComponent/CharacterDeckView";
// import "./tiptap.css";
// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
//   FaBars,
// } from "react-icons/fa";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menuBar">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is_active" : ""}
//       >
//         <FaBold />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is_active" : ""}
//       >
//         <FaItalic />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={editor.isActive("underline") ? "is_active" : ""}
//       >
//         <FaUnderline />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is_active" : ""}
//       >
//         <FaStrikethrough />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}
//       >
//         <FaHeading />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}
//       >
//         <FaHeading className="heading3" />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is_active" : ""}
//       >
//         <FaListUl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is_active" : ""}
//       >
//         <FaListOl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive("blockquote") ? "is_active" : ""}
//       >
//         <FaQuoteLeft />
//       </button>
//     </div>
//   );
// };

// const HamburgerMenu = ({ toggleFileMenu, toggleEditMenu, toggleMenu }) => (
//   <div className="hamburgerMenu">
//     <button onClick={toggleFileMenu}>File</button>
//     <button onClick={toggleEditMenu}>Edit</button>
//     <button onClick={toggleMenu}>Styles</button>
//   </div>
// );

// const extensions = [
//   StarterKit,
//   Collaboration.configure({ document: ydoc }),
//   CollaborationCursor.configure({
//     provider: provider,
//     user: { name: "Mike Giffin", color: "red" },
//   }),
//   Action,
//   SceneHeader,
//   Character,
//   Dialogue,
// ];

// export const Tiptap = ({
//   initialContent,
//   setDescription,
//   scriptId,
//   characterArray,
// }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [fileMenuVisible, setFileMenuVisible] = useState(false);
//   const [editMenuVisible, setEditMenuVisible] = useState(false);
//   const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

//   const fileMenuRef = useRef(null);
//   const editMenuRef = useRef(null);

//   const API_BASE_URL = getApiBaseUrl();
//   console.log(initialContent, "initial content");

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const stopRecording = () => {
//     setRecordingState("stop");
//     setListening(false);
//   };

//   const startRecording = () => {
//     setRecordingState("start");
//     setListening(true);
//   };

//   const toggleMenu = () => {
//     setMenuVisible((prev) => !prev);
//   };

//   const toggleFileMenu = () => {
//     setFileMenuVisible((prev) => {
//       if (editMenuVisible) setEditMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleEditMenu = () => {
//     setEditMenuVisible((prev) => {
//       if (fileMenuVisible) setFileMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleHamburgerMenu = () => {
//     setHamburgerMenuVisible(!hamburgerMenuVisible);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
//         setFileMenuVisible(false);
//       }
//       if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
//         setEditMenuVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const editor = useEditor({
//     extensions,
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       console.log("HTML:", html);
//       console.log("JSON:", JSON.stringify(json, null, 2));
//       console.log("Text:", text);
//       setDescription(html);
//     },
//   });

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   const insertNewLine = () => {
//     if (editor) {
//       const { state, dispatch } = editor.view;
//       const { tr } = state;
//       tr.split(state.selection.head);
//       dispatch(tr);
//     }
//   };

//   const handleCharacterButtonClick = (character) => {
//     if (editor) {
//       if (listening) {
//         stopRecording(); // Stop current recording if listening
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after stopping recording
//           insertNewLine(); // Extra new line for space between dialogue pairs
//           editor
//             .chain()
//             .focus()
//             .setNode("character")
//             .insertContent(character)
//             .run();
//           setTimeout(() => {
//             insertNewLine(); // Insert a new line after character node
//             editor.chain().focus().setNode("dialogue").run();
//             setTimeout(() => {
//               startRecording(); // Start recording when dialogue node is created
//             }, 500); // Small delay before starting the new recording
//           }, 0);
//         }, 500);
//       } else {
//         insertNewLine(); // Insert a new line before inserting character node
//         editor
//           .chain()
//           .focus()
//           .setNode("character")
//           .insertContent(character)
//           .run();
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after character node
//           editor.chain().focus().setNode("dialogue").run();
//           startRecording(); // Start recording when dialogue node is created if not already listening
//         }, 500); // Small delay before starting the new recording
//       }
//     }
//   };

//   const handleActionButtonClick = () => {
//     console.log("Action button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("action").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("action").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleSceneHeaderButtonClick = () => {
//     console.log("Scene Header button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("sceneHeader").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("sceneHeader").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleDialogueButtonClick = () => {
//     console.log("Dialogue button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("dialogue").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("dialogue").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   // Update editor content when initialContent changes
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);

//   // Add event listener for Shift key
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Shift") {
//         handleActionButtonClick();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [editor, listening]);

//   // Responsible for updating content
//   const updateContent = async () => {
//     if (editor) {
//       const newContent = editor.getJSON();
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ newContent: newContent }),
//           },
//         );
//         const data = await response.json();
//         if (response.ok) {
//           console.log("Script content updated successfully:", data);
//         } else {
//           console.error("Failed to update script content:", data.message);
//         }
//       } catch (error) {
//         console.error("Error updating script content:", error);
//       }
//     }
//   };

//   const handleMenuClick = (callback) => {
//     callback();
//     setFileMenuVisible(false);
//     setEditMenuVisible(false);
//     setHamburgerMenuVisible(false);
//   };

//   return (
//     <div className="wrapper">
//       <div className="mainContainer">
//         <div className="mainNavbar">
//           <div className="controlButtonsWrapper">
//             <div className="controlButtonsContainer">
//               <div className="fileMenuContainer" ref={fileMenuRef}>
//                 <button className="fileButton" onClick={toggleFileMenu}>
//                   <p className="fileButton">File</p>
//                 </button>
//                 {fileMenuVisible && (
//                   <div className="menu fileMenu">
//                     <ul>
//                       <li>
//                         <button onClick={() => handleMenuClick(updateContent)}>
//                           Save
//                         </button>
//                         <span className="hotkey">⌘S</span>
//                       </li>
//                       <li>
//                         <a
//                           href="/scriptsLibrary"
//                           className="scriptLibraryLink no-visited-style"
//                           onClick={() => handleMenuClick(() => {})}
//                         >
//                           Scripts Library
//                         </a>
//                         <span className="hotkey">⌘L</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="editMenuContainer" ref={editMenuRef}>
//                 <button className="editButton" onClick={toggleEditMenu}>
//                   <p className="editButton">Edit</p>
//                 </button>
//                 {editMenuVisible && (
//                   <div className="menu editMenu">
//                     <ul>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().undo().run(),
//                             )
//                           }
//                         >
//                           Undo
//                         </button>
//                         <span className="hotkey">⌘Z</span>
//                       </li>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().redo().run(),
//                             )
//                           }
//                         >
//                           Redo
//                         </button>
//                         <span className="hotkey">⌘⇧Z</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <button onClick={toggleMenu}>
//                   <p className="stylingButton">Styles</p>
//                 </button>
//               </div>
//               <div className="undoRedoButtonContainer">
//                 <button
//                   onClick={() => editor.chain().focus().undo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaUndo />
//                 </button>
//                 <button
//                   onClick={() => editor.chain().focus().redo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaRedo />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <SpeechToText
//             recordingState={recordingState}
//             onSpeechText={handleSpeechText}
//           />
//           <div className="menuBarButtonContainer">
//             <NodeButton
//               editor={editor}
//               command="setAction"
//               label="Action"
//               className="nodeButton1"
//               onClick={handleActionButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setSceneHeader"
//               label="Scene"
//               className="nodeButton1"
//               onClick={handleSceneHeaderButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setCharacter"
//               label="Character"
//               className="nodeButton1"
//               onClick={handleCharacterButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setDialogue"
//               label="Dialogue"
//               className="nodeButton1"
//               onClick={handleDialogueButtonClick}
//             />
//           </div>
//           <button className="hamburgerButton" onClick={toggleHamburgerMenu}>
//             <FaBars />
//           </button>
//         </div>
//         {hamburgerMenuVisible && (
//           <HamburgerMenu
//             toggleFileMenu={toggleFileMenu}
//             toggleEditMenu={toggleEditMenu}
//             toggleMenu={toggleMenu}
//           />
//         )}
//         <div>{menuVisible && <MenuBar editor={editor} />}</div>
//         <EditorContent editor={editor} />
//       </div>
//       <CharacterDeckView
//         characterArray={characterArray}
//         onCharacterButtonClick={handleCharacterButtonClick}
//       />
//     </div>
//   );
// };

// export default Tiptap;

/////////////////////////////////////

// import React, { useState, useEffect, useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
// import NodeButton from "../nodes/NodeButton";
// import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
// import MicOn from "../../assets/images/icons8-microphone-On.png";
// import MicOff from "../../assets/images/icons8-microphone-Off.png";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import CharacterDeckView from "../CharacterDeckComponent/CharacterDeckView";
// import "./tiptap.css";
// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
//   FaBars,
// } from "react-icons/fa";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menuBar">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is_active" : ""}
//       >
//         <FaBold />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is_active" : ""}
//       >
//         <FaItalic />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={editor.isActive("underline") ? "is_active" : ""}
//       >
//         <FaUnderline />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is_active" : ""}
//       >
//         <FaStrikethrough />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}
//       >
//         <FaHeading />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}
//       >
//         <FaHeading className="heading3" />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is_active" : ""}
//       >
//         <FaListUl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is_active" : ""}
//       >
//         <FaListOl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive("blockquote") ? "is_active" : ""}
//       >
//         <FaQuoteLeft />
//       </button>
//     </div>
//   );
// };

// const HamburgerMenu = ({ toggleFileMenu, toggleEditMenu, toggleMenu }) => (
//   <div className="hamburgerMenu">
//     <button onClick={toggleFileMenu}>File</button>
//     <button onClick={toggleEditMenu}>Edit</button>
//     <button onClick={toggleMenu}>Styles</button>
//   </div>
// );

// const extensions = [
//   StarterKit,
//   Collaboration.configure({ document: ydoc }),
//   CollaborationCursor.configure({
//     provider: provider,
//     user: { name: "Mike Giffin", color: "red" },
//   }),
//   Action,
//   SceneHeader,
//   Character,
//   Dialogue,
// ];

// export const Tiptap = ({
//   initialContent,
//   setDescription,
//   scriptId,
//   characterArray,
// }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [fileMenuVisible, setFileMenuVisible] = useState(false);
//   const [editMenuVisible, setEditMenuVisible] = useState(false);
//   const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

//   const fileMenuRef = useRef(null);
//   const editMenuRef = useRef(null);

//   const API_BASE_URL = getApiBaseUrl();
//   console.log(initialContent, "initial content");

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const stopRecording = () => {
//     setRecordingState("stop");
//     setListening(false);
//   };

//   const startRecording = () => {
//     setRecordingState("start");
//     setListening(true);
//   };

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const toggleFileMenu = () => {
//     setFileMenuVisible((prev) => {
//       if (editMenuVisible) setEditMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleEditMenu = () => {
//     setEditMenuVisible((prev) => {
//       if (fileMenuVisible) setFileMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleHamburgerMenu = () => {
//     setHamburgerMenuVisible(!hamburgerMenuVisible);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
//         setFileMenuVisible(false);
//       }
//       if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
//         setEditMenuVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const editor = useEditor({
//     extensions,
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       console.log("HTML:", html);
//       console.log("JSON:", JSON.stringify(json, null, 2));
//       console.log("Text:", text);
//       setDescription(html);
//     },
//   });

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   const insertNewLine = () => {
//     if (editor) {
//       const { state, dispatch } = editor.view;
//       const { tr } = state;
//       tr.split(state.selection.head);
//       dispatch(tr);
//     }
//   };

//   const handleCharacterButtonClick = (character) => {
//     if (editor) {
//       if (listening) {
//         stopRecording(); // Stop current recording if listening
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after stopping recording
//           insertNewLine(); // Extra new line for space between dialogue pairs
//           editor
//             .chain()
//             .focus()
//             .setNode("character")
//             .insertContent(character)
//             .run();
//           setTimeout(() => {
//             insertNewLine(); // Insert a new line after character node
//             editor.chain().focus().setNode("dialogue").run();
//             setTimeout(() => {
//               startRecording(); // Start recording when dialogue node is created
//             }, 500); // Small delay before starting the new recording
//           }, 0);
//         }, 500);
//       } else {
//         insertNewLine(); // Insert a new line before inserting character node
//         editor
//           .chain()
//           .focus()
//           .setNode("character")
//           .insertContent(character)
//           .run();
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after character node
//           editor.chain().focus().setNode("dialogue").run();
//           startRecording(); // Start recording when dialogue node is created if not already listening
//         }, 500); // Small delay before starting the new recording
//       }
//     }
//   };

//   const handleActionButtonClick = () => {
//     console.log("Action button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("action").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("action").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleSceneHeaderButtonClick = () => {
//     console.log("Scene Header button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("sceneHeader").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("sceneHeader").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleDialogueButtonClick = () => {
//     console.log("Dialogue button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("dialogue").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("dialogue").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   // Update editor content when initialContent changes
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);

//   // Add event listener for Shift key
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Shift") {
//         handleActionButtonClick();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [editor, listening]);

//   // Responsible for updating content
//   const updateContent = async () => {
//     if (editor) {
//       const newContent = editor.getJSON();
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ newContent: newContent }),
//           },
//         );
//         const data = await response.json();
//         if (response.ok) {
//           console.log("Script content updated successfully:", data);
//         } else {
//           console.error("Failed to update script content:", data.message);
//         }
//       } catch (error) {
//         console.error("Error updating script content:", error);
//       }
//     }
//   };

//   const handleMenuClick = (callback) => {
//     callback();
//     setFileMenuVisible(false);
//     setEditMenuVisible(false);
//     setHamburgerMenuVisible(false);
//   };

//   return (
//     <div className="wrapper">
//       <div className="mainContainer">
//         <div className="mainNavbar">
//           <div className="controlButtonsWrapper">
//             <div className="controlButtonsContainer">
//               <div className="fileMenuContainer" ref={fileMenuRef}>
//                 <button className="fileButton" onClick={toggleFileMenu}>
//                   <p className="fileButton">File</p>
//                 </button>
//                 {fileMenuVisible && (
//                   <div className="menu fileMenu">
//                     <ul>
//                       <li>
//                         <button onClick={() => handleMenuClick(updateContent)}>
//                           Save
//                         </button>
//                         <span className="hotkey">⌘S</span>
//                       </li>
//                       <li>
//                         <a
//                           href="/scriptsLibrary"
//                           className="scriptLibraryLink no-visited-style"
//                           onClick={() => handleMenuClick(() => {})}
//                         >
//                           Scripts Library
//                         </a>
//                         <span className="hotkey">⌘L</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="editMenuContainer" ref={editMenuRef}>
//                 <button className="editButton" onClick={toggleEditMenu}>
//                   <p className="editButton">Edit</p>
//                 </button>
//                 {editMenuVisible && (
//                   <div className="menu editMenu">
//                     <ul>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().undo().run(),
//                             )
//                           }
//                         >
//                           Undo
//                         </button>
//                         <span className="hotkey">⌘Z</span>
//                       </li>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().redo().run(),
//                             )
//                           }
//                         >
//                           Redo
//                         </button>
//                         <span className="hotkey">⌘⇧Z</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <button onClick={toggleMenu}>
//                   <p className="stylingButton">Styles</p>
//                 </button>
//               </div>
//               <div className="undoRedoButtonContainer">
//                 <button
//                   onClick={() => editor.chain().focus().undo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaUndo />
//                 </button>
//                 <button
//                   onClick={() => editor.chain().focus().redo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaRedo />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <SpeechToText
//             recordingState={recordingState}
//             onSpeechText={handleSpeechText}
//           />
//           {/* <button onClick={toggleRecording}>
//             <img
//               src={recordingState === "start" ? MicOff : MicOn}
//               alt="Mic Icon"
//               className="icon icon-inverted"
//             />
//           </button> */}
//           <div className="menuBarButtonContainer">
//             <NodeButton
//               editor={editor}
//               command="setAction"
//               label="Action"
//               className="nodeButton1"
//               onClick={handleActionButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setSceneHeader"
//               label="Scene"
//               className="nodeButton1"
//               onClick={handleSceneHeaderButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setCharacter"
//               label="Character"
//               className="nodeButton1"
//               onClick={handleCharacterButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setDialogue"
//               label="Dialogue"
//               className="nodeButton1"
//               onClick={handleDialogueButtonClick}
//             />
//           </div>
//           <button className="hamburgerButton" onClick={toggleHamburgerMenu}>
//             <FaBars />
//           </button>
//         </div>
//         {hamburgerMenuVisible && (
//           <HamburgerMenu
//             toggleFileMenu={toggleFileMenu}
//             toggleEditMenu={toggleEditMenu}
//             toggleMenu={toggleMenu}
//           />
//         )}
//         <div>{menuVisible && <MenuBar editor={editor} />}</div>
//         <EditorContent editor={editor} />
//       </div>
//       <CharacterDeckView
//         characterArray={characterArray}
//         onCharacterButtonClick={handleCharacterButtonClick}
//       />
//     </div>
//   );
// };

// export default Tiptap;

/////////////////////////////////

// import React, { useState, useEffect, useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
// import NodeButton from "../nodes/NodeButton";
// import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
// import MicOn from "../../assets/images/icons8-microphone-On.png";
// import MicOff from "../../assets/images/icons8-microphone-Off.png";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import CharacterDeckView from "../CharacterDeckComponent/CharacterDeckView";
// import "./tiptap.css";
// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
//   FaBars,
// } from "react-icons/fa";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menuBar">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is_active" : ""}
//       >
//         <FaBold />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is_active" : ""}
//       >
//         <FaItalic />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={editor.isActive("underline") ? "is_active" : ""}
//       >
//         <FaUnderline />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is_active" : ""}
//       >
//         <FaStrikethrough />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}
//       >
//         <FaHeading />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}
//       >
//         <FaHeading className="heading3" />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is_active" : ""}
//       >
//         <FaListUl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is_active" : ""}
//       >
//         <FaListOl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive("blockquote") ? "is_active" : ""}
//       >
//         <FaQuoteLeft />
//       </button>
//     </div>
//   );
// };

// const HamburgerMenu = ({ toggleFileMenu, toggleEditMenu, toggleMenu }) => (
//   <div className="hamburgerMenu">
//     <button onClick={toggleFileMenu}>File</button>
//     <button onClick={toggleEditMenu}>Edit</button>
//     <button onClick={toggleMenu}>Styles</button>
//   </div>
// );

// const extensions = [
//   StarterKit,
//   Collaboration.configure({ document: ydoc }),
//   CollaborationCursor.configure({
//     provider: provider,
//     user: { name: "Mike Giffin", color: "red" },
//   }),
//   Action,
//   SceneHeader,
//   Character,
//   Dialogue,
// ];

// export const Tiptap = ({
//   initialContent,
//   setDescription,
//   scriptId,
//   characterArray,
// }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [fileMenuVisible, setFileMenuVisible] = useState(false);
//   const [editMenuVisible, setEditMenuVisible] = useState(false);
//   const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

//   const fileMenuRef = useRef(null);
//   const editMenuRef = useRef(null);

//   const API_BASE_URL = getApiBaseUrl();
//   console.log(initialContent, "initial content");

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const stopRecording = () => {
//     setRecordingState("stop");
//     setListening(false);
//   };

//   const startRecording = () => {
//     setRecordingState("start");
//     setListening(true);
//   };

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const toggleFileMenu = () => {
//     setFileMenuVisible((prev) => {
//       if (editMenuVisible) setEditMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleEditMenu = () => {
//     setEditMenuVisible((prev) => {
//       if (fileMenuVisible) setFileMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleHamburgerMenu = () => {
//     setHamburgerMenuVisible(!hamburgerMenuVisible);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
//         setFileMenuVisible(false);
//       }
//       if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
//         setEditMenuVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const editor = useEditor({
//     extensions,
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       console.log("HTML:", html);
//       console.log("JSON:", JSON.stringify(json, null, 2));
//       console.log("Text:", text);
//       setDescription(html);
//     },
//   });

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   const insertNewLine = () => {
//     if (editor) {
//       const { state, dispatch } = editor.view;
//       const { tr } = state;
//       tr.split(state.selection.head);
//       dispatch(tr);
//     }
//   };

//   const handleCharacterButtonClick = (character) => {
//     if (editor) {
//       if (listening) {
//         stopRecording(); // Stop current recording if listening
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after stopping recording
//           insertNewLine(); // Extra new line for space between dialogue pairs
//           editor
//             .chain()
//             .focus()
//             .setNode("character")
//             .insertContent(character)
//             .run();
//           setTimeout(() => {
//             insertNewLine(); // Insert a new line after character node
//             editor.chain().focus().setNode("dialogue").run();
//             setTimeout(() => {
//               startRecording(); // Start recording when dialogue node is created
//             }, 500); // Small delay before starting the new recording
//           }, 0);
//         }, 500);
//       } else {
//         insertNewLine(); // Insert a new line before inserting character node
//         editor
//           .chain()
//           .focus()
//           .setNode("character")
//           .insertContent(character)
//           .run();
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after character node
//           editor.chain().focus().setNode("dialogue").run();
//           startRecording(); // Start recording when dialogue node is created if not already listening
//         }, 500); // Small delay before starting the new recording
//       }
//     }
//   };

//   const handleActionButtonClick = () => {
//     console.log("Action button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("action").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("action").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleSceneHeaderButtonClick = () => {
//     console.log("Scene Header button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("sceneHeader").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("sceneHeader").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleDialogueButtonClick = () => {
//     console.log("Dialogue button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("dialogue").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("dialogue").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   // Update editor content when initialContent changes
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);

//   // Add event listener for Shift key
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Shift") {
//         handleActionButtonClick();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [editor, listening]);

//   // Responsible for updating content
//   const updateContent = async () => {
//     if (editor) {
//       const newContent = editor.getJSON();
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ newContent: newContent }),
//           },
//         );
//         const data = await response.json();
//         if (response.ok) {
//           console.log("Script content updated successfully:", data);
//         } else {
//           console.error("Failed to update script content:", data.message);
//         }
//       } catch (error) {
//         console.error("Error updating script content:", error);
//       }
//     }
//   };

//   const handleMenuClick = (callback) => {
//     callback();
//     setFileMenuVisible(false);
//     setEditMenuVisible(false);
//     setHamburgerMenuVisible(false);
//   };

//   return (
//     <div className="wrapper">
//       <div className="mainContainer">
//         <div className="mainNavbar">
//           <div className="controlButtonsWrapper">
//             <div className="controlButtonsContainer">
//               <div className="fileMenuContainer" ref={fileMenuRef}>
//                 <button className="fileButton" onClick={toggleFileMenu}>
//                   <p className="fileButton">File</p>
//                 </button>
//                 {fileMenuVisible && (
//                   <div className="menu fileMenu">
//                     <ul>
//                       <li>
//                         <button onClick={() => handleMenuClick(updateContent)}>
//                           Save
//                         </button>
//                         <span className="hotkey">⌘S</span>
//                       </li>
//                       <li>
//                         <a
//                           href="/scriptsLibrary"
//                           className="scriptLibraryLink no-visited-style"
//                           onClick={() => handleMenuClick(() => {})}
//                         >
//                           Scripts Library
//                         </a>
//                         <span className="hotkey">⌘L</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="editMenuContainer" ref={editMenuRef}>
//                 <button className="editButton" onClick={toggleEditMenu}>
//                   <p className="editButton">Edit</p>
//                 </button>
//                 {editMenuVisible && (
//                   <div className="menu editMenu">
//                     <ul>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().undo().run(),
//                             )
//                           }
//                         >
//                           Undo
//                         </button>
//                         <span className="hotkey">⌘Z</span>
//                       </li>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().redo().run(),
//                             )
//                           }
//                         >
//                           Redo
//                         </button>
//                         <span className="hotkey">⌘⇧Z</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <button onClick={toggleMenu}>
//                   <p className="stylingButton">Styles</p>
//                 </button>
//               </div>
//               <div className="undoRedoButtonContainer">
//                 <button
//                   onClick={() => editor.chain().focus().undo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaUndo />
//                 </button>
//                 <button
//                   onClick={() => editor.chain().focus().redo().run()}
//                   className="undoRedoButton"
//                 >
//                   <FaRedo />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <SpeechToText
//             recordingState={recordingState}
//             onSpeechText={handleSpeechText}
//           />
//           {/* <button onClick={toggleRecording}>
//             <img
//               src={recordingState === "start" ? MicOff : MicOn}
//               alt="Mic Icon"
//               className="icon icon-inverted"
//             />
//           </button> */}
//           <div className="menuBarButtonContainer">
//             <NodeButton
//               editor={editor}
//               command="setAction"
//               label="Action"
//               className="nodeButton1"
//               onClick={handleActionButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setSceneHeader"
//               label="Scene"
//               className="nodeButton1"
//               onClick={handleSceneHeaderButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setCharacter"
//               label="Character"
//               className="nodeButton1"
//               onClick={handleCharacterButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setDialogue"
//               label="Dialogue"
//               className="nodeButton1"
//               onClick={handleDialogueButtonClick}
//             />
//           </div>
//           <button className="hamburgerButton" onClick={toggleHamburgerMenu}>
//             <FaBars />
//           </button>
//         </div>
//         {hamburgerMenuVisible && (
//           <HamburgerMenu
//             toggleFileMenu={toggleFileMenu}
//             toggleEditMenu={toggleEditMenu}
//             toggleMenu={toggleMenu}
//           />
//         )}
//         <div>{menuVisible && <MenuBar editor={editor} />}</div>
//         <EditorContent editor={editor} />
//       </div>
//       <CharacterDeckView
//         characterArray={characterArray}
//         onCharacterButtonClick={handleCharacterButtonClick}
//       />
//     </div>
//   );
// };

// export default Tiptap;

/////////////////////////

// import React, { useState, useEffect, useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
// import NodeButton from "../nodes/NodeButton";
// import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
// import MicOn from "../../assets/images/icons8-microphone-On.png";
// import MicOff from "../../assets/images/icons8-microphone-Off.png";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import CharacterDeckView from "../CharacterDeckComponent/CharacterDeckView";
// import "./tiptap.css";
// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
//   FaCog,
//   FaBars,
// } from "react-icons/fa";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menuBar">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is_active" : ""}
//       >
//         <FaBold />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is_active" : ""}
//       >
//         <FaItalic />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={editor.isActive("underline") ? "is_active" : ""}
//       >
//         <FaUnderline />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is_active" : ""}
//       >
//         <FaStrikethrough />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}
//       >
//         <FaHeading />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}
//       >
//         <FaHeading className="heading3" />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is_active" : ""}
//       >
//         <FaListUl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is_active" : ""}
//       >
//         <FaListOl />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive("blockquote") ? "is_active" : ""}
//       >
//         <FaQuoteLeft />
//       </button>
//     </div>
//   );
// };

// const extensions = [
//   StarterKit,
//   Collaboration.configure({ document: ydoc }),
//   CollaborationCursor.configure({
//     provider: provider,
//     user: { name: "Mike Giffin", color: "red" },
//   }),
//   Action,
//   SceneHeader,
//   Character,
//   Dialogue,
// ];

// export const Tiptap = ({
//   initialContent,
//   setDescription,
//   scriptId,
//   characterArray,
// }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [fileMenuVisible, setFileMenuVisible] = useState(false);
//   const [editMenuVisible, setEditMenuVisible] = useState(false);

//   const fileMenuRef = useRef(null);
//   const editMenuRef = useRef(null);

//   const API_BASE_URL = getApiBaseUrl();
//   console.log(initialContent, "initial content");

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const stopRecording = () => {
//     setRecordingState("stop");
//     setListening(false);
//   };

//   const startRecording = () => {
//     setRecordingState("start");
//     setListening(true);
//   };

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const toggleFileMenu = () => {
//     setFileMenuVisible((prev) => {
//       if (editMenuVisible) setEditMenuVisible(false);
//       return !prev;
//     });
//   };

//   const toggleEditMenu = () => {
//     setEditMenuVisible((prev) => {
//       if (fileMenuVisible) setFileMenuVisible(false);
//       return !prev;
//     });
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
//         setFileMenuVisible(false);
//       }
//       if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
//         setEditMenuVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const editor = useEditor({
//     extensions,
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       console.log("HTML:", html);
//       console.log("JSON:", JSON.stringify(json, null, 2));
//       console.log("Text:", text);
//       setDescription(html);
//     },
//   });

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   const insertNewLine = () => {
//     if (editor) {
//       const { state, dispatch } = editor.view;
//       const { tr } = state;
//       tr.split(state.selection.head);
//       dispatch(tr);
//     }
//   };

//   const handleCharacterButtonClick = (character) => {
//     if (editor) {
//       if (listening) {
//         stopRecording(); // Stop current recording if listening
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after stopping recording
//           insertNewLine(); // Extra new line for space between dialogue pairs
//           editor
//             .chain()
//             .focus()
//             .setNode("character")
//             .insertContent(character)
//             .run();
//           setTimeout(() => {
//             insertNewLine(); // Insert a new line after character node
//             editor.chain().focus().setNode("dialogue").run();
//             setTimeout(() => {
//               startRecording(); // Start recording when dialogue node is created
//             }, 500); // Small delay before starting the new recording
//           }, 0);
//         }, 500);
//       } else {
//         insertNewLine(); // Insert a new line before inserting character node
//         editor
//           .chain()
//           .focus()
//           .setNode("character")
//           .insertContent(character)
//           .run();
//         setTimeout(() => {
//           insertNewLine(); // Insert a new line after character node
//           editor.chain().focus().setNode("dialogue").run();
//           startRecording(); // Start recording when dialogue node is created if not already listening
//         }, 500); // Small delay before starting the new recording
//       }
//     }
//   };

//   const handleActionButtonClick = () => {
//     console.log("Action button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("action").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("action").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleSceneHeaderButtonClick = () => {
//     console.log("Scene Header button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("sceneHeader").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("sceneHeader").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   const handleDialogueButtonClick = () => {
//     console.log("Dialogue button clicked");
//     if (editor) {
//       if (listening) {
//         stopRecording();
//         setTimeout(() => {
//           insertNewLine();
//           editor.chain().focus().setNode("dialogue").run();
//           setTimeout(() => {
//             insertNewLine();
//             startRecording();
//           }, 500);
//         }, 500);
//       } else {
//         insertNewLine();
//         editor.chain().focus().setNode("dialogue").run();
//         setTimeout(() => {
//           insertNewLine();
//           startRecording();
//         }, 500);
//       }
//     }
//   };

//   // Update editor content when initialContent changes
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);

//   // Add event listener for Shift key
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Shift") {
//         handleActionButtonClick();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [editor, listening]);

//   // Responsible for updating content
//   const updateContent = async () => {
//     if (editor) {
//       const newContent = editor.getJSON();
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/scenes/updateScriptsContent?scriptId=${scriptId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ newContent: newContent }),
//           },
//         );
//         const data = await response.json();
//         if (response.ok) {
//           console.log("Script content updated successfully:", data);
//         } else {
//           console.error("Failed to update script content:", data.message);
//         }
//       } catch (error) {
//         console.error("Error updating script content:", error);
//       }
//     }
//   };

//   const handleMenuClick = (callback) => {
//     callback();
//     setFileMenuVisible(false);
//     setEditMenuVisible(false);
//   };

//   return (
//     <div className="wrapper">
//       <div className="mainContainer">
//         <div className="mainNavbar">
//           <div className="controlButtonsWrapper">
//             <div className="controlButtonsContainer">
//               <div className="fileMenuContainer" ref={fileMenuRef}>
//                 <button className="fileButton" onClick={toggleFileMenu}>
//                   <p className="fileButton">File</p>
//                 </button>
//                 {fileMenuVisible && (
//                   <div className="menu fileMenu">
//                     <ul>
//                       <li>
//                         <button onClick={() => handleMenuClick(updateContent)}>
//                           Save
//                         </button>
//                         <span className="hotkey">⌘S</span>
//                       </li>
//                       <li>
//                         <a
//                           href="/scriptsLibrary"
//                           className="scriptLibraryLink no-visited-style"
//                           onClick={() => handleMenuClick(() => {})}
//                         >
//                           Scripts Library
//                         </a>
//                         <span className="hotkey">⌘L</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="editMenuContainer" ref={editMenuRef}>
//                 <button className="editButton" onClick={toggleEditMenu}>
//                   <p className="editButton">Edit</p>
//                 </button>
//                 {editMenuVisible && (
//                   <div className="menu editMenu">
//                     <ul>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().undo().run(),
//                             )
//                           }
//                         >
//                           Undo
//                         </button>
//                         <span className="hotkey">⌘Z</span>
//                       </li>
//                       <li>
//                         <button
//                           onClick={() =>
//                             handleMenuClick(() =>
//                               editor.chain().focus().redo().run(),
//                             )
//                           }
//                         >
//                           Redo
//                         </button>
//                         <span className="hotkey">⌘⇧Z</span>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <button onClick={toggleMenu}>
//                   <p className="stylingButton">Styles</p>
//                 </button>
//               </div>
//               <button
//                 onClick={() => editor.chain().focus().undo().run()}
//                 className="whiteButton"
//               >
//                 <FaUndo />
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().redo().run()}
//                 className="whiteButton"
//               >
//                 <FaRedo />
//               </button>
//             </div>
//           </div>

//           <SpeechToText
//             recordingState={recordingState}
//             onSpeechText={handleSpeechText}
//           />
//           <button onClick={toggleRecording}>
//             <img
//               src={recordingState === "start" ? MicOff : MicOn}
//               alt="Mic Icon"
//               className="icon icon-inverted"
//             />
//           </button>
//           <div className="menuBarButtonContainer">
//             <NodeButton
//               editor={editor}
//               command="setAction"
//               label="Action"
//               className="nodeButton1"
//               onClick={handleActionButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setSceneHeader"
//               label="Scene"
//               className="nodeButton1"
//               onClick={handleSceneHeaderButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setCharacter"
//               label="Character"
//               className="nodeButton1"
//               onClick={handleCharacterButtonClick}
//             />
//             <NodeButton
//               editor={editor}
//               command="setDialogue"
//               label="Dialogue"
//               className="nodeButton1"
//               onClick={handleDialogueButtonClick}
//             />
//           </div>
//         </div>
//         <div>{menuVisible && <MenuBar editor={editor} />}</div>
//         <EditorContent editor={editor} />
//       </div>
//       <CharacterDeckView
//         characterArray={characterArray}
//         onCharacterButtonClick={handleCharacterButtonClick}
//       />
//     </div>
//   );
// };

// export default Tiptap;
