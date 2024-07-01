import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MyErrorBoundary from "./MyErrorBoundary";
import { getApiBaseUrl } from "./utils/getApiBaseUrl";
import { Tiptap } from "./components/TipTapComponent/TiptapComponent";
import { useParams } from "react-router-dom";
const App = () => {
    const { scriptId } = useParams();
    const socketRef = useRef(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [testContent, setTestContent] = useState();
    const [characterArrayData, setCharacterArrayData] = useState([]);
    const [scriptName, setScriptName] = useState("");
    const API_BASE_URL = getApiBaseUrl();
    useEffect(() => {
        const fetchData = async () => {
            if (!scriptId) {
                console.error("No scriptId provided");
                return;
            }
            console.log("scriptId from useParams:", scriptId);
            const start = performance.now();
            try {
                const response = await axios.get(`${API_BASE_URL}/api/scenes/fetchScriptsFull?scriptId=${scriptId}`);
                console.log("API response:", response);
                setTestContent(response.data.content);
                setCharacterArrayData(response.data.characters);
                setData(response.data);
                setScriptName(response.data.title);
                setLoading(false);
            }
            catch (error) {
                const end = performance.now();
                console.log(`Axios request took ${end - start} ms (with error)`);
                if (error.response) {
                    console.error("Error response:", error.response.data);
                }
                else if (error.request) {
                    console.error("Error request:", error.request);
                }
                else {
                    console.error("Error:", error.message);
                }
            }
        };
        fetchData();
    }, [API_BASE_URL, scriptId]);
    return (_jsx(MyErrorBoundary, { fallback: "There was an error", children: _jsx("div", { children: _jsx(Tiptap, { initialContent: testContent, setDescription: setDescription, scriptId: scriptId, characterArray: characterArrayData, scriptName: scriptName }) }) }));
};
export default App;
