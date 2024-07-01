import { jsx as _jsx } from "react/jsx-runtime";
// src/AppContext.tsx
import { createContext, useContext, useState } from "react";
const AppContext = createContext(undefined);
export const AppProvider = ({ children, }) => {
    const [user, setUser] = useState("Guest");
    return (_jsx(AppContext.Provider, { value: { user, setUser }, children: children }));
};
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
