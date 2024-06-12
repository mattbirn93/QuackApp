import React, { useState, useEffect, useRef } from "react";

const SpeechToText = ({ recordingState, onSpeechText }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef(null);
  const interimTranscriptRef = useRef("");

  const createRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setListening(true);
      setErrorMessage("");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const finalTranscript = event.results[i][0].transcript;
          setText((prevText) => prevText + finalTranscript + ". ");
          interimTranscriptRef.current = ""; // Clear interim transcript on final result
          console.log("Final transcript:", finalTranscript);
        } else {
          interimTranscript += event.results[i][0].transcript;
          console.log("Interim transcript:", interimTranscript);
        }
      }
      interimTranscriptRef.current = interimTranscript;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      if (event.error === "no-speech") {
        setErrorMessage("No speech was detected. Please try again.");
      } else {
        setErrorMessage(`Error occurred in speech recognition: ${event.error}`);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
    };

    recognitionRef.current = recognition;
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support speech recognition. Please use a different browser.",
      );
      return;
    }

    createRecognition();
  }, []);

  useEffect(() => {
    console.log("recordingState:", recordingState);
    console.log("listening:", listening);

    if (recognitionRef.current) {
      if (recordingState === "start" && !listening) {
        console.log("Starting recognition");
        setText(""); // Reset text state when starting a new recording
        recognitionRef.current.start();
      } else if (recordingState === "stop" && listening) {
        console.log("Stopping recognition");
        recognitionRef.current.stop();
      }
    }
  }, [recordingState, listening]);

  useEffect(() => {
    if (recordingState === "stop" && listening) {
      // Manually handle the forceful stop and reset
      const handleForceStop = () => {
        if (recognitionRef.current) {
          console.log("Force stopping recognition");
          recognitionRef.current.abort();
          setListening(false);

          // Capitalize the first letter of the first word
          const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
          onSpeechText(capitalizedText); // Send the formatted text back to TipTap

          createRecognition();
        }
      };

      // Give a small timeout to ensure the onend event is handled properly
      setTimeout(handleForceStop, 100);
    }
  }, [recordingState, listening, text, onSpeechText]);

  return <div>{errorMessage && <p>{errorMessage}</p>}</div>;
};

export default SpeechToText;

///////////////////////////

// import React, { useState, useEffect, useRef } from "react";

// const SpeechToText = ({ recordingState, onSpeechText }) => {
//   const [text, setText] = useState("");
//   const [listening, setListening] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const recognitionRef = useRef(null);
//   const interimTranscriptRef = useRef("");

//   const createRecognition = () => {
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
//           const finalTranscript = event.results[i][0].transcript;
//           setText((prevText) => prevText + finalTranscript + ". ");
//           interimTranscriptRef.current = ""; // Clear interim transcript on final result
//           console.log("Final transcript:", finalTranscript);
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
//   };

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert(
//         "Your browser does not support speech recognition. Please use a different browser.",
//       );
//       return;
//     }

//     createRecognition();
//   }, []);

//   useEffect(() => {
//     console.log("recordingState:", recordingState);
//     console.log("listening:", listening);

//     if (recognitionRef.current) {
//       if (recordingState === "start" && !listening) {
//         console.log("Starting recognition");
//         setText(""); // Reset text state when starting a new recording
//         recognitionRef.current.start();
//       } else if (recordingState === "stop" && listening) {
//         console.log("Stopping recognition");
//         recognitionRef.current.stop();
//       }
//     }
//   }, [recordingState, listening]);

//   useEffect(() => {
//     if (recordingState === "stop" && listening) {
//       // Manually handle the forceful stop and reset
//       const handleForceStop = () => {
//         if (recognitionRef.current) {
//           console.log("Force stopping recognition");
//           recognitionRef.current.abort();
//           setListening(false);
//           onSpeechText(text); // Send the accumulated text back to TipTap
//           createRecognition();
//         }
//       };

//       // Give a small timeout to ensure the onend event is handled properly
//       setTimeout(handleForceStop, 100);
//     }
//   }, [recordingState, listening, text, onSpeechText]);

//   return <div>{errorMessage && <p>{errorMessage}</p>}</div>;
// };

// export default SpeechToText;
