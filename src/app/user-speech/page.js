"use client"; // Enables client-side rendering

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { putAudio } from "../_lib/aws/s3";
import { textToSpeech } from "../_lib/aws/polly";
import Image from "next/image";
import Microphone from "../../public/microphone.png";
import Link from "next/link";

const mimeType = "audio/mp3";

export default function UserSpeech() {
  const router = useRouter();

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [topic, setTopic] = useState("Loading...");

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
      router.push("/opponent-speech");
    };
  };

  return (
    <div className="z-30 flex flex-col items-center justify-between w-screen h-screen min-h-screen bg-gradient-to-l from-yellow-200 via-fuchsia-200 to-blue-200">
      <div className="flex flex-col items-center w-full h-full mb-6 text-xl text-black font-unbound">
        <div className="px-32 mt-16 text-4xl">
        Topic: {topic}
        </div>
        <div className="flex flex-col justify-end w-full h-full min-h-max ">
          <div className="flex justify-center w-full">
            <Image src={Microphone} width={100} height={80} alt="Microphone" />
          </div>
          <div className={"max-w-xs mx-auto cursor-pointer"}>
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
              
            </button>
          
          </div>
        </div>
         <Link className="w-1/3 p-2 px-4 my-16 text-center text-white bg-purple-900 rounded-md z-100" href="/opponent-speech">End Debate</Link>
      </div>
    </div>
  );
}
