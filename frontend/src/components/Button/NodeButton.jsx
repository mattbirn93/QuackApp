// src/components/NodeButton.jsx
import React from "react";

const NodeButton = ({ editor, command, label, className }) => {
  if (!editor) {
    return null;
  }

  const handleClick = () => {
    editor.chain().focus()[command]().run();
  };

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

export default NodeButton;
