import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHashtag,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaDotCircle,
} from "react-icons/fa";
import "./sidePanel.css";

interface Owner {
  name: string;
  isOnline: boolean;
}

interface Character {
  name: string;
}

const SidePanelView = ({
  isOpen,
  isHovered,
  toggleSidePanel,
  scriptName,
  handleMouseEnter,
  handleMouseLeave,
  owners,
  characters,
  expandedSections,
  toggleSection,
}: {
  isOpen: boolean;
  isHovered: boolean;
  toggleSidePanel: () => void;
  scriptName: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  owners: Owner[];
  characters: Character[];
  expandedSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
}) => {
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
            <div
              className="sectionHeader"
              onClick={() => toggleSection("owners")}
            >
              <span>Owners</span>
              {expandedSections.owners ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expandedSections.owners &&
              owners.map((owner) => (
                <div className="sidebarItem" key={owner.name}>
                  <FaUser />
                  <span>{owner.name}</span>
                  <span
                    className={`statusDot ${owner.isOnline ? "online" : "offline"}`}
                  ></span>
                </div>
              ))}
          </div>

          <div className="section">
            <div
              className="sectionHeader"
              onClick={() => toggleSection("versions")}
            >
              <span>Versions</span>
              {expandedSections.versions ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expandedSections.versions && (
              <>
                <div className="sidebarItem">
                  <FaHashtag />
                  <span>Scene Versions</span>
                </div>
                <div className="sidebarItem">
                  <FaHashtag />
                  <span>Scene Content</span>
                </div>
              </>
            )}
          </div>

          <div className="section">
            <div
              className="sectionHeader"
              onClick={() => toggleSection("details")}
            >
              <span>Script Details</span>
              {expandedSections.details ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expandedSections.details && (
              <>
                <div className="sidebarItem">
                  <FaHashtag />
                  <span>Date Added</span>
                </div>
                <div className="sidebarItem">
                  <FaHashtag />
                  <span>Pages</span>
                </div>
              </>
            )}
          </div>

          <div className="section">
            <div
              className="sectionHeader"
              onClick={() => toggleSection("characters")}
            >
              <span>Characters</span>
              {expandedSections.characters ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>
            {expandedSections.characters && (
              <div className="charactersList">
                {characters.map((character) => (
                  <div className="sidebarItem" key={character.name}>
                    <FaDotCircle />
                    <span>{character.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanelView;

//////////////////

// import React from "react";
// import { FaArrowLeft, FaArrowRight, FaHashtag, FaUser } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import "./sidePanel.css";

// const SidePanelView = ({
//   isOpen,
//   isHovered,
//   toggleSidePanel,
//   scriptName,
//   handleMouseEnter,
//   handleMouseLeave,
// }: {
//   isOpen: boolean;
//   isHovered: boolean;
//   toggleSidePanel: () => void;
//   scriptName: string;
//   handleMouseEnter: () => void;
//   handleMouseLeave: () => void;
// }) => {
//   return (
//     <div
//       className={`sidePanel ${isOpen || isHovered ? "open" : "collapsed"}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="toggleButtonContainer">
//         <button className="toggleButton" onClick={toggleSidePanel}>
//           {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
//         </button>
//       </div>
//       {(isOpen || isHovered) && (
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

//           <div className="section">
//             <div className="sectionHeader">
//               <span>Script Details</span>
//               <button className="addButton">
//                 <AiOutlinePlus />
//               </button>
//             </div>
//             <div className="sidebarItem">
//               <FaHashtag />
//               <span>Date Added</span>
//             </div>
//             <div className="sidebarItem">
//               <FaHashtag />
//               <span>Pages</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SidePanelView;
