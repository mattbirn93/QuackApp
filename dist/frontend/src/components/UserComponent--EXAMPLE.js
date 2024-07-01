import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
const UserComponent = () => {
    const { user, setUser } = useAppContext();
    const changeUser = () => {
        setUser("Updated User");
    };
    return (_jsxs("div", { children: [_jsxs("h2", { children: ["Current User: ", user] }), _jsx("button", { onClick: changeUser, children: "Change User" })] }));
};
export default UserComponent;
