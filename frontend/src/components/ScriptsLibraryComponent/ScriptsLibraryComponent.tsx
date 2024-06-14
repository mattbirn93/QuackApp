import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import PageIcon1 from "../../assets/images/PageIcon1.png";
import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
import styles from "./ScriptsLibraryComponent.module.css";
import editIcon from "../../assets/images/editIcon.png";

interface Script {
  [x: string]: any;
  _id: string;
  title: string;
  writtenBy: string;
  address: string;
  phoneNumber: string;
  dateCreated: string;
  dateModified: string;
}
interface UserData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  scripts_id_array: string[];
  time_stamp: string;
  __v: number;
}

const ScriptsLibraryComponent: React.FC = () => {
  const [scriptList, setScriptList] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);
  const API_BASE_URL = getApiBaseUrl();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
        );
        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [API_BASE_URL]);

  useEffect(() => {
    const fetchScriptsData = async () => {
      if (userData && userData.scripts_id_array.length > 0) {
        const scriptIds = userData.scripts_id_array.join(",");
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/scripts/fetchScriptsById?ids=${scriptIds}`,
          );
          if (response.ok) {
            const data = await response.json();
            setScriptList(data);
          } else {
            console.error("Failed to fetch scripts data");
          }
        } catch (error) {
          console.error("Error fetching scripts data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchScriptsData();
  }, [userData, API_BASE_URL]);

  const handleSingleTap = (id: string) => {
    navigate(`/app/${id}`);
  };

  const handleDoubleTap = (script: Script) => {
    setSelectedScript(script);
    setIsEditModalVisible(true);
  };

  const handleScriptTap = (script: Script) => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
      setTapTimeout(null);
      handleDoubleTap(script);
    } else {
      const timeout = setTimeout(() => {
        handleSingleTap(script._id);
        setTapTimeout(null);
      }, 300);
      setTapTimeout(timeout);
    }
  };

  const handleEditClick = (script: Script) => {
    setSelectedScript(script);
    setIsEditModalVisible(true);
  };

  const handleAddScriptClick = () => {
    setIsAddScriptModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleCloseAddScriptModal = () => {
    setIsAddScriptModalVisible(false);
  };

  const handleEditScript = (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string,
  ) => {
    if (selectedScript) {
      setScriptList((prevList) =>
        prevList.map((script) =>
          script.title === selectedScript.title
            ? {
                ...script,
                title: newTitle,
                writtenBy: newWrittenBy,
                address: newAddress,
                phoneNumber: newPhoneNumber,
                dateModified: new Date().toISOString().split("T")[0],
              }
            : script,
        ),
      );
      setIsEditModalVisible(false);
    }
  };

  const handleAddScript = async (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string,
  ) => {
    if (userData) {
      const newScript = {
        title: newTitle,
        title_page: {
          title: newTitle,
          written_by: newWrittenBy,
          address: newAddress,
          phone_number: newPhoneNumber,
        },
        users_id: userData._id,
      };

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/scripts/createNewScript`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newScript),
          },
        );
        if (response.ok) {
          const savedScript = await response.json();
          setScriptList((prevList) => [savedScript.script, ...prevList]); // Add the new script to the top of the list
        } else {
          console.error("Failed to create new script");
        }
      } catch (error) {
        console.error("Error creating new script:", error);
      }
    }

    setIsAddScriptModalVisible(false);
  };

  const handleDeleteScript = () => {
    if (selectedScript) {
      setScriptList((prevList) =>
        prevList.filter((script) => script.title !== selectedScript.title),
      );
      setIsEditModalVisible(false);
    }
  };

  return (
    <div className={styles.scriptsLibraryComponent}>
      <div className={styles.scriptsLibraryContainer}>
        <div className={styles.addScriptContainer}>
          <div
            className={styles.addScriptContent}
            onClick={handleAddScriptClick}
          >
            <p className={styles.addScriptPlus}>+</p>
            <p className={styles.addScriptText}>Add Script</p>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          scriptList.map((script, index) => (
            <div
              className={styles.scriptContainer}
              key={index}
              onClick={() => handleScriptTap(script)}
            >
              <div className={styles.scriptIconsContainer}>
                <img
                  src={editIcon}
                  alt="Edit Icon"
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(script);
                  }}
                />
              </div>
              <img
                src={PageIcon1}
                alt="Script Icon"
                className={styles.scriptIconImage}
                onClick={(e) => {
                  e.stopPropagation();
                  handleScriptTap(script);
                }}
              />
              <p className={styles.scriptTitle}>{script.title}</p>
            </div>
          ))
        )}
      </div>
      {selectedScript && (
        <EditScriptModal
          isVisible={isEditModalVisible}
          onClose={handleCloseEditModal}
          onEdit={handleEditScript}
          onDelete={handleDeleteScript}
          title={selectedScript.title_page.title}
          writtenBy={selectedScript.title_page.written_by}
          address={selectedScript.title_page.address}
          phoneNumber={selectedScript.title_page.phone_number}
        />
      )}
      <AddScriptModal
        isVisible={isAddScriptModalVisible}
        onClose={handleCloseAddScriptModal}
        onAdd={handleAddScript}
      />
    </div>
  );
};

export default ScriptsLibraryComponent;

//////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import PageIcon1 from "../../assets/images/PageIcon1.png";
// import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
// import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
// import styles from "./ScriptsLibraryComponent.module.css";
// import editIcon from "../../assets/images/editIcon.png";

// interface Script {
//   [x: string]: any;
//   _id: string;
//   title: string;
//   writtenBy: string;
//   address: string;
//   phoneNumber: string;
//   dateCreated: string;
//   dateModified: string;
// }
// interface UserData {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   scripts_id_array: string[];
//   time_stamp: string;
//   __v: number;
// }

// const ScriptsLibraryComponent: React.FC = () => {
//   const [scriptList, setScriptList] = useState<Script[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);
//   const [selectedScript, setSelectedScript] = useState<Script | null>(null);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const API_BASE_URL = getApiBaseUrl();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
//         );
//         if (response.ok) {
//           const data: UserData = await response.json();
//           setUserData(data);
//         } else {
//           console.error("Failed to fetch user data");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [API_BASE_URL]);

//   useEffect(() => {
//     const fetchScriptsData = async () => {
//       if (userData && userData.scripts_id_array.length > 0) {
//         const scriptIds = userData.scripts_id_array.join(",");
//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/api/scripts/fetchScriptsById?ids=${scriptIds}`,
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setScriptList(data);
//           } else {
//             console.error("Failed to fetch scripts data");
//           }
//         } catch (error) {
//           console.error("Error fetching scripts data:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false); // Stop loading if there are no scripts
//       }
//     };

//     fetchScriptsData();
//   }, [userData, API_BASE_URL]);

//   const handleScriptClick = (id: string) => {
//     navigate(`/app/${id}`); // Redirect to App component with script ID
//   };

//   const handleEditClick = (script: Script) => {
//     setSelectedScript(script);
//     setIsEditModalVisible(true);
//   };

//   const handleAddScriptClick = () => {
//     setIsAddScriptModalVisible(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalVisible(false);
//   };

//   const handleCloseAddScriptModal = () => {
//     setIsAddScriptModalVisible(false);
//   };

//   const handleEditScript = (
//     newTitle: string,
//     newWrittenBy: string,
//     newAddress: string,
//     newPhoneNumber: string,
//   ) => {
//     if (selectedScript) {
//       setScriptList((prevList) =>
//         prevList.map((script) =>
//           script.title === selectedScript.title
//             ? {
//                 ...script,
//                 title: newTitle,
//                 writtenBy: newWrittenBy,
//                 address: newAddress,
//                 phoneNumber: newPhoneNumber,
//                 dateModified: new Date().toISOString().split("T")[0],
//               }
//             : script,
//         ),
//       );
//       setIsEditModalVisible(false);
//     }
//   };

//   const handleAddScript = async (
//     newTitle: string,
//     newWrittenBy: string,
//     newAddress: string,
//     newPhoneNumber: string,
//   ) => {
//     if (userData) {
//       const newScript = {
//         title: newTitle,
//         title_page: {
//           title: newTitle,
//           written_by: newWrittenBy,
//           address: newAddress,
//           phone_number: newPhoneNumber,
//         },
//         users_id: userData._id,
//       };

//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/scripts/createNewScript`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newScript),
//           },
//         );

//         if (response.ok) {
//           const savedScript = await response.json();
//           setScriptList((prevList) => [savedScript.script, ...prevList]); // Add the new script to the top of the list
//         } else {
//           console.error("Failed to create new script");
//         }
//       } catch (error) {
//         console.error("Error creating new script:", error);
//       }
//     }

//     setIsAddScriptModalVisible(false);
//   };

//   const handleDeleteScript = () => {
//     if (selectedScript) {
//       setScriptList((prevList) =>
//         prevList.filter((script) => script.title !== selectedScript.title),
//       );
//       setIsEditModalVisible(false);
//     }
//   };

//   return (
//     <div className={styles.scriptsLibraryComponent}>
//       <div className={styles.scriptsLibraryContainer}>
//         <div className={styles.addScriptContainer}>
//           <div
//             className={styles.addScriptContent}
//             onClick={handleAddScriptClick}
//           >
//             <p className={styles.addScriptPlus}>+</p>
//             <p className={styles.addScriptText}>Add Script</p>
//           </div>
//         </div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           scriptList.map((script, index) => (
//             <div className={styles.scriptContainer} key={index}>
//               <div className={styles.scriptIconsContainer}>
//                 <img
//                   src={editIcon}
//                   alt="Edit Icon"
//                   className={styles.icon}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEditClick(script);
//                   }}
//                 />
//               </div>
//               <img
//                 src={PageIcon1}
//                 alt="Script Icon"
//                 className={styles.scriptIconImage}
//                 onClick={() => handleScriptClick(script._id)}
//               />
//               <p className={styles.scriptTitle}>{script.title}</p>
//             </div>
//           ))
//         )}
//       </div>
//       {selectedScript && (
//         <EditScriptModal
//           isVisible={isEditModalVisible}
//           onClose={handleCloseEditModal}
//           onEdit={handleEditScript}
//           onDelete={handleDeleteScript}
//           title={selectedScript.title_page.title}
//           writtenBy={selectedScript.title_page.written_by}
//           address={selectedScript.title_page.address}
//           phoneNumber={selectedScript.title_page.phone_number}
//         />
//       )}
//       <AddScriptModal
//         isVisible={isAddScriptModalVisible}
//         onClose={handleCloseAddScriptModal}
//         onAdd={handleAddScript}
//       />
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;
