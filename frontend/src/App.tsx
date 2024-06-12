import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import MyErrorBoundary from "./MyErrorBoundary";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader-EXAMPLE";
import { AppDataInterface } from "./interfaces/interfaces";
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
  const [description, setDescription] = useState("");
  const [testContent, setTestContent] = useState();
  const API_BASE_URL = getApiBaseUrl();

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/scenes/fetchScriptsFull?scriptId=6646be1cdca652f39dd85ba9`,
        );
        console.log(response, "response dude");
        setTestContent(response.data.content);
        // Assuming response.data has the structure { data: { content: "..." } }
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
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

  return (
    <MyErrorBoundary fallback={"There was an error"}>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="ProseBackground">
          <Tiptap
            initialContent={testContent}
            setDescription={setDescription}
          />
        </div>
      )}
    </MyErrorBoundary>
  );
};

export default App;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { io, Socket } from "socket.io-client";
// import MyErrorBoundary from "./MyErrorBoundary";
// import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader-EXAMPLE";
// import { AppDataInterface } from "./interfaces/interfaces";
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
//   const [description, setDescription] = useState("");
//   const [testContent, setTestContent] = useState<any[]>([])
//   const API_BASE_URL = getApiBaseUrl();

//   useEffect(() => {
//     const fetchData = async () => {
//       // Start Performance Now
//       const start = performance.now();

//       try {
//         console.log("API_BASE_URL:", API_BASE_URL);
//         const response = await axios.get(`${API_BASE_URL}/api/scenes/sceneVersionContent`, {
//           params: { scriptId: "666755841ac43b3698deabe2" }
//         });
//         const scriptContent =response.data[0].sceneVersionsDetails;
//         const scenesArray=[];
//         for (let i=0; i<response.data[0].sceneVersionsDetails.length; i++){
//           scenesArray.push(scriptContent[i].currentSceneVersionContent.content)
//         }

//         setTestContent(scenesArray);

//         console.log(scenesArray, "response here 2");
//       } catch (error: any) {
//         // End Performance Now
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
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const start = performance.now();

//       try {
//         console.log("API_BASE_URL:", API_BASE_URL);
//         const response = await axios.get(`${API_BASE_URL}/api/scenes/fetchfull`);
//         console.log(response, "response heres");
//         // setTestContent(response.data[0].content)
//         // Assuming response.data has the structure { data: { content: "..." } }
//         setData(response.data);
//         setLoading(false);
//       } catch (error: any) {
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
//       transports: ["websocket"],
//       rejectUnauthorized: false,
//     });

//     socketRef.current.on("connect", () => {
//       const socketConnectEnd = performance.now();
//       console.log(`Socket connected in ${socketConnectEnd - socketConnectStart} ms`);
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
//       console.error("Get scene version content error:", error);
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [API_BASE_URL]);

//   return (
//     <MyErrorBoundary fallback={"There was an error"}>
//       {loading ? (
//         <SkeletonLoader />
//       ) : (
//         <div>
//           {testContent.map(el=> <Tiptap initialContent={el} setDescription={setDescription} />
//  )}
//         </div>
//       )}
//     </MyErrorBoundary>
//   );
// };

// export default App;
