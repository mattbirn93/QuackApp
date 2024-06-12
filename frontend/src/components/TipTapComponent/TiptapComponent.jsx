/////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "./nodes/customNodes";
// import NodeButton from "./Button/NodeButton";
// import SpeechToText from "./SpeechToText/SpeechToText-EXAMPLE";
// import MicOn from "../assets/images/icons8-microphone-On.png";
// import MicOff from "../assets/images/icons8-microphone-Off.png";

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
//     <>
//       <div className="menuBar">
//         <div>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleBold().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("bold") ? "is_active" : ""}
//           >
//             <FaBold />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleItalic().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("italic") ? "is_active" : ""}
//           >
//             <FaItalic />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleUnderline().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("underline") ? "is_active" : ""}
//           >
//             <FaUnderline />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleStrike().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("strike") ? "is_active" : ""}
//           >
//             <FaStrikethrough />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleHeading({ level: 2 }).run();
//               logCurrentNodeType(editor);
//             }}
//             className={
//               editor.isActive("heading", { level: 2 }) ? "is_active" : ""
//             }
//           >
//             <FaHeading />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleHeading({ level: 3 }).run();
//               logCurrentNodeType(editor);
//             }}
//             className={
//               editor.isActive("heading", { level: 3 }) ? "is_active" : ""
//             }
//           >
//             <FaHeading className="heading3" />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleBulletList().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("bulletList") ? "is_active" : ""}
//           >
//             <FaListUl />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleOrderedList().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("orderedList") ? "is_active" : ""}
//           >
//             <FaListOl />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().toggleBlockquote().run();
//               logCurrentNodeType(editor);
//             }}
//             className={editor.isActive("blockquote") ? "is_active" : ""}
//           >
//             <FaQuoteLeft />
//           </button>
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               editor.chain().focus().undo().run();
//               logCurrentNodeType(editor);
//             }}
//           >
//             <FaUndo />
//           </button>
//           <button
//             onClick={() => {
//               editor.chain().focus().redo().run();
//               logCurrentNodeType(editor);
//             }}
//           >
//             <FaRedo />
//           </button>
//         </div>
//       </div>
//     </>
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

// const content = "<p>TIPTAP TEST TEXT</p>";

// const logCurrentNodeType = (editor) => {
//   const { state } = editor;
//   const { selection } = state;
//   const { from, to } = selection;

//   // Get the parent node at the start of the selection
//   const node = state.doc.resolve(from).parent;

//   if (node) {
//     console.log("Current node type:", node.type.name);
//   } else {
//     console.log("No node selected");
//   }
// };

// export const Tiptap = ({ setDescription }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const editor = useEditor({
//     extensions,
//     content,
//     editable: true,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       setDescription(html);
//       logCurrentNodeType(editor);
//     },
//     onCreate: ({ editor }) => {
//       // Set default node to Action on initial load
//       editor.chain().focus().setAction().run();
//       console.log("Editor created and default Action node set");
//       logCurrentNodeType(editor);
//     },
//   });

//   useEffect(() => {
//     if (editor) {
//       // Set Action node on page reload
//       editor.chain().focus().setAction().run();
//       logCurrentNodeType(editor);

//       // Add keydown event listener to handle Enter keypress
//       editor.view.dom.addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//           const { state } = editor;
//           const { selection } = state;
//           const { from } = selection;
//           const node = state.doc.nodeAt(from);

//           if (node && node.type.name === "character") {
//             event.preventDefault();
//             editor.chain().focus().setDialogue().run();
//           } else if (node && node.type.name === "dialogue") {
//             event.preventDefault();
//             editor.chain().focus().setAction().run();
//           }
//           logCurrentNodeType(editor);
//         }
//       });
//     }
//   }, [editor]);

//   const handleNodeButtonClick = (command) => {
//     if (editor) {
//       editor.chain().focus()[command]().run();
//       logCurrentNodeType(editor);
//     }
//   };

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   return (
//     <div>
//       <div className="mainNavbar">
//         <NodeButton
//           onClick={() => handleNodeButtonClick("setAction")}
//           editor={editor}
//           command="setAction"
//           label="Action"
//           className="nodeButton1"
//         />
//         <NodeButton
//           onClick={() => handleNodeButtonClick("setSceneHeader")}
//           editor={editor}
//           command="setSceneHeader"
//           label="Scene Header"
//           className="nodeButton1"
//         />
//         <NodeButton
//           onClick={() => handleNodeButtonClick("setCharacter")}
//           editor={editor}
//           command="setCharacter"
//           label="Character"
//           className="nodeButton1"
//         />
//         <NodeButton
//           onClick={() => handleNodeButtonClick("setDialogue")}
//           editor={editor}
//           command="setDialogue"
//           label="Dialogue"
//           className="nodeButton1"
//         />
//       </div>

//       <div>
//         <SpeechToText
//           recordingState={recordingState}
//           onSpeechText={handleSpeechText}
//         />
//         <button onClick={toggleRecording}>
//           <img
//             src={recordingState === "start" ? MicOff : MicOn}
//             alt="Mic Icon"
//             className="icon icon-inverted"
//           />
//         </button>

//         <button onClick={toggleMenu}>
//           <FaBars className="hamburgerMenu" />
//         </button>
//         {menuVisible && <MenuBar editor={editor} />}
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// };

/////////////////////

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Action, SceneHeader, Character, Dialogue } from "../nodes/customNodes";
import NodeButton from "../nodes/NodeButton";
import SpeechToText from "../SpeechToTextComponent/SpeechToTextComponent";
import MicOn from "../../assets/images/icons8-microphone-On.png";
import MicOff from "../../assets/images/icons8-microphone-Off.png";
import "./Tiptap.css";

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
    <>
      <div className="menuBar">
        <div>
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
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is_active" : ""
            }
          >
            <FaHeading />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is_active" : ""
            }
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
        <div>
          <button onClick={() => editor.chain().focus().undo().run()}>
            <FaUndo />
          </button>
          <button onClick={() => editor.chain().focus().redo().run()}>
            <FaRedo />
          </button>
        </div>
      </div>
    </>
  );
};

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

export const Tiptap = ({ initialContent, setDescription }) => {
  const [recordingState, setRecordingState] = useState("stop");
  const [listening, setListening] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  console.log(initialContent, "initial content");

  const toggleRecording = () => {
    setRecordingState((prev) => {
      const newState = prev === "stop" ? "start" : "stop";
      console.log("Toggled recording state to:", newState);
      setListening(newState === "start");
      return newState;
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  // Responsible for updating content
  const updateContent = async () => {
    if (editor) {
      const newContent = editor.getJSON();
      try {
        const response = await fetch(
          `https://localhost:5001/api/scenes/updateScriptsContent?scriptId=6646be1cdca652f39dd85ba9`,
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

  return (
    <div>
      <button onClick={updateContent}>Update Content</button>

      <div className="mainNavbar">
        <NodeButton
          editor={editor}
          command="setAction"
          label="Action"
          className="nodeButton1"
        />
        <NodeButton
          editor={editor}
          command="setSceneHeader"
          label="Scene Header"
          className="nodeButton1"
        />
        <NodeButton
          editor={editor}
          command="setCharacter"
          label="Character"
          className="nodeButton1"
        />
        <NodeButton
          editor={editor}
          command="setDialogue"
          label="Dialogue"
          className="nodeButton1"
        />
      </div>

      <div>
        <SpeechToText
          recordingState={recordingState}
          onSpeechText={handleSpeechText}
        />
        <button onClick={toggleRecording}>
          <img
            src={recordingState === "start" ? MicOff : MicOn}
            alt="Mic Icon"
            className="icon icon-inverted"
          />
        </button>

        <button onClick={toggleMenu}>
          <FaBars className="hamburgerMenu" />
        </button>
        {menuVisible && <MenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

////////////////////////////////////////

// import React, { useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { Action, SceneHeader, Character, Dialogue } from "./nodes/customNodes";
// import NodeButton from "./Button/NodeButton";
// import SpeechToText from "./SpeechToText/SpeechToText-EXAMPLE";
// import MicOn from "../assets/images/icons8-microphone-On.png";
// import MicOff from "../assets/images/icons8-microphone-Off.png";

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
//     <>
//       <div className="menuBar">
//         <div>
//           <button
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className={editor.isActive("bold") ? "is_active" : ""}
//           >
//             <FaBold />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className={editor.isActive("italic") ? "is_active" : ""}
//           >
//             <FaItalic />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleUnderline().run()}
//             className={editor.isActive("underline") ? "is_active" : ""}
//           >
//             <FaUnderline />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleStrike().run()}
//             className={editor.isActive("strike") ? "is_active" : ""}
//           >
//             <FaStrikethrough />
//           </button>
//           <button
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//             className={
//               editor.isActive("heading", { level: 2 }) ? "is_active" : ""
//             }
//           >
//             <FaHeading />
//           </button>
//           <button
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 3 }).run()
//             }
//             className={
//               editor.isActive("heading", { level: 3 }) ? "is_active" : ""
//             }
//           >
//             <FaHeading className="heading3" />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//             className={editor.isActive("bulletList") ? "is_active" : ""}
//           >
//             <FaListUl />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleOrderedList().run()}
//             className={editor.isActive("orderedList") ? "is_active" : ""}
//           >
//             <FaListOl />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleBlockquote().run()}
//             className={editor.isActive("blockquote") ? "is_active" : ""}
//           >
//             <FaQuoteLeft />
//           </button>
//         </div>
//         <div>
//           <button onClick={() => editor.chain().focus().undo().run()}>
//             <FaUndo />
//           </button>
//           <button onClick={() => editor.chain().focus().redo().run()}>
//             <FaRedo />
//           </button>
//         </div>
//       </div>
//     </>
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

// const content = "<p>TIPTAP TEST TEXT</p>";

// export const Tiptap = ({ setDescription }) => {
//   const [recordingState, setRecordingState] = useState("stop");
//   const [listening, setListening] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);

//   const toggleRecording = () => {
//     setRecordingState((prev) => {
//       const newState = prev === "stop" ? "start" : "stop";
//       console.log("Toggled recording state to:", newState);
//       setListening(newState === "start");
//       return newState;
//     });
//   };

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const editor = useEditor({
//     extensions,
//     content,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       const json = editor.getJSON();
//       const text = editor.getText();
//       setDescription(html);
//     },
//   });

//   const handleSpeechText = (text) => {
//     if (editor) {
//       editor.chain().focus().insertContent(text).run();
//     }
//   };

//   return (
//     <div>
//       <div className="mainNavbar">
//         <NodeButton
//           editor={editor}
//           command="setAction"
//           label="Action"
//           className="nodeButton1"
//         />
//         <NodeButton
//           editor={editor}
//           command="setSceneHeader"
//           label="Scene Header"
//           className="nodeButton1"
//         />
//         <NodeButton
//           editor={editor}
//           command="setCharacter"
//           label="Character"
//           className="nodeButton1"
//         />
//         <NodeButton
//           editor={editor}
//           command="setDialogue"
//           label="Dialogue"
//           className="nodeButton1"
//         />
//       </div>

//       <div>
//         <SpeechToText
//           recordingState={recordingState}
//           onSpeechText={handleSpeechText}
//         />
//         <button onClick={toggleRecording}>
//           <img
//             src={recordingState === "start" ? MicOff : MicOn}
//             alt="Mic Icon"
//             className="icon icon-inverted"
//           />
//         </button>

//         <button onClick={toggleMenu}>
//           <FaBars className="hamburgerMenu" />
//         </button>
//         {menuVisible && <MenuBar editor={editor} />}
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// };
