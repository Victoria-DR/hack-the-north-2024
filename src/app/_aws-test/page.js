"use client";

import { useState, useRef } from "react";
import { putAudio, getText } from "../_lib/aws/s3";
import { textToSpeech } from "../_lib/aws/polly";

const mimeType = "audio/mp3";

export default function AWS() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [text, setText] = useState("");
  const [aiAudio, setAiAudio] = useState(false);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      putAudio("user.mp3", audioBlob);
    };
  };

  const getResult = () => {
    setText(getText());
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <div className="audio-controls">
        {!permission ? (
          <button onClick={getMicrophonePermission} type="button">
            Get Microphone
          </button>
        ) : null}
        {permission && recordingStatus === "inactive" ? (
          <button onClick={startRecording} type="button">
            Start Recording
          </button>
        ) : null}
        {recordingStatus === "recording" ? (
          <button onClick={stopRecording} type="button">
            Stop Recording
          </button>
        ) : null}
      </div>
      <h2>Transcription</h2>
      <button onClick={getResult} type="button">
        Get Result
      </button>
      <div>{text}</div>
      <h2>Text to Speech</h2>
      <button onClick={() => textToSpeech(text)} type="button">
        Use Polly
      </button>
      <button onClick={() => setAiAudio(true)} type="button">
        Get Audio
      </button>
      {aiAudio ? (
        <audio
          controls
          src="https://hack-the-north-2024-audio.s3.amazonaws.com/ai.mp3"
        />
      ) : null}
    </div>
  );
}
