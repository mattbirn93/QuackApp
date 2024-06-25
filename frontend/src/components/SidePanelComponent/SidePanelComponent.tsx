import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHashtag, FaUser } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import "./sidePanel.css";

const SidePanel = ({ scriptName }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`sidePanel ${isOpen || isHovered ? "open" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toggleButtonContainer">
        <button className="toggleButton" onClick={toggleSidePanel}>
          {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      {(isOpen || isHovered) && (
        <div className="sidePanelContent">
          <div className="titleContainer">
            <p className="scriptName">{scriptName}</p>
          </div>
          <div className="section">
            <div className="sectionHeader">
              <span>Owners</span>
              <button className="addButton">
                <AiOutlinePlus />
              </button>
            </div>
            <div className="sidebarItem">
              <FaUser />
              <span>Mike Giffin</span>
            </div>
            <div className="sidebarItem">
              <FaUser />
              <span>Matt Buttholtz</span>
            </div>
          </div>
          <div className="section">
            <div className="sectionHeader">
              <span>Versions</span>
              <button className="addButton">
                <AiOutlinePlus />
              </button>
            </div>
            <div className="sidebarItem">
              <FaHashtag />
              <span>Scene Versions</span>
            </div>
            <div className="sidebarItem">
              <FaHashtag />
              <span>Scene Content</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;

///////////////////

// import React, { useState } from "react";
// import { FaArrowLeft, FaArrowRight, FaHashtag, FaUser } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import "./sidePanel.css";

// const SidePanel = ({ scriptName }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidePanel = () => {
//     setIsOpen(!isOpen);
//   };

//   console.log("SCRIPTNAME: ", scriptName);

//   return (
//     <div className={`sidePanel ${isOpen ? "open" : "collapsed"}`}>
//       <div className="toggleButtonContainer">
//         <button className="toggleButton" onClick={toggleSidePanel}>
//           {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="sidePanelContent">
//           <div className="titleContainer">
//             <p className="scriptName">{scriptName}</p>
//           </div>

//           <div className="section">
//             <div className="sectionHeader">
//               <span>Owners</span>
//               <button className="addButton">
//                 <AiOutlinePlus />
//               </button>
//             </div>
//             <div className="sidebarItem">
//               <FaUser />
//               <span>Mike Giffin</span>
//             </div>
//             <div className="sidebarItem">
//               <FaUser />
//               <span>Matt Buttholtz</span>
//             </div>
//           </div>

//           <div className="section">
//             <div className="sectionHeader">
//               <span>Versions</span>
//               <button className="addButton">
//                 <AiOutlinePlus />
//               </button>
//             </div>
//             <div className="sidebarItem">
//               <FaHashtag />
//               <span>Scene Versions</span>
//             </div>
//             <div className="sidebarItem">
//               <FaHashtag />
//               <span>Scene Content</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SidePanel;
