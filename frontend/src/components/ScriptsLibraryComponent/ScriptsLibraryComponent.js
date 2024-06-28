import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import PageIcon1 from "../../assets/images/MattPDFSCript1.png";
import EditScriptModal from "./modals/EditScriptModal/EditScriptModal";
import AddScriptModal from "./modals/AddScriptModal/AddScriptModal";
import { motion } from "framer-motion";
import styles from "./ScriptsLibraryComponent.module.css";
import axios from "axios";
const ScriptsLibraryComponent = () => {
    const [scriptList, setScriptList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddScriptModalVisible, setIsAddScriptModalVisible] = useState(false);
    const [selectedScript, setSelectedScript] = useState(null);
    const [userData, setUserData] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [tapTimeout, setTapTimeout] = useState(null);
    const API_BASE_URL = getApiBaseUrl();
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users/fetchUserById`, {
                params: { id: "664e8a1b8bd40eebdcc5939b" },
            });
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
        }
        catch (error) {
            // Fix: Add type annotation for error
            if (error.response) {
                console.error("Error fetching user data:", error.response.data);
            }
            else if (error.request) {
                console.error("No response received:", error.request);
            }
            else {
                console.error("Error setting up the request:", error.message);
            }
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, [API_BASE_URL]);
    console.log("LOOKSIE request to:", `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`);
    console.log("LOOKSIE Fetching user data from URL:", `${API_BASE_URL}/api/users/fetchUserById?id=664e8a1b8bd40eebdcc5939b`);
    console.log("LOOKSIE API Base URL Desktop:", import.meta.env.VITE_API_BASE_URL_DESKTOP);
    console.log("LOOKSIE API Base URL Mobile:", import.meta.env.VITE_API_BASE_URL_MOBILE);
    ////////test route
    // const fetchScenes = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com/api/scenes`,
    //     );
    //     console.log("HOW ABOUT THIS Response headers:", response.headers);
    //     console.log("HOW ABOUT THIS  Response body:", response.data);
    //   } catch (error: any) {
    //     // Typing error as any to handle response correctly
    //     console.error("HOW ABOUT THIS  Error fetching scenes:", error);
    //     if (error.response) {
    //       console.log(
    //         "HOW ABOUT THIS  Error response data:",
    //         error.response.data,
    //       );
    //       console.log(
    //         "HOW ABOUT THIS  Error response status:",
    //         error.response.status,
    //       );
    //       console.log(
    //         "HOW ABOUT THIS  Error response headers:",
    //         error.response.headers,
    //       );
    //     }
    //   }
    // };
    // useEffect(() => {
    //   fetchScenes();
    // }, []);
    const fetchScenes = async () => {
        try {
            const response = await axios.get("https://aqueous-fortress-42552-d35f4f194ee9.herokuapp.com/api/scenes");
            console.log("HOW YOU STINK THIS FOR THE SIMPLE Scenes SUCKAH MC:", response.data);
        }
        catch (error) {
            console.error("HOW ABOUT THIS Error fetching scenes:", error);
        }
    };
    useEffect(() => {
        fetchScenes();
    }, [API_BASE_URL]);
    // const fetchScenes = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/api/scenes`);
    //     console.log("HOW ABOUT THIS FOR THE SIMPLE Scenes:", response.data);
    //   } catch (error) {
    //     console.error("HOW ABOUT THIS Error fetching scenes:", error);
    //   }
    // };
    // useEffect(() => {
    //   fetchScenes();
    // }, [API_BASE_URL]);
    useEffect(() => {
        const fetchScriptsData = async () => {
            if (userData && userData.scripts_id_array.length > 0) {
                const scriptIds = userData.scripts_id_array.join(",");
                console.log("HOW ABOUT THIS scriptIds", scriptIds);
                try {
                    const response = await fetch(`${API_BASE_URL}/api/scenes/fetchScriptsById?ids=${scriptIds}`);
                    if (response.ok) {
                        const data = await response.json();
                        setScriptList(data);
                    }
                    else {
                        console.error("HOW ABOUT THIS Failed to fetch scripts data");
                    }
                }
                catch (error) {
                    console.error("HOW ABOUT THIS Error fetching scripts data:", error);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                setLoading(false);
            }
        };
        fetchScriptsData();
    }, [userData, API_BASE_URL]);
    const handleSingleTap = (id) => {
        navigate(`/app/${id}`);
    };
    const handleDoubleTap = (script) => {
        setSelectedScript(script);
        setIsEditModalVisible(true);
    };
    const handleScriptTap = (script) => {
        setClickCount((prevCount) => prevCount + 1);
        if (tapTimeout)
            clearTimeout(tapTimeout);
        const timeout = setTimeout(() => {
            if (clickCount === 1) {
                handleSingleTap(script._id);
            }
            else if (clickCount === 2) {
                handleDoubleTap(script);
            }
            setClickCount(0);
        }, 300);
        setTapTimeout(timeout);
    };
    const handleEditClick = (script) => {
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
    const handleEditScript = (newTitle, newWrittenBy, newAddress, newPhoneNumber) => {
        if (selectedScript) {
            setScriptList((prevList) => prevList.map((script) => script.title === selectedScript.title
                ? {
                    ...script,
                    title: newTitle,
                    writtenBy: newWrittenBy,
                    address: newAddress,
                    phoneNumber: newPhoneNumber,
                    dateModified: new Date().toISOString().split("T")[0],
                }
                : script));
            setIsEditModalVisible(false);
        }
    };
    const handleAddScript = async (newTitle, newWrittenBy, newAddress, newPhoneNumber) => {
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
                const response = await fetch(`${API_BASE_URL}/api/scenes/createNewScript`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newScript),
                });
                if (response.ok) {
                    const savedScript = await response.json();
                    setScriptList((prevList) => [savedScript.script, ...prevList]); // Add the new script to the top of the list
                }
                else {
                    console.error("Failed to create new script");
                }
            }
            catch (error) {
                console.error("Error creating new script:", error);
            }
        }
        setIsAddScriptModalVisible(false);
    };
    const handleDeleteScript = () => {
        if (selectedScript) {
            setScriptList((prevList) => prevList.filter((script) => script.title !== selectedScript.title));
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
    return (_jsx("div", { className: styles.wrapper, children: _jsxs("div", { className: styles.mainContainer, children: [_jsxs(motion.div, { className: styles.allScriptsContainer, variants: containerVariants, initial: "hidden", animate: "show", children: [_jsx("div", { className: styles.addScriptContainer, children: _jsxs("div", { className: styles.addScriptContent, onClick: handleAddScriptClick, children: [_jsx("p", { className: styles.addScriptPlus, children: "+" }), _jsx("p", { className: styles.addScriptText, children: "Create Script" })] }) }), loading ? (_jsx("p", { children: "Loading..." })) : (scriptList.map((script, index) => (_jsx(motion.div, { variants: scriptVariants, onClick: () => handleScriptTap(script), whileHover: {
                                scale: 1.03,
                                rotateY: 5,
                                transition: { type: "spring", stiffness: 300 },
                            }, children: _jsxs("div", { className: styles.inidvidualScriptsContainer, children: [_jsx("img", { src: PageIcon1, alt: "Script Icon", className: `${styles.scriptIconImage}`, onClick: (e) => {
                                            e.stopPropagation();
                                            handleScriptTap(script);
                                        } }), _jsx("p", { className: styles.scriptTitle, children: `${script.title}` })] }) }, index))))] }, JSON.stringify(scriptList)), selectedScript && (_jsx(EditScriptModal, { isVisible: isEditModalVisible, onClose: handleCloseEditModal, onEdit: handleEditScript, onDelete: handleDeleteScript, title: selectedScript.title_page.title, writtenBy: selectedScript.title_page.written_by, address: selectedScript.title_page.address, phoneNumber: selectedScript.title_page.phone_number })), _jsx(AddScriptModal, { isVisible: isAddScriptModalVisible, onClose: handleCloseAddScriptModal, onAdd: handleAddScript })] }) }));
};
export default ScriptsLibraryComponent;
