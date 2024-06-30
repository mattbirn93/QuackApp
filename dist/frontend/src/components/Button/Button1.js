import { jsx as _jsx } from "react/jsx-runtime";
import "./Button1.css";
// Define the Button component
const Button = ({ children, // Destructure the children prop
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
    return (_jsx("button", { onClick: onClick, className: classes, disabled: disabled, children: children }));
};
// Export the Button component as the default export
export default Button;
