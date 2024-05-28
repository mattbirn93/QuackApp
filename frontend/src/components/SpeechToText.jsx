// // src/components/SpeechToText.jsx

// import React, { useState, useEffect } from 'react';

// const SpeechToText = () => {
//   const [text, setText] = useState('');
//   const [listening, setListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert(
//         'Your browser does not support speech recognition. Please use a different browser.'
//       );
//       return;
//     }

//     const newRecognition = new window.webkitSpeechRecognition();
//     newRecognition.continuous = true;
//     newRecognition.interimResults = true;
//     newRecognition.lang = 'en-US';

//     newRecognition.onstart = () => {
//       setListening(true);
//     };

//     newRecognition.onresult = (event) => {
//       let interimTranscript = '';
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           setText((prevText) => prevText + event.results[i][0].transcript);
//         } else {
//           interimTranscript += event.results[i][0].transcript;
//         }
//       }
//       setText((prevText) => prevText + interimTranscript);
//     };

//     newRecognition.onerror = (event) => {
//       console.error('Speech recognition error', event);
//     };

//     newRecognition.onend = () => {
//       setListening(false);
//     };

//     setRecognition(newRecognition);
//   }, []);

//   const startListening = () => {
//     if (recognition) {
//       recognition.start();
//     }
//   };

//   const stopListening = () => {
//     if (recognition) {
//       recognition.stop();
//     }
//   };

//   return (
//     <div>
//       <h1>Speech to Text</h1>
//       <textarea value={text} readOnly rows="10" cols="50" />
//       <br />
//       <button onClick={startListening} disabled={listening}>
//         Start Listening
//       </button>
//       <button
//         style={{ marginLeft: '2rem' }}
//         onClick={stopListening}
//         disabled={!listening}
//       >
//         Stop Listening
//       </button>
//     </div>
//   );
// };

// export default SpeechToText;

// src/components/SpeechToText.jsx

// src/components/SpeechToText.jsx

// src/components/SpeechToText.jsx

// src/components/SpeechToText.jsx

import React, { useState, useEffect, useRef } from 'react';

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null);
  const interimTranscriptRef = useRef('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(
        'Your browser does not support speech recognition. Please use a different browser.'
      );
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setListening(true);
      setErrorMessage('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setText((prevText) => prevText + event.results[i][0].transcript);
          interimTranscriptRef.current = ''; // Clear interim transcript on final result
          console.log('Final transcript:', event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
          console.log('Interim transcript:', interimTranscript);
        }
      }
      interimTranscriptRef.current = interimTranscript;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      if (event.error === 'no-speech') {
        setErrorMessage('No speech was detected. Please try again.');
      } else {
        setErrorMessage(`Error occurred in speech recognition: ${event.error}`);
      }
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      console.log('Listening started');
    } else {
      console.error('Speech recognition instance not available');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Listening stopped');
    } else {
      console.error('Speech recognition instance not available');
    }
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <textarea
        style={{ color: 'red' }}
        value={text + interimTranscriptRef.current}
        readOnly
        rows="10"
        cols="50"
      />
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
    </div>
  );
};

export default SpeechToText;
