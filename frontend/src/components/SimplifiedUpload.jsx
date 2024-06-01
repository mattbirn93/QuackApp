import React, { useState } from "react";
import axios from "axios";

const SimpleFileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        // "http://192.168.0.211:5001/upload",
        // "http://192.168.0.211:5001/upload",
        "https://localhost:5001/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Error uploading file: " + err.message);
      if (err.response) {
        console.error("Error response data:", err.response.data);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SimpleFileUpload;

//////////////

// import React, { useState } from "react";
// import axios from "axios";

// const SimpleFileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       setError("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       console.log("HELLO SIR");
//       const response = await axios.post(
//         "http://localhost:5001/upload",
//         // "http://192.168.0.211:5001/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         },
//       );
//       setMessage(response.data.message);
//     } catch (err) {
//       console.error("Error uploading file:", err);
//       setError("Error uploading file: " + err.message);
//       if (err.response) {
//         console.error("Error response data:", err.response.data);
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload File</button>
//       {message && <p>{message}</p>}
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default SimpleFileUpload;
