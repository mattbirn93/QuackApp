import React, { useState } from "react";
import SidePanelView from "./SidePanelView";

interface Character {
  name: string;
}

interface Owner {
  name: string;
  isOnline: boolean;
}

const SidePanel = ({ scriptName }: { scriptName: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    owners: true,
    versions: false,
    details: false,
    characters: false,
  });

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

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const owners = [
    { name: "Mike Giffin", isOnline: true },
    { name: "Matt Buttholtz", isOnline: false },
  ];

  // Mock list of characters
  const characterArray = [
    { name: "Mike" },
    { name: "Matt" },
    { name: "Alice" },
    { name: "Bob" },
    { name: "Tim" },
    { name: "Janet" },
    { name: "Sally" },
    { name: "Reed" },
    { name: "Patrick" },
    { name: "Simone" },
    { name: "Peter" },
    { name: "Valencia" },
    { name: "Steve" },
    { name: "York" },
  ];

  return (
    <SidePanelView
      isOpen={isOpen}
      isHovered={isHovered}
      toggleSidePanel={toggleSidePanel}
      scriptName={scriptName}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      owners={owners}
      characters={characterArray}
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    />
  );
};

export default SidePanel;

///////

// import React, { useState } from "react";
// import SidePanelView from "./SidePanelView";

// interface Character {
//   name: string;
// }

// const SidePanel = ({ scriptName }: { scriptName: string }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   const toggleSidePanel = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMouseEnter = () => {
//     if (!isOpen) {
//       setIsHovered(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isOpen) {
//       setIsHovered(false);
//     }
//   };

//   const owners = [
//     { name: "Mike Giffin", isOnline: true },
//     { name: "Matt Buttholtz", isOnline: false },
//   ];

//   // Mock list of characters
//   const characterArray = [
//     { name: "Mike" },
//     { name: "Matt" },
//     { name: "Alice" },
//     { name: "Bob" },
//     { name: "Tim" },
//     { name: "Janet" },
//     { name: "Sally" },
//     { name: "Reed" },
//     { name: "Patrick" },
//     { name: "Simone" },
//     { name: "Peter" },
//     { name: "Valencia" },
//     { name: "Steve" },
//     { name: "York" },
//   ];

//   return (
//     <SidePanelView
//       isOpen={isOpen}
//       isHovered={isHovered}
//       toggleSidePanel={toggleSidePanel}
//       scriptName={scriptName}
//       handleMouseEnter={handleMouseEnter}
//       handleMouseLeave={handleMouseLeave}
//       owners={owners}
//       characters={characterArray}
//     />
//   );
// };

// export default SidePanel;

//////////////

// import React, { useState } from "react";
// import SidePanelView from "./SidePanelView";

// const SidePanel = ({ scriptName }: { scriptName: string }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   const toggleSidePanel = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMouseEnter = () => {
//     if (!isOpen) {
//       setIsHovered(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isOpen) {
//       setIsHovered(false);
//     }
//   };

//   return (
//     <SidePanelView
//       isOpen={isOpen}
//       isHovered={isHovered}
//       toggleSidePanel={toggleSidePanel}
//       scriptName={scriptName}
//       handleMouseEnter={handleMouseEnter}
//       handleMouseLeave={handleMouseLeave}
//     />
//   );
// };

// export default SidePanel;

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
