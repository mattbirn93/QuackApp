import React, { useState, useEffect } from "react";
import scripts from "./scripts.json";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import Button1 from "../Button/Button1";
import ScriptsLibraryInfoModal from "./modals/ScriptsLibraryInfoModal";
import AddScriptModal from "./modals/AddScriptModal";
import "./ScriptsLibraryComponent.css";

interface Script {
  title: string;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>(scripts);
  const [loading, setLoading] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleScriptClick = () => {
    setIsInfoModalVisible(true);
  };

  const handleAddScriptClick = () => {
    setIsAddScriptModalVisible(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalVisible(false);
  };

  const handleCloseAddScriptModal = () => {
    setIsAddScriptModalVisible(false);
  };

  return (
    <div className="scripts-library-component">
      <div className="scriptsButtonContainer">
        <Button1 onClick={handleAddScriptClick} variant="tertiary" size="small">
          Add Scripts +
        </Button1>
      </div>
      <div className="scripts-library-component">
        {loading ? (
          <p>Loading...</p>
        ) : (
          scriptList.map((script, index) => (
            <div
              className="script-container"
              key={index}
              onClick={handleScriptClick}
            >
              <img
                src={PageIcon1}
                alt="Script Icon"
                className="script-icon-image"
              />
              <p className="script-title">{script.title}</p>
            </div>
          ))
        )}
      </div>
      <ScriptsLibraryInfoModal
        isVisible={isInfoModalVisible}
        onClose={handleCloseInfoModal}
      />
      <AddScriptModal
        isVisible={isAddScriptModalVisible}
        onClose={handleCloseAddScriptModal}
      />
    </div>
  );
};

export default ScriptsLibraryComponent;

/////////////////////////////////

// import React, { useState, useEffect } from "react";
// import scripts from "./scripts.json";
// import PageIcon1 from "../../assets/images/PageIcon1.png";
// import Button1 from "../Button/Button1";
// import ScriptsLibraryInfoModal from "./modals/ScriptsLibraryInfoModal";
// import AddScriptModal from "./modals/AddScriptModal";
// import "./ScriptsLibraryComponent.css";

// interface Script {
//   title: string;
// }

// const ScriptsLibraryComponent: React.FC = () => {
//   const [scriptList, setScriptList] = useState<Script[]>(scripts);
//   const [loading, setLoading] = useState(true);
//   const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
//   const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);

//   const [selectedScript, setSelectedScript] = useState<{
//     title: string;
//     author: string;
//     dateCreated: string;
//     dateModified: string;
//   } | null>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const handleScriptClick = (script: Script) => {
//     setSelectedScript({
//       title: script.title,
//       author: "Michael Filoramo",
//       dateCreated: "2020-10-05",
//       dateModified: "2024-10-05",
//     });
//     setIsInfoModalVisible(true);
//   };

//   const handleAddScriptClick = () => {
//     setIsAddScriptModalVisible(true);
//   };

//   const handleCloseInfoModal = () => {
//     setIsInfoModalVisible(false);
//   };

//   const handleCloseAddScriptModal = () => {
//     setIsAddScriptModalVisible(false);
//   };

//   const handleEditScript = (newTitle: string, newAuthor: string) => {
//     if (selectedScript) {
//       setScriptList((prevList) =>
//         prevList.map((script) =>
//           script.title === selectedScript.title
//             ? { ...script, title: newTitle }
//             : script,
//         ),
//       );
//       setSelectedScript((prev) => {
//         if (prev) {
//           return { ...prev, title: newTitle, author: newAuthor };
//         }
//         return null;
//       });
//       setIsInfoModalVisible(false);
//     }
//   };

//   const handleDeleteScript = () => {
//     if (selectedScript) {
//       setScriptList((prevList) =>
//         prevList.filter((script) => script.title !== selectedScript.title),
//       );
//       setIsInfoModalVisible(false);
//     }
//   };

//   return (
//     <div className="scripts-library-component">
//       <div className="scriptsButtonContainer">
//         <Button1 onClick={handleAddScriptClick} variant="tertiary" size="small">
//           Add Scripts +
//         </Button1>
//       </div>
//       <div className="scripts-library-component">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           scriptList.map((script, index) => (
//             <div
//               className="script-container"
//               key={index}
//               onClick={() => handleScriptClick(script)}
//             >
//               <img
//                 src={PageIcon1}
//                 alt="Script Icon"
//                 className="script-icon-image"
//               />
//               <p className="script-title">{script.title}</p>
//             </div>
//           ))
//         )}
//       </div>
//       {selectedScript && (
//         <ScriptsLibraryInfoModal
//           isVisible={isInfoModalVisible}
//           onClose={handleCloseInfoModal}
//           onEdit={handleEditScript}
//           onDelete={handleDeleteScript}
//           title={selectedScript.title}
//           author={selectedScript.author}
//           dateCreated={selectedScript.dateCreated}
//           dateModified={selectedScript.dateModified}
//         />
//       )}
//       <AddScriptModal
//         isVisible={isAddScriptModalVisible}
//         onClose={handleCloseAddScriptModal}
//       />
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;
