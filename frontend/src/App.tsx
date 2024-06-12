import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import MyErrorBoundary from "./MyErrorBoundary";
import SkeletonLoader from "./components/SkeletonLoaderComponent/SkeletonLoaderComponent";
import { AppDataInterface } from "./interfaces/interfaces";
import { Tiptap } from "./components/TipTapComponent/TiptapComponent";

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
      <div className="ProseBackground">
        <Tiptap initialContent={testContent} setDescription={setDescription} />
      </div>
    </MyErrorBoundary>
  );
};

export default App;

///////////////////////////////

// import React from "react";
// import MyErrorBoundary from "./MyErrorBoundary";
// // import SkeletonLoader from "./components/SkeletonLoaderComponent/SkeletonLoaderComponent";
// import { Tiptap } from "./components/TipTapComponent/TiptapComponent";
// import useFetchData from "./hooks/useFetchData.js";

// const App: React.FC = () => {
//   const { data, loading, testContent, setDescription } = useFetchData();

//   return (
//     <MyErrorBoundary fallback={"There was an error"}>
//       <div className="ProseBackground">
//         <Tiptap initialContent={testContent} setDescription={setDescription} />
//       </div>
//     </MyErrorBoundary>
//   );
// };

// export default App;
