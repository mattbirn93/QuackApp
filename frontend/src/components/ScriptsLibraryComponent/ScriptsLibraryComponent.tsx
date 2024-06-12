import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scripts from "./scripts.json";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import Button1 from "../Button/Button1";
import AddScriptModal from "./modals/AddScriptModal";
import DeleteScriptModal from "./modals/DeleteScriptModal";
import EditScriptModal from "./modals/EditScriptModal";
import "./ScriptsLibraryComponent.css";
import editIcon from "../../assets/images/editIcon.png"; // Add your edit icon image
import deleteIcon from "../../assets/images/deleteIcon.png"; // Add your delete icon image

interface Script {
  title: string;
  author: string;
  dateCreated: string;
  dateModified: string;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>(scripts);
  const [loading, setLoading] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleScriptClick = () => {
    navigate("/"); // Redirect to home page
  };

  const handleEditClick = (script: Script) => {
    setSelectedScript(script);
    setIsInfoModalVisible(true);
  };

  const handleDeleteClick = (script: Script) => {
    setSelectedScript(script);
    setIsDeleteModalVisible(true);
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

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleEditScript = (newTitle: string, newAuthor: string) => {
    if (selectedScript) {
      setScriptList((prevList) =>
        prevList.map((script) =>
          script.title === selectedScript.title
            ? { ...script, title: newTitle, author: newAuthor }
            : script,
        ),
      );
      setIsInfoModalVisible(false);
    }
  };

  const handleDeleteScript = () => {
    if (selectedScript) {
      setScriptList((prevList) =>
        prevList.filter((script) => script.title !== selectedScript.title),
      );
      setIsDeleteModalVisible(false);
    }
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
            <div className="script-container" key={index}>
              <div className="script-icons-container">
                <img
                  src={editIcon}
                  alt="Edit Icon"
                  className="icon"
                  onClick={() => handleEditClick(script)}
                />
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  className="icon"
                  onClick={() => handleDeleteClick(script)}
                />
              </div>
              <img
                src={PageIcon1}
                alt="Script Icon"
                className="script-icon-image"
                onClick={handleScriptClick}
              />
              <p className="script-title">{script.title}</p>
            </div>
          ))
        )}
      </div>
      {selectedScript && (
        <EditScriptModal
          isVisible={isInfoModalVisible}
          onClose={handleCloseInfoModal}
          onEdit={handleEditScript}
          title={selectedScript.title}
          author={selectedScript.author}
          dateCreated={selectedScript.dateCreated}
          dateModified={selectedScript.dateModified}
        />
      )}
      <AddScriptModal
        isVisible={isAddScriptModalVisible}
        onClose={handleCloseAddScriptModal}
      />
      {selectedScript && (
        <DeleteScriptModal
          isVisible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteScript}
          title={selectedScript.title}
        />
      )}
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

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const handleScriptClick = () => {
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
//               onClick={handleScriptClick}
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
//       <ScriptsLibraryInfoModal
//         isVisible={isInfoModalVisible}
//         onClose={handleCloseInfoModal}
//         title={""}
//         author={""}
//         dateCreated={""}
//         dateModified={""}
//         onEdit={function (newTitle: string, newAuthor: string): void {
//           throw new Error("Function not implemented.");
//         }}
//         onDelete={function (): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       <AddScriptModal
//         isVisible={isAddScriptModalVisible}
//         onClose={handleCloseAddScriptModal}
//       />
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;
