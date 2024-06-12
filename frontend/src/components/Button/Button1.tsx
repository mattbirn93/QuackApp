import React from "react";
import "./Button1.css";

// Define the props for the Button component
interface ButtonProps {
  children: React.ReactNode; // The content to be displayed inside the button
  onClick?: () => void; // Optional click event handler
  disabled?: boolean; // Optional flag to disable the button
  variant?: "primary" | "secondary" | "tertiary"; // Optional button style variant
  size?: "small" | "medium" | "large"; // Optional button size
}

// Define the Button component
const Button: React.FC<ButtonProps> = ({
  children, // Destructure the children prop
  onClick, // Destructure the onClick prop
  disabled = false, // Destructure the disabled prop with a default value of false
  variant = "primary", // Destructure the variant prop with a default value of 'primary'
  size = "medium", // Destructure the size prop with a default value of 'medium'
}) => {
  // Combine the base, variant, size, and disabled classes into a single string
  const classes = [
    "button", // Base button class
    `button-${variant}`, // Variant-specific class
    `button-${size}`, // Size-specific class
    disabled ? "button-disabled" : "", // Conditional disabled class
  ]
    .filter(Boolean) // Remove any falsey values (e.g., empty strings)
    .join(" "); // Join the classes with a space separator

  // Render the button element with the combined classes, onClick handler, disabled attribute, and children content
  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

// Export the Button component as the default export
export default Button;
