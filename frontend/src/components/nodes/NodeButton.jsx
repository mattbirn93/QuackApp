import React from "react";

const NodeButton = ({ editor, command, label, className, onClick }) => {
  if (!editor) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      editor.chain().focus()[command]().run();
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

export default NodeButton;
