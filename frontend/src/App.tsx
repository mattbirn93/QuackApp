import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import MyErrorBoundary from "./MyErrorBoundary";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader-EXAMPLE";
import CameraComponent from "./components/Camera/CameraComponent-EXAMPLE";
import LocationComponent from "./components/Location/LocationComponent-EXAMPLE";
import { AppDataInterface } from "./interfaces/interfaces";
import UserComponent from "./components/UserComponent--EXAMPLE";
import FramerComponent from "./components/Animation/FramerComponent-EXAMPLE";
import { Button } from "./components";
import Header from "./components/Header/Header-EXAMPLE";
import { set } from "mongoose";
import { Tiptap } from "./components/Tiptap";

const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return import.meta.env.VITE_API_BASE_URL_DESKTOP;
  } else {
    return import.meta.env.VITE_API_BASE_URL_MOBILE;
  }
};

const App: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);
  const [data, setData] = useState<AppDataInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [testMe, setTestMe] = useState<string>("TEST BUTTON IS NOT WORKING");
  const [isClicked, setIsClicked] = useState(false);
  const [description, setDescription] = useState("");

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const API_BASE_URL = getApiBaseUrl();

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        title: "Hello World",
        content: "This is a sample content.",
      });
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Start Performance Now
      const start = performance.now();

      try {
        console.log("API_BASE_URL:", API_BASE_URL);
        const response = await axios.post(`${API_BASE_URL}/api/users`, {
          first_name: "From front end UseEffect9",
          last_name: "From front end UseEffect9",
          email: "From front end UseEffect9@gmail.com",
          scripts_id_array: [],
        });

        //End Performance Now
        const end = performance.now();
        console.log(`Axios request took ${end - start} ms`);
        console.log("User added:", response.data);
      } catch (error: any) {
        //End Performance Now
        const end = performance.now();
        console.log(`Axios request took ${end - start} ms (with error)`);

        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  useEffect(() => {
    const socketConnectStart = performance.now();

    socketRef.current = io(API_BASE_URL, {
      transports: ["websocket"], // Force WebSocket transport
      rejectUnauthorized: false, // Accept self-signed certificates if using HTTPS
    });

    socketRef.current.on("connect", () => {
      const socketConnectEnd = performance.now();
      console.log(
        `Socket connected in ${socketConnectEnd - socketConnectStart} ms`,
      );
    });

    socketRef.current.on("content_item_created", (response) => {
      console.log("Content item created:", response);
    });

    socketRef.current.on("content_item_updated", (response) => {
      console.log("Content item updated:", response);
    });

    socketRef.current.on("scene_version_content", (response) => {
      console.log("Scene version content received:", response);
    });

    socketRef.current.on("delete_content_item", (response) => {
      console.log("Content item deleted:", response);
    });

    socketRef.current.on("update_content_item_error", (error) => {
      console.error("Update content item error:", error);
    });

    socketRef.current.on("create_content_item_error", (error) => {
      console.error("Create content item error:", error);
    });

    socketRef.current.on("delete_content_item_error", (error) => {
      console.error("Delete content item error:", error);
    });

    socketRef.current.on("get_scene_version_content", (error) => {
      console.error("Get scene version content  error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [API_BASE_URL]);

  const fetchSceneVersionContent = () => {
    if (socketRef.current) {
      const id = "66495227baa753a417fd5468"; // This should be replaced with the actual ID you want to query
      console.log("Emitting get_scene_version_content event with id:", id);
      socketRef.current.emit("get_scene_version_content", { id });
    }
  };

  const addUser = () => {
    const data = {
      first_name: "From front end websockets version Homie3",
      last_name: "From front end websockets version Homie3",
      email: "From front end websockets versionHomie3@gmail.com",
      scripts_id_array: [],
    };

    if (socketRef.current) {
      socketRef.current.emit("add_user", data);
      console.log("USER CREATED");
    }
  };

  const createContentItem = () => {
    const data = {
      id: "66495227baa753a417fd5468", // Replace with the actual ID
      contentItem: {
        notes: "Final test",
        text: "Test item text",
        type: "Test item type",
        time_stamp: new Date(),
      },
    };

    if (socketRef.current) {
      console.log("Emitting create_content_item event with data:", data);
      socketRef.current.emit("create_content_item", data);
    }
  };

  const updateContentItem = () => {
    const data = {
      id: "66495227baa753a417fd5468", // Replace with the actual ID
      contentItem: {
        notes: "This really worked five",
        text: "Test Update text",
        type: "Test Update type",
        content_id: "6656a1ae9e2949232a2ece0b", // Replace with the actual content_id
        time_stamp: new Date(),
      },
    };

    if (socketRef.current) {
      console.log("Emitting update_content_item event with data:", data);
      socketRef.current.emit("update_content_item", data);
    }
  };

  const deleteContentItem = (content_id: string) => {
    console.log("hi");
    const data = {
      id: "66495227baa753a417fd5468", // Replace with the actual ID
      content_id,
    };

    if (socketRef.current) {
      console.log("Emitting delete_content_item event to delete item:", data);
      socketRef.current.emit("delete_content_item", data);
    }
  };

  return (
    <MyErrorBoundary fallback={"There was an error"}>
      <div className="ProseBackground">
        <Tiptap setDescription={setDescription} />
      </div>
    </MyErrorBoundary>
  );
};

export default App;

/////////////////

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { io, Socket } from "socket.io-client";
// import MyErrorBoundary from "./MyErrorBoundary";
// import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader-EXAMPLE";
// import CameraComponent from "./components/Camera/CameraComponent-EXAMPLE";
// import LocationComponent from "./components/Location/LocationComponent-EXAMPLE";
// import SpeechToText from "./components/SpeechToText/SpeechToText-EXAMPLE";
// import { AppDataInterface } from "./interfaces/interfaces";
// import UserComponent from "./components/UserComponent--EXAMPLE";
// import FramerComponent from "./components/Animation/FramerComponent-EXAMPLE";
// import { Button } from "./components";
// import Header from "./components/Header/Header-EXAMPLE";
// import { set } from "mongoose";
// import { Tiptap } from "./components/Tiptap";

// const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return import.meta.env.VITE_API_BASE_URL_DESKTOP;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_MOBILE;
//   }
// };

// const App: React.FC = () => {
//   const socketRef = useRef<Socket | null>(null);
//   const [data, setData] = useState<AppDataInterface | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [testMe, setTestMe] = useState<string>("TEST BUTTON IS NOT WORKING");
//   const [isClicked, setIsClicked] = useState(false);
//   const [description, setDescription] = useState("");

//   const handleClick = () => {
//     setIsClicked(!isClicked);
//   };

//   const API_BASE_URL = getApiBaseUrl();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setData({
//         title: "Hello World",
//         content: "This is a sample content.",
//       });
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Start Performance Now
//       const start = performance.now();

//       try {
//         console.log("API_BASE_URL:", API_BASE_URL);
//         const response = await axios.post(`${API_BASE_URL}/api/users`, {
//           first_name: "From front end UseEffect9",
//           last_name: "From front end UseEffect9",
//           email: "From front end UseEffect9@gmail.com",
//           scripts_id_array: [],
//         });

//         //End Performance Now
//         const end = performance.now();
//         console.log(`Axios request took ${end - start} ms`);
//         console.log("User added:", response.data);
//       } catch (error: any) {
//         //End Performance Now
//         const end = performance.now();
//         console.log(`Axios request took ${end - start} ms (with error)`);

//         if (error.response) {
//           console.error("Error response:", error.response.data);
//         } else if (error.request) {
//           console.error("Error request:", error.request);
//         } else {
//           console.error("Error:", error.message);
//         }
//       }
//     };

//     fetchData();
//   }, [API_BASE_URL]);

//   useEffect(() => {
//     const socketConnectStart = performance.now();

//     socketRef.current = io(API_BASE_URL, {
//       transports: ["websocket"], // Force WebSocket transport
//       rejectUnauthorized: false, // Accept self-signed certificates if using HTTPS
//     });

//     socketRef.current.on("connect", () => {
//       const socketConnectEnd = performance.now();
//       console.log(
//         `Socket connected in ${socketConnectEnd - socketConnectStart} ms`,
//       );
//     });

//     socketRef.current.on("content_item_created", (response) => {
//       console.log("Content item created:", response);
//     });

//     socketRef.current.on("content_item_updated", (response) => {
//       console.log("Content item updated:", response);
//     });

//     socketRef.current.on("scene_version_content", (response) => {
//       console.log("Scene version content received:", response);
//     });

//     socketRef.current.on("delete_content_item", (response) => {
//       console.log("Content item deleted:", response);
//     });

//     socketRef.current.on("update_content_item_error", (error) => {
//       console.error("Update content item error:", error);
//     });

//     socketRef.current.on("create_content_item_error", (error) => {
//       console.error("Create content item error:", error);
//     });

//     socketRef.current.on("delete_content_item_error", (error) => {
//       console.error("Delete content item error:", error);
//     });

//     socketRef.current.on("get_scene_version_content", (error) => {
//       console.error("Get scene version content  error:", error);
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [API_BASE_URL]);

//   const fetchSceneVersionContent = () => {
//     if (socketRef.current) {
//       const id = "66495227baa753a417fd5468"; // This should be replaced with the actual ID you want to query
//       console.log("Emitting get_scene_version_content event with id:", id);
//       socketRef.current.emit("get_scene_version_content", { id });
//     }
//   };

//   const addUser = () => {
//     const data = {
//       first_name: "From front end websockets version Homie3",
//       last_name: "From front end websockets version Homie3",
//       email: "From front end websockets versionHomie3@gmail.com",
//       scripts_id_array: [],
//     };

//     if (socketRef.current) {
//       socketRef.current.emit("add_user", data);
//       console.log("USER CREATED");
//     }
//   };

//   const createContentItem = () => {
//     const data = {
//       id: "66495227baa753a417fd5468", // Replace with the actual ID
//       contentItem: {
//         notes: "Final test",
//         text: "Test item text",
//         type: "Test item type",
//         time_stamp: new Date(),
//       },
//     };

//     if (socketRef.current) {
//       console.log("Emitting create_content_item event with data:", data);
//       socketRef.current.emit("create_content_item", data);
//     }
//   };

//   const updateContentItem = () => {
//     const data = {
//       id: "66495227baa753a417fd5468", // Replace with the actual ID
//       contentItem: {
//         notes: "This really worked five",
//         text: "Test Update text",
//         type: "Test Update type",
//         content_id: "6656a1ae9e2949232a2ece0b", // Replace with the actual content_id
//         time_stamp: new Date(),
//       },
//     };

//     if (socketRef.current) {
//       console.log("Emitting update_content_item event with data:", data);
//       socketRef.current.emit("update_content_item", data);
//     }
//   };

//   const deleteContentItem = (content_id: string) => {
//     console.log("hi");
//     const data = {
//       id: "66495227baa753a417fd5468", // Replace with the actual ID
//       content_id,
//     };

//     if (socketRef.current) {
//       console.log("Emitting delete_content_item event to delete item:", data);
//       socketRef.current.emit("delete_content_item", data);
//     }
//   };

//   return (
//     <MyErrorBoundary fallback={"There was an error"}>
//       {loading ? (
//         <SkeletonLoader />
//       ) : (
//         <div className="custom-combined">
//           {/* <Header />
//           <h1 className="text-6xl font-bold text-primary mb-4">
//             Welcome to the Screenwriting App
//           </h1>
//           <Button />
//           <button
//             onClick={handleClick}
//             style={{ backgroundColor: isClicked ? "blue" : "gray" }}
//           >
//             Click me
//           </button>
//           <FramerComponent /> */}

//           <p>TIP TAP COMPONENT BELOW HERE:</p>
//           <Tiptap setDescription={setDescription} />
//           <div>Toxic Positivity is for Realzzzzzz</div>
//           <button
//             style={{ backgroundColor: isClicked ? "red" : "yellow" }}
//             title="Add User"
//             onClick={addUser}
//           >
//             Add User
//           </button>
//           <button onClick={updateContentItem}>Update Content Item</button>
//           <button onClick={fetchSceneVersionContent}>
//             Fetch Scene Version Content
//           </button>
//           <button onClick={createContentItem}>Create Content Item</button>
//           <button onClick={() => deleteContentItem("66568fe27c5d9f8bebb8f3f3")}>
//             Delete Content Item
//           </button>

//           <UserComponent />
//           <div>
//             <div>
//               {data && (
//                 <>
//                   <h1 className="text-[red]">{data.title}</h1>
//                   <p className="text-[red]">{data.content}</p>
//                 </>
//               )}
//             </div>
//             <div className="text-custom-red">
//               <div className="m-[var(--mXL)] p-[var(--padL)] text-fs1300">
//                 Hello World
//               </div>
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold mb-2">Example Component</h2>
//                 <p className="text-[purple]">
//                   This is an example component using Tailwind CSS.
//                 </p>
//                 <button className="custom-btn">Click Me</button>
//               </div>
//               <h1 className="text-[pink]">Camera and Location Access</h1>
//               <div className="mt-[10rem]">
//                 <CameraComponent />
//               </div>
//               <LocationComponent />
//               <div className="mt-[10rem]">
//                 <SpeechToText />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </MyErrorBoundary>
//   );
// };

// export default App;

///////////////////////////

//BELOW HERE IS THE CODE TO MEASURE WEBSOCKEt ROUTN TRIP TIME

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { io, Socket } from "socket.io-client";

// const getApiBaseUrl = () => {
//   const hostname = window.location.hostname;
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return import.meta.env.VITE_API_BASE_URL_DESKTOP;
//   } else {
//     return import.meta.env.VITE_API_BASE_URL_MOBILE;
//   }
// };

// const App: React.FC = () => {
//   const socketRef = useRef<Socket | null>(null);
//   const [apiResponseTime, setApiResponseTime] = useState<number | null>(null);
//   const [socketConnectTime, setSocketConnectTime] = useState<number | null>(
//     null,
//   );
//   const [messageRoundTripTime, setMessageRoundTripTime] = useState<
//     number | null
//   >(null);
//   const messageSendTimeRef = useRef<number | null>(null);

//   const API_BASE_URL = getApiBaseUrl();

//   useEffect(() => {
//     const fetchData = async () => {
//       const start = performance.now();
//       try {
//         console.log("API_BASE_URL:", API_BASE_URL);
//         const response = await axios.post(`${API_BASE_URL}/api/users`, {
//           first_name: "From front end UseEffect9",
//           last_name: "From front end UseEffect9",
//           email: "From front end UseEffect9@gmail.com",
//           scripts_id_array: [],
//         });
//         const end = performance.now();
//         setApiResponseTime(end - start);
//         console.log(`Axios request took ${end - start} ms`);
//         console.log("User added:", response.data);
//       } catch (error: any) {
//         const end = performance.now();
//         console.log(`Axios request took ${end - start} ms (with error)`);
//         setApiResponseTime(end - start);
//         if (error.response) {
//           console.error("Error response:", error.response.data);
//         } else if (error.request) {
//           console.error("Error request:", error.request);
//         } else {
//           console.error("Error:", error.message);
//         }
//       }
//     };

//     fetchData();
//   }, [API_BASE_URL]);

//   useEffect(() => {
//     const socketConnectStart = performance.now();

//     socketRef.current = io(API_BASE_URL, {
//       transports: ["websocket"],
//       rejectUnauthorized: false,
//     });

//     socketRef.current.on("connect", () => {
//       const socketConnectEnd = performance.now();
//       setSocketConnectTime(socketConnectEnd - socketConnectStart);
//       console.log(
//         `Socket connected in ${socketConnectEnd - socketConnectStart} ms`,
//       );
//     });

//     socketRef.current.on("message_ack", () => {
//       if (messageSendTimeRef.current !== null) {
//         const messageReceiveTime = performance.now();
//         setMessageRoundTripTime(
//           messageReceiveTime - messageSendTimeRef.current,
//         );
//         console.log(
//           `WebSocket message round trip took ${messageReceiveTime - messageSendTimeRef.current} ms`,
//         );
//         messageSendTimeRef.current = null; // Reset after measuring
//       }
//     });

//     socketRef.current.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [API_BASE_URL]);

//   const sendMessage = () => {
//     messageSendTimeRef.current = performance.now();
//     if (socketRef.current) {
//       socketRef.current.emit("add_user", {
//         first_name: "Jane",
//         last_name: "Doe",
//         email: "janedoe@example.com",
//         scripts_id_array: [],
//       });
//     }
//   };

//   return (
//     <div>
//       <h1>Performance Metrics</h1>
//       <p>
//         API Response Time:{" "}
//         {apiResponseTime !== null
//           ? `${apiResponseTime.toFixed(2)} ms`
//           : "Loading..."}
//       </p>
//       <p>
//         Socket Connect Time:{" "}
//         {socketConnectTime !== null
//           ? `${socketConnectTime.toFixed(2)} ms`
//           : "Loading..."}
//       </p>
//       <p>
//         WebSocket Message Round Trip Time:{" "}
//         {messageRoundTripTime !== null
//           ? `${messageRoundTripTime.toFixed(2)} ms`
//           : "Not measured yet"}
//       </p>
//       <button onClick={sendMessage}>Send WebSocket Message</button>
//     </div>
//   );
// };

// export default App;
