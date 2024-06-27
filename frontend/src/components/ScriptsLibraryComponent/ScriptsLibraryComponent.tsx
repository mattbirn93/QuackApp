import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
import { motion } from "framer-motion";
import styles from "./ScriptsLibraryComponent.module.css";
import axios from "axios";
import { error } from "winston";

interface Script {
  title_page: any;
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
  const [clickCount, setClickCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);
  const API_BASE_URL = getApiBaseUrl();

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/fetchUserById`,
        {
          params: { id: "664e8a1b8bd40eebdcc5939b" },
        },
      );
      const contentType = response.headers["content-type"];
      if (!contentType || contentType.indexOf("application/json") === -1) {
        throw new Error("Expected JSON response, but received non-JSON data");
      }

      const data = response.data;
      if (typeof data !== "object" || Array.isArray(data)) {
        throw new Error("Expected JSON response, but received non-JSON data");
      }

      if (!Array.isArray(data.scripts_id_array)) {
        data.scripts_id_array = [];
      }

      setUserData(data);
      console.log("USER DATA", data);
    } catch (error: any) {
      // Fix: Add type annotation for error
      if (error.response) {
        console.error("Error fetching user data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [API_BASE_URL]);
  console.log(
    "LOOK BEFORE Making request to:",
    `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
  );

  console.log(
    "LOOK AFTER Fetching user data from URL:",
    `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
  );

  console.log(
    "API Base URL Desktop:",
    import.meta.env.VITE_API_BASE_URL_DESKTOP,
  );
  console.log("API Base URL Mobile:", import.meta.env.VITE_API_BASE_URL_MOBILE);

  ////////test route
  const fetchScenes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/scenes`);
      console.log("LOOKSIE HERE FOR THE SIMPLE Scenes:", response.data);
    } catch (error) {
      console.error("Error fetching scenes:", error);
    }
  };

  useEffect(() => {
    fetchScenes();
  }, [API_BASE_URL]);
  useEffect(() => {
    const fetchScriptsData = async () => {
      if (userData && userData.scripts_id_array.length > 0) {
        const scriptIds = userData.scripts_id_array.join(",");
        console.log("scriptIds", scriptIds);

        try {
          const response = await fetch(
            `${API_BASE_URL}/api/scenes/fetchScriptsById?ids=${scriptIds}`,
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
    setClickCount((prevCount) => prevCount + 1);
    if (tapTimeout) clearTimeout(tapTimeout);

    const timeout = setTimeout(() => {
      if (clickCount === 1) {
        handleSingleTap(script._id);
      } else if (clickCount === 2) {
        handleDoubleTap(script);
      }
      setClickCount(0);
    }, 300);

    setTapTimeout(timeout);
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
          `${API_BASE_URL}/api/scenes/createNewScript`,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scriptVariants = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <motion.div
          key={JSON.stringify(scriptList)} // Ensure the component remounts
          className={styles.allScriptsContainer}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className={styles.addScriptContainer}>
            <div
              className={styles.addScriptContent}
              onClick={handleAddScriptClick}
            >
              <p className={styles.addScriptPlus}>+</p>
              <p className={styles.addScriptText}>Create Script</p>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            scriptList.map((script, index) => (
              <motion.div
                key={index}
                variants={scriptVariants}
                onClick={() => handleScriptTap(script)}
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className={styles.inidvidualScriptsContainer}>
                  <img
                    src={PageIcon1}
                    alt="Script Icon"
                    className={`${styles.scriptIconImage}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScriptTap(script);
                    }}
                  />
                  <p className={styles.scriptTitle}>{`${script.title}`}</p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
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
    </div>
  );
};

export default ScriptsLibraryComponent;

////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
// import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
// import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
// import { motion } from "framer-motion";
// import styles from "./ScriptsLibraryComponent.module.css";
// import axios from "axios";

// interface Script {
//   title_page: any;
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
//   const [clickCount, setClickCount] = useState(0);
//   const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);
//   const API_BASE_URL = getApiBaseUrl();

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     try {
//   //       const response = await fetch(
//   //         `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
//   //       );

//   //       if (response.ok) {
//   //         const data: UserData = await response.json();
//   //         setUserData(data);
//   //         console.log("USER DATA", data);
//   //       } else {
//   //         console.error("Failed to fetch user data");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user data:", error);
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, [API_BASE_URL]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Using axios to make the HTTP request
//         const response = await axios.get(
//           `${API_BASE_URL}/api/users/fetchUserById`,
//           {
//             params: { id: "664e8a1b8bd40eebdcc5939b" },
//           },
//         );
//         // Axios embeds the response data inside the `data` attribute
//         const data = response.data;
//         if (data) {
//           setUserData(data);
//           console.log("USER DATA", data);
//         } else {
//           console.error("Failed to fetch user data");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [API_BASE_URL]); // Dependency array to trigger the effect when API_BASE_URL changes

//   console.log(
//     "LOOK HERE Making request to:",
//     `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
//   );

//   console.log(
//     "LOOK HERE Fetching user data from URL:",
//     `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
//   );

//   useEffect(() => {
//     const fetchScriptsData = async () => {
//       if (userData && userData.scripts_id_array.length > 0) {
//         const scriptIds = userData.scripts_id_array.join(",");
//         console.log("scriptIds", scriptIds);

//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/api/scenes/fetchScriptsById?ids=${scriptIds}`,
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
//         setLoading(false);
//       }
//     };
//     fetchScriptsData();
//   }, [userData, API_BASE_URL]);

//   const handleSingleTap = (id: string) => {
//     navigate(`/app/${id}`);
//   };

//   const handleDoubleTap = (script: Script) => {
//     setSelectedScript(script);
//     setIsEditModalVisible(true);
//   };

//   const handleScriptTap = (script: Script) => {
//     setClickCount((prevCount) => prevCount + 1);
//     if (tapTimeout) clearTimeout(tapTimeout);

//     const timeout = setTimeout(() => {
//       if (clickCount === 1) {
//         handleSingleTap(script._id);
//       } else if (clickCount === 2) {
//         handleDoubleTap(script);
//       }
//       setClickCount(0);
//     }, 300);

//     setTapTimeout(timeout);
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
//           `${API_BASE_URL}/api/scenes/createNewScript`,
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const scriptVariants = {
//     hidden: { opacity: 0, x: 100 },
//     show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } },
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.mainContainer}>
//         <motion.div
//           key={JSON.stringify(scriptList)} // Ensure the component remounts
//           className={styles.allScriptsContainer}
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//         >
//           <div className={styles.addScriptContainer}>
//             <div
//               className={styles.addScriptContent}
//               onClick={handleAddScriptClick}
//             >
//               <p className={styles.addScriptPlus}>+</p>
//               <p className={styles.addScriptText}>Create Script</p>
//             </div>
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             scriptList.map((script, index) => (
//               <motion.div
//                 key={index}
//                 variants={scriptVariants}
//                 onClick={() => handleScriptTap(script)}
//                 whileHover={{
//                   scale: 1.03,
//                   rotateY: 5,
//                   transition: { type: "spring", stiffness: 300 },
//                 }}
//               >
//                 <div className={styles.inidvidualScriptsContainer}>
//                   <img
//                     src={PageIcon1}
//                     alt="Script Icon"
//                     className={`${styles.scriptIconImage}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleScriptTap(script);
//                     }}
//                   />
//                   <p className={styles.scriptTitle}>{`${script.title}`}</p>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//         {selectedScript && (
//           <EditScriptModal
//             isVisible={isEditModalVisible}
//             onClose={handleCloseEditModal}
//             onEdit={handleEditScript}
//             onDelete={handleDeleteScript}
//             title={selectedScript.title_page.title}
//             writtenBy={selectedScript.title_page.written_by}
//             address={selectedScript.title_page.address}
//             phoneNumber={selectedScript.title_page.phone_number}
//           />
//         )}
//         <AddScriptModal
//           isVisible={isAddScriptModalVisible}
//           onClose={handleCloseAddScriptModal}
//           onAdd={handleAddScript}
//         />
//       </div>
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;

/////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
// import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
// import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
// import { motion } from "framer-motion";
// import styles from "./ScriptsLibraryComponent.module.css";

// interface Script {
//   title_page: any;
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
//   const [clickCount, setClickCount] = useState(0);
//   const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

//   const API_BASE_URL = getApiBaseUrl();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`,
//         );
//         if (response.status === 200) {
//           const data: UserData = response.data;
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
//         console.log("scriptIds", scriptIds);

//         try {
//           const response = await axios.get(
//             `${API_BASE_URL}/api/scenes/fetchScriptsById?ids=${scriptIds}`,
//           );
//           if (response.status === 200) {
//             const data = response.data;
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
//         setLoading(false);
//       }
//     };
//     fetchScriptsData();
//   }, [userData, API_BASE_URL]);

//   const handleSingleTap = (id: string) => {
//     navigate(`/app/${id}`);
//   };

//   const handleDoubleTap = (script: Script) => {
//     setSelectedScript(script);
//     setIsEditModalVisible(true);
//   };

//   const handleScriptTap = (script: Script) => {
//     setClickCount((prevCount) => prevCount + 1);
//     if (tapTimeout) clearTimeout(tapTimeout);

//     const timeout = setTimeout(() => {
//       if (clickCount === 1) {
//         handleSingleTap(script._id);
//       } else if (clickCount === 2) {
//         handleDoubleTap(script);
//       }
//       setClickCount(0);
//     }, 300);

//     setTapTimeout(timeout);
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
//         const response = await axios.post(
//           `${API_BASE_URL}/api/scenes/createNewScript`,
//           newScript,
//         );
//         if (response.status === 200) {
//           const savedScript = response.data;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const scriptVariants = {
//     hidden: { opacity: 0, x: 100 },
//     show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } },
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.mainContainer}>
//         <motion.div
//           key={JSON.stringify(scriptList)} // Ensure the component remounts
//           className={styles.allScriptsContainer}
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//         >
//           <div className={styles.addScriptContainer}>
//             <div
//               className={styles.addScriptContent}
//               onClick={handleAddScriptClick}
//             >
//               <p className={styles.addScriptPlus}>+</p>
//               <p className={styles.addScriptText}>Create Script</p>
//             </div>
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             scriptList.map((script, index) => (
//               <motion.div
//                 key={index}
//                 variants={scriptVariants}
//                 onClick={() => handleScriptTap(script)}
//                 whileHover={{
//                   scale: 1.03,
//                   rotateY: 5,
//                   transition: { type: "spring", stiffness: 300 },
//                 }}
//               >
//                 <div className={styles.inidvidualScriptsContainer}>
//                   <img
//                     src={PageIcon1}
//                     alt="Script Icon"
//                     className={`${styles.scriptIconImage}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleScriptTap(script);
//                     }}
//                   />
//                   <p className={styles.scriptTitle}>{`${script.title}`}</p>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//         {selectedScript && (
//           <EditScriptModal
//             isVisible={isEditModalVisible}
//             onClose={handleCloseEditModal}
//             onEdit={handleEditScript}
//             onDelete={handleDeleteScript}
//             title={selectedScript.title_page.title}
//             writtenBy={selectedScript.title_page.written_by}
//             address={selectedScript.title_page.address}
//             phoneNumber={selectedScript.title_page.phone_number}
//           />
//         )}
//         <AddScriptModal
//           isVisible={isAddScriptModalVisible}
//           onClose={handleCloseAddScriptModal}
//           onAdd={handleAddScript}
//         />
//       </div>
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;

///////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
// import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
// import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
// import { motion } from "framer-motion";
// import styles from "./ScriptsLibraryComponent.module.css";

// interface Script {
//   title_page: any;
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
//   const [clickCount, setClickCount] = useState(0);
//   const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

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
//         console.log("scriptIds", scriptIds);

//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/api/scenes/fetchScriptsById?ids=${scriptIds}`,
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
//         setLoading(false);
//       }
//     };
//     fetchScriptsData();
//   }, [userData, API_BASE_URL]);

//   const handleSingleTap = (id: string) => {
//     navigate(`/app/${id}`);
//   };

//   const handleDoubleTap = (script: Script) => {
//     setSelectedScript(script);
//     setIsEditModalVisible(true);
//   };

//   const handleScriptTap = (script: Script) => {
//     setClickCount((prevCount) => prevCount + 1);
//     if (tapTimeout) clearTimeout(tapTimeout);

//     const timeout = setTimeout(() => {
//       if (clickCount === 1) {
//         handleSingleTap(script._id);
//       } else if (clickCount === 2) {
//         handleDoubleTap(script);
//       }
//       setClickCount(0);
//     }, 300);

//     setTapTimeout(timeout);
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
//           `${API_BASE_URL}/api/scenes/createNewScript`,
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const scriptVariants = {
//     hidden: { opacity: 0, x: 100 },
//     show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } },
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.mainContainer}>
//         <motion.div
//           key={JSON.stringify(scriptList)} // Ensure the component remounts
//           className={styles.allScriptsContainer}
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//         >
//           <div className={styles.addScriptContainer}>
//             <div
//               className={styles.addScriptContent}
//               onClick={handleAddScriptClick}
//             >
//               <p className={styles.addScriptPlus}>+</p>
//               <p className={styles.addScriptText}>Create Script</p>
//             </div>
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             scriptList.map((script, index) => (
//               <motion.div
//                 key={index}
//                 variants={scriptVariants}
//                 onClick={() => handleScriptTap(script)}
//                 whileHover={{
//                   scale: 1.03,
//                   rotateY: 5,
//                   transition: { type: "spring", stiffness: 300 },
//                 }}
//               >
//                 <div className={styles.inidvidualScriptsContainer}>
//                   <img
//                     src={PageIcon1}
//                     alt="Script Icon"
//                     className={`${styles.scriptIconImage}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleScriptTap(script);
//                     }}
//                   />
//                   <p className={styles.scriptTitle}>{`${script.title}`}</p>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//         {selectedScript && (
//           <EditScriptModal
//             isVisible={isEditModalVisible}
//             onClose={handleCloseEditModal}
//             onEdit={handleEditScript}
//             onDelete={handleDeleteScript}
//             title={selectedScript.title_page.title}
//             writtenBy={selectedScript.title_page.written_by}
//             address={selectedScript.title_page.address}
//             phoneNumber={selectedScript.title_page.phone_number}
//           />
//         )}
//         <AddScriptModal
//           isVisible={isAddScriptModalVisible}
//           onClose={handleCloseAddScriptModal}
//           onAdd={handleAddScript}
//         />
//       </div>
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;

//////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
// // import PageIcon1 from "../../assets/images/PageIcon1.png";
// import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
// import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
// import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
// import styles from "./ScriptsLibraryComponent.module.css";
// // import editIcon from "../../assets/images/editIcon.png";

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
//   const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);
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
//         console.log("scriptIds", scriptIds);

//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/api/scenes/fetchScriptsById?ids=${scriptIds}`,
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
//         setLoading(false);
//       }
//     };
//     fetchScriptsData();
//   }, [userData, API_BASE_URL]);

//   const handleSingleTap = (id: string) => {
//     navigate(`/app/${id}`);
//   };

//   const handleDoubleTap = (script: Script) => {
//     setSelectedScript(script);
//     setIsEditModalVisible(true);
//   };

//   const handleScriptTap = (script: Script) => {
//     if (tapTimeout) {
//       clearTimeout(tapTimeout);
//       setTapTimeout(null);
//       handleDoubleTap(script);
//     } else {
//       const timeout = setTimeout(() => {
//         handleSingleTap(script._id);
//         setTapTimeout(null);
//       }, 300);
//       setTapTimeout(timeout);
//     }
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
//           `${API_BASE_URL}/api/scenes/createNewScript`,
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
//     <div className={styles.wrapper}>
//       <div className={styles.mainContainer}>
//         <div className={styles.allScriptsContainer}>
//           <div className={styles.addScriptContainer}>
//             <div
//               className={styles.addScriptContent}
//               onClick={handleAddScriptClick}
//             >
//               <p className={styles.addScriptPlus}>+</p>
//               <p className={styles.addScriptText}>Create Script</p>
//             </div>
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             scriptList.map((script, index) => (
//               <div key={index} onClick={() => handleScriptTap(script)}>
//                 <div className={styles.inidvidualScriptsContainer}>
//                   <img
//                     src={PageIcon1}
//                     alt="Script Icon"
//                     className={`${styles.scriptIconImage}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleScriptTap(script);
//                     }}
//                   />
//                   <p className={styles.scriptTitle}>{`${script.title}`}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         {selectedScript && (
//           <EditScriptModal
//             isVisible={isEditModalVisible}
//             onClose={handleCloseEditModal}
//             onEdit={handleEditScript}
//             onDelete={handleDeleteScript}
//             title={selectedScript.title_page.title}
//             writtenBy={selectedScript.title_page.written_by}
//             address={selectedScript.title_page.address}
//             phoneNumber={selectedScript.title_page.phone_number}
//           />
//         )}
//         <AddScriptModal
//           isVisible={isAddScriptModalVisible}
//           onClose={handleCloseAddScriptModal}
//           onAdd={handleAddScript}
//         />
//       </div>
//     </div>
//   );
// };

// export default ScriptsLibraryComponent;

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
