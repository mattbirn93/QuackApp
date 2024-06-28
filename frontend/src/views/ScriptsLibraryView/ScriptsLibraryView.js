import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import ScriptsLibraryComponent from "../../components/ScriptsLibraryComponent/ScriptsLibraryComponent";
import styles from "./ScriptsLibraryView.module.css";
const ScriptsLibraryView = () => {
    return (_jsx("div", { className: styles.wrapper, children: _jsxs("div", { className: styles.mainContainer, children: [_jsxs("div", { className: styles.navContainer, children: [_jsx("div", { className: styles.searchBarContainer, children: _jsxs("div", { className: styles.searchBarWrapper, children: [_jsx(FontAwesomeIcon, { icon: faSearch, className: styles.searchIcon }), _jsx("input", { type: "text", placeholder: "Search", className: styles.searchBar })] }) }), _jsx("div", { className: styles.signInButtonContainer, children: _jsxs("button", { className: styles.signInButton, children: [_jsx(FontAwesomeIcon, { icon: faUser, className: styles.signInButtonIcon }), "Sign In"] }) })] }), _jsxs("div", { className: styles.headingsContainer, children: [_jsx("h1", { className: styles.heading1, children: "Scripts Library Home" }), _jsx("h2", { className: styles.heading2, children: "Open up a script to get started" })] }), _jsx(ScriptsLibraryComponent, {})] }) }));
};
export default ScriptsLibraryView;
