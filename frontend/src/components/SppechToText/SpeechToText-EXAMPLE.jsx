import React, { useState, useRef } from "react";
import axios from "axios";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [localAudioUrl, setLocalAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = () => {
    const mimeType = getSupportedMimeType();
    if (!mimeType) {
      console.error("No supported MIME type found for MediaRecorder");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = handleRecordingStop;
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing audio stream:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordingStop = () => {
    const mimeType = getSupportedMimeType();
    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
    audioChunksRef.current = []; // Clear the audioChunksRef array for next recording

    // Create a URL for the recorded audio to listen locally
    const audioUrl = URL.createObjectURL(audioBlob);
    setLocalAudioUrl(audioUrl);

    // Log the audio blob properties to verify its content
    console.log("Audio blob properties:", {
      size: audioBlob.size,
      type: audioBlob.type,
    });

    const formData = new FormData();
    formData.append("audio", audioBlob, "audio." + mimeType.split("/")[1]);
    formData.append("browser", getBrowser());

    // Upload the audio
    uploadAudio(formData);
  };

  const uploadAudio = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/speech-to-text",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setTranscript(response.data.transcription);
      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      console.error("Error uploading audio:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const getSupportedMimeType = () => {
    const mimeTypes = [
      "audio/webm",
      "audio/mp4",
      "audio/x-m4a",
      "audio/ogg",
      "audio/wav",
    ];
    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        return mimeType;
      }
    }
    return null;
  };

  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    } else if (
      userAgent.indexOf("Chrome") > -1 ||
      userAgent.indexOf("Opera") > -1
    ) {
      return "Chrome";
    } else {
      return "Other";
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <p>{transcript}</p>
      {audioUrl ? (
        <div>
          <p>Uploaded Audio:</p>
          <audio controls src={audioUrl}></audio>
        </div>
      ) : (
        localAudioUrl && (
          <div>
            <p>Local Recorded Audio:</p>
            <audio controls src={localAudioUrl}></audio>
          </div>
        )
      )}
    </div>
  );
};

export default SpeechToText;

////////////////////////////////////////

// import React, { useState, useRef } from "react";
// import axios from "axios";

// const SpeechToText = () => {
//   const [transcript, setTranscript] = useState("");
//   const [audioUrl, setAudioUrl] = useState("");
//   const [localAudioUrl, setLocalAudioUrl] = useState("");
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const startRecording = () => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         mediaRecorderRef.current = new MediaRecorder(stream, {
//           mimeType: "audio/webm",
//         });
//         mediaRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             audioChunksRef.current.push(event.data);
//           }
//         };
//         mediaRecorderRef.current.onstop = handleRecordingStop;
//         mediaRecorderRef.current.start();
//       })
//       .catch((error) => {
//         console.error("Error accessing audio stream:", error);
//       });
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }
//   };

//   const handleRecordingStop = () => {
//     const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//     audioChunksRef.current = []; // Clear the audioChunksRef array for next recording

//     // Create a URL for the recorded audio to listen locally
//     const audioUrl = URL.createObjectURL(audioBlob);
//     setLocalAudioUrl(audioUrl);

//     // Log the audio blob properties to verify its content
//     console.log("Audio blob properties:", {
//       size: audioBlob.size,
//       type: audioBlob.type,
//     });

//     const formData = new FormData();
//     formData.append("audio", audioBlob, "audio.webm");

//     // Upload the audio
//     uploadAudio(formData);
//   };

//   const uploadAudio = async (formData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/speech-to-text",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         },
//       );
//       setTranscript(response.data.transcription);
//       setAudioUrl(response.data.audioUrl);
//     } catch (error) {
//       console.error("Error uploading audio:", error);
//       if (error.response) {
//         console.error("Error response data:", error.response.data);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       <p>{transcript}</p>
//       {audioUrl ? (
//         <div>
//           <p>Uploaded Audio:</p>
//           <audio controls src={audioUrl}></audio>
//         </div>
//       ) : (
//         localAudioUrl && (
//           <div>
//             <p>Local Recorded Audio:</p>
//             <audio controls src={localAudioUrl}></audio>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default SpeechToText;

///////////////////////////////////

// import React, { useState, useEffect, useRef } from "react";

// const SpeechToText = () => {
//   const [text, setText] = useState("");
//   const [listening, setListening] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const recognitionRef = useRef(null);
//   const interimTranscriptRef = useRef("");

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert(
//         "Your browser does not support speech recognition. Please use a different browser.",
//       );
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       console.log("Speech recognition started");
//       setListening(true);
//       setErrorMessage("");
//     };

//     recognition.onresult = (event) => {
//       let interimTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           setText((prevText) => prevText + event.results[i][0].transcript);
//           interimTranscriptRef.current = ""; // Clear interim transcript on final result
//           console.log("Final transcript:", event.results[i][0].transcript);
//         } else {
//           interimTranscript += event.results[i][0].transcript;
//           console.log("Interim transcript:", interimTranscript);
//         }
//       }
//       interimTranscriptRef.current = interimTranscript;
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error", event);
//       if (event.error === "no-speech") {
//         setErrorMessage("No speech was detected. Please try again.");
//       } else {
//         setErrorMessage(`Error occurred in speech recognition: ${event.error}`);
//       }
//     };

//     recognition.onend = () => {
//       console.log("Speech recognition ended");
//       setListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.start();
//       console.log("Listening started");
//     } else {
//       console.error("Speech recognition instance not available");
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       console.log("Listening stopped");
//     } else {
//       console.error("Speech recognition instance not available");
//     }
//   };

//   return (
//     <div>
//       <h1>Speech to Text</h1>
//       <textarea
//         style={{ color: "red" }}
//         value={text + interimTranscriptRef.current}
//         readOnly
//         rows="10"
//         cols="50"
//       />
//       <br />
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       <button onClick={startListening} disabled={listening}>
//         Start Listening
//       </button>
//       <button onClick={stopListening} disabled={!listening}>
//         Stop Listening
//       </button>
//     </div>
//   );
// };

// export default SpeechToText;
