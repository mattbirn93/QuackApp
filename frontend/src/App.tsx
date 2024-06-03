import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import MyErrorBoundary from "./MyErrorBoundary";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader-EXAMPLE";
import { EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import TipTap from './interfaces/tipTapEditors'
import TextAlign from '@tiptap/extension-text-align';

import CameraComponent from "./components/Camera/CameraComponent-EXAMPLE";
import LocationComponent from "./components/Location/LocationComponent-EXAMPLE";
import SpeechToText from "./components/SppechToText/SpeechToText-EXAMPLE";
import { AppDataInterface } from "./interfaces/interfaces";
import UserComponent from "./components/UserComponent--EXAMPLE";
import FramerComponent from "./components/Animation/FramerComponent-EXAMPLE";
import { Button } from "./components";
import Header from "./components/Header/Header-EXAMPLE";
import { Schema, DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { exampleSetup } from 'prosemirror-example-setup';

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
  onClick={() => {
    console.log("Hello World");  // This will log "Hello World" to the console.
    editor.chain().focus().toggleCode().run();
  }}
  disabled={
    !editor.can()
      .chain()
      .focus()
      .toggleCode()
      .run()
  }
  className={editor.isActive('code') ? 'is-active' : ''}
>
  code
</button>

      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
    </>
  )
}

const extensions = [
 
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`


const App: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);
  const [data, setData] = useState<AppDataInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        title: "Hello World",
        content: "This is a sample content.",
      });
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/users`, {
          first_name: "From front end UseEffect9",
          last_name: "From front end UseEffect9",
          email: "From front end UseEffect9@gmail.com",
          scripts_id_array: [],
        });
        console.log("User added:", response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  useEffect(() => {
    // Initialize the WebSocket connection
    socketRef.current = io(API_BASE_URL, {
      transports: ["websocket"], // Force WebSocket transport
      rejectUnauthorized: false, // Accept self-signed certificates if using HTTPS
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("content_item_created", (response) => {
      console.log("Content item created:", response);
    });

    socketRef.current.on("content_item_updated", (response) => {
      console.log("Content item updated:", response);
    });

    socketRef.current.on("scene_version_content", (response) => {
      console.log("Scene version content received:", response);
    });

    socketRef.current.on("delete_content_item", (response) => {
      console.log("Content item deleted:", response);
    });

    socketRef.current.on("update_content_item_error", (error) => {
      console.error("Update content item error:", error);
    });

    socketRef.current.on("create_content_item_error", (error) => {
      console.error("Create content item error:", error);
    });

    socketRef.current.on("delete_content_item_error", (error) => {
      console.error("Delete content item error:", error);
    });

    socketRef.current.on("get_scene_version_content", (error) => {
      console.error("Get scene version content  error:", error);
    });

    socketRef.current.on("charactersData", (data) => {
      console.log("Received characters data:", data);
    });

    // Listener for successful character addition
    socketRef.current.on("characterAdded", (data) => {
      console.log("Character added to array:", data);
    });

    // Listener for successful character update
    socketRef.current.on("characterUpdated", (data) => {
      console.log("Character updated in array:", data);
    });

    // Listen

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [API_BASE_URL]);

  const fetchSceneVersionContent = () => {
    if (socketRef.current) {
      const id = "66495227baa753a417fd5468"; // This should be replaced with the actual ID you want to query
      console.log("Emitting get_scene_version_content event with id:", id);
      socketRef.current.emit("get_scene_version_content", { id });
    }
  };

  const addUser = () => {
    const data = {
      first_name: "From front end websockets version Homie3",
      last_name: "From front end websockets version Homie3",
      email: "From front end websockets versionHomie3@gmail.com",
      scripts_id_array: [],
    };

    if (socketRef.current) {
      socketRef.current.emit("add_user", data);
    }
  };

  const createContentItem = () => {
    const data = {
      id: "66495227baa753a417fd5468", // Replace with the actual ID
      contentItem: {
        notes: "Final test",
        text: "Test item text",
        type: "Test item type",
        time_stamp: new Date(),
      },
    };

    if (socketRef.current) {
      console.log("Emitting create_content_item event with data:", data);
      socketRef.current.emit("create_content_item", data);
    }
  };

  const updateContentItem = () => {
    const data = {
      id: "66495227baa753a417fd5468", // Replace with the actual ID
      contentItem: {
        notes: "This really worked five",
        text: "Test Update text",
        type: "Test Update type",
        content_id: "6656a1ae9e2949232a2ece0b", // Replace with the actual content_id
        time_stamp: new Date(),
      },
    };

    if (socketRef.current) {
      console.log("Emitting update_content_item event with data:", data);
      socketRef.current.emit("update_content_item", data);
    }
  };

  const deleteContentItem = (content_id: string) => {
    console.log("hi");
    const data = {
      id: "66495227baa753a417fd5468", // Replace with the actual ID
      content_id,
    };

    if (socketRef.current) {
      console.log("Emitting delete_content_item event to delete item:", data);
      socketRef.current.emit("delete_content_item", data);
    }
  };

  const fetchCharactersById = (id: string) => {
    if (socketRef.current) {
      socketRef.current.emit("getCharactersById", id);
    } else {
      console.error("Socket not initialized");
    }
  };
  
  const addCharacter = (charactersId: string, character: { name: string; role: string; }) => {
    if (socketRef.current) {
      socketRef.current.emit("addCharacterToArray", { charactersId, character });
    } else {
      console.error("Socket not initialized");
    }
  };
  
  const updateCharacter = (charactersId: string, characterId: string,  character_name: string) => {
    if (socketRef.current) {
      socketRef.current.emit("updateCharacterInArray", { charactersId, characterId, character_name });
    } else {
      console.error("Socket not initialized");
    }
  };

  return (
    <MyErrorBoundary fallback={"There was an error"}>
      {loading ? (
        <SkeletonLoader />
      ) : (
        
        <div className="custom-combined">
          <div className="custom-combined">
        <Header />
        </div>

          <Header />
          <div style={{height: "10rem", display: "flex", flexDirection: "column"}}>
          <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
          <EditorContent editor={null} />

          </div>

          {/* Heading with extended 6xl font size */}
          <h1 className="text-6xl font-bold text-primary mb-4">
            Welcome to the Screenwriting App
          </h1>
          <Button />
          <FramerComponent />
          <div>Toxic Positivity is for Realzzzzzz</div>
          <button title="Add User" onClick={addUser}>
            Add User
          </button>
          <button onClick={updateContentItem}>Update Content Item</button>
          <button onClick={fetchSceneVersionContent}>
            Fetch Scene Version Content
          </button>
          <button onClick={() => fetchCharactersById("6646c588a11c19e5e0bf3e1b")}>Fetch Characters</button>
      <button onClick={() => addCharacter("6646c588a11c19e5e0bf3e1b", { name: "New Character", role: "Hero" })}>Add Character</button>
      <button onClick={() => updateCharacter("6646c588a11c19e5e0bf3e1b", "6646c69998c165f4b5411292", "Batman" )}>Update Character</button>
          <button onClick={createContentItem}>Create Content Item</button>
          <button onClick={() => deleteContentItem("66568fe27c5d9f8bebb8f3f3")}>
            Delete Content Item
          </button>

          <UserComponent />
          <div>
            <div>
              {data && (
                <>
                  <h1 className="text-[red]">{data.title}</h1>
                  <p className="text-[red]">{data.content}</p>
                </>
              )}
            </div>
            <div className="text-custom-red">
              <div className="m-[var(--mXL)] p-[var(--padL)] text-fs1300">
                Hello World
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">Example Component</h2>
                <p className="text-[purple]">
                  This is an example component using Tailwind CSS.
                </p>
                <button className="custom-btn">Click Me</button>
              </div>
              <h1 className="text-[pink]">Camera and Location Access</h1>

              <div className="mt-[10rem]">
                <CameraComponent />
              </div>

              <LocationComponent />
              <div className="mt-[10rem]">
                <SpeechToText />
              </div>
            </div>
          </div>
        </div>
      )}
    </MyErrorBoundary>
  );
};

export default App;
