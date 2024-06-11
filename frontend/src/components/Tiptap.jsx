import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Action, SceneHeader, Character, Dialogue } from "./nodes/customNodes";
import NodeButton from "./Button/NodeButton";
import SpeechToText from "./SpeechToText/SpeechToText-EXAMPLE";

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
} from "react-icons/fa";

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("TipTap", ydoc);

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center my-2 space-x-2">
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

const content = "<p>TIPTAP TEST TEXT</p>";

export const Tiptap = ({ setDescription }) => {
  const [recordingState, setRecordingState] = useState("stop");
  const [listening, setListening] = useState(false);

  const toggleRecording = () => {
    setRecordingState((prev) => {
      const newState = prev === "stop" ? "start" : "stop";
      console.log("Toggled recording state to:", newState);
      setListening(newState === "start");
      return newState;
    });
  };

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      const text = editor.getText();
      // console.log("HTML:", html);
      // console.log("JSON:", JSON.stringify(json, null, 2));
      // console.log("Text:", text);
      setDescription(html);
    },
  });

  const handleSpeechText = (text) => {
    if (editor) {
      editor.chain().focus().insertContent(text).run();
    }
  };

  return (
    <div>
      <SpeechToText
        recordingState={recordingState}
        listening={listening}
        onSpeechText={handleSpeechText}
      />
      <button onClick={toggleRecording}>
        {recordingState === "start" ? "Stop Recording" : "Start Recording"}
      </button>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

////////////////////////////

// import React from "react";
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
// } from "react-icons/fa";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <>
//       <div className="flex justify-center my-2 space-x-2">
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
//   const [recordingState, setRecordingState] = React.useState(false);

//   const toggleRecording = () => {
//     setRecordingState((prev) => (prev === "stop" ? "start" : "stop"));
//   };

//   const editor = useEditor({
//     extensions,
//     content,
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

//   return (
//     <div>
//       <SpeechToText recordingState={recordingState} />
//       <button onClick={toggleRecording}>
//         {recordingState === "start" ? "Stop Recording" : "Start Recording"}
//       </button>
//       <MenuBar editor={editor} />
//       <EditorContent editor={editor} />
//       {/* <div className="characterDeck">Character Deck</div> */}
//     </div>
//   );
// };

//////////////

// import {
//   useEditor,
//   EditorContent,
//   FloatingMenu,
//   BubbleMenu,
// } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";

// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("TipTap", ydoc);

// // define your extension array
// const extensions = [
//   StarterKit,
//   Collaboration.configure({ document: ydoc }),
//   CollaborationCursor.configure({
//     provider: provider,
//     user: { name: "Mike Giffin", color: "red" },
//   }),
// ];

// const content = "<p>TIPTAP TEST TEXT</p>";

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions,
//     content,
//   });

//   return (
//     <div className="ProseMirror">
//       <EditorContent editor={editor} />
//       <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
//       <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
//     </div>
//   );
// };

// export default Tiptap;
