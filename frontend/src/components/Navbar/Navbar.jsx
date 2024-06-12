import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <p>Here is the best looking Navbar placeholder you have ever seen!</p>
      <Link to="/"></Link>
      <Link to="/home">Home</Link>
      <Link to="/scriptslibrary">ScriptsLibrary</Link>
    </div>
  );
}

export default Navbar;
