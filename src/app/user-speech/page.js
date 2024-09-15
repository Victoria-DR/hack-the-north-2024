"use client"; // Enables client-side rendering

import { useState, useEffect, useRef } from "react";
import { putAudio, getText } from "../_lib/aws/s3";
import { textToSpeech } from "../_lib/aws/polly";
import Image from "next/image";
import Microphone from "../../public/microphone.png";

const mimeType = "audio/mp3";

export default function UserSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false); // Checking if the user is speaking
  const [isRecognitionActive, setIsRecognitionActive] = useState(false); // To toggle the microphone on and off

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [topic, setTopic] = useState("Loading...");
  const [text, setText] = useState("");

  useEffect(() => {
    setTopic(localStorage.getItem("prompt"));
    const getArgumentAudio = async () => {
      const response = await textToSpeech(localStorage.getItem("aiArgument"));
    };
    getArgumentAudio();
  }, []);

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
    <div className="z-30 flex flex-col items-center justify-center w-screen h-screen min-h-screen bg-gradient-to-l from-yellow-200 via-fuchsia-200 to-blue-200">
      <div className="items-center mb-6 text-6xl text-black font-unbound">
        Topic: {topic}
        <div
          className={`max-w-xs mx-auto pt-48 cursor-pointer ${
            isSpeaking
              ? "animate-gradient-flow bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-[length:200%_200%]"
              : ""
          }`}
        >
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          <button
            onClick={
              recordingStatus === "inactive" ? startRecording : stopRecording
            }
            type="button"
          >
            <Image src={Microphone} width={100} height={80} alt="Microphone" />
          </button>
        </div>
        <div className="pt-4 text-xl text-center text-black">
          {!isRecognitionActive
            ? "Click the microphone to start speaking..."
            : isSpeaking
              ? "Opponent is listening..."
              : "Start Speaking"}
        </div>
        <button onClick={getResult} type="button">
          Get Result
        </button>
        <div>{text}</div>
      </div>
    </div>
  );
}
