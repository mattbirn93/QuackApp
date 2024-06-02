import React, { useState, useEffect } from "react";

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

const AudioRecorder: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  console.log("audioUrl:", audioUrl);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        // Save the transcript to a server or database here if needed
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Error occurred in recognition: ", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition service disconnected");
        setIsRecording(false);
      };

      if (isRecording) {
        recognition.start();
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
          recorder.start();
          recorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
          };
        });
      } else {
        recognition.stop();
        mediaRecorder?.stop();
      }
    } else {
      console.error("Speech Recognition is not supported in this browser.");
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    setTranscript("");
    setAudioChunks([]);
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);

        // Upload the audioBlob to a server here if needed
        // Example: using fetch to send the blob to your server
        // fetch('/save-audio', {
        //     method: 'POST',
        //     body: audioBlob,
        // });
      };
    }
  };

  return (
    <div>
      <h1>Speech Recognition and Recording</h1>
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recognition and Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <p>Transcript: {transcript}</p>
      {audioUrl && (
        <div>
          <h2>Recorded Audio:</h2>
          <audio src={audioUrl} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
