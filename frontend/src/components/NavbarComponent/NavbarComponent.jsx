import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/scriptslibrary">ScriptsLibrary</Link>
      <Link to="/">ScriptsInterface</Link>
    </div>
  );
}

export default Navbar;
