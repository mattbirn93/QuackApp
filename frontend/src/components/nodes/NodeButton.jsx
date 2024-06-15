import React from "react";

const NodeButton = ({ editor, command, label, className, onClick }) => {
  if (!editor) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();  // Use the provided onClick function
    } else {
      editor.chain().focus()[command]().run();  // Default behavior
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

export default NodeButton;
