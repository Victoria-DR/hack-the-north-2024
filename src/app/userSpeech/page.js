"use client"; // Enables client-side rendering
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Microphone from "../../public/microphone.png";

export default function Home() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false); // Detect if mic input is detected
  const [isRecognitionActive, setIsRecognitionActive] = useState(false); // Toggle recognition
  const recognitionRef = useRef(null); // To store recognition instance

  useEffect(() => {
    // Web Speech API for speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true; // Keep detecting continuously
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("Voice recognition started");
    };

    recognition.onresult = (event) => {
      if (event.results[0].isFinal) {
        const transcript = event.results[0][0].transcript;
        setIsSpeaking(false); // No longer speaking when final input is detected
        playBackVoice(transcript); // Play back the recognized speech
      } else {
        setIsSpeaking(true); // Speaking detected
        console.log("I can hear you"); // Log this whenever speech is detected
      }
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false); // Stop listening if an error occurs
    };

    recognition.onend = () => {
      setIsListening(false); // Stop listening when recognition ends
    };

    recognitionRef.current = recognition; // Save recognition instance in ref

    return () => recognition.abort(); // Cleanup on unmount
  }, []);

  // Function to toggle speech recognition when microphone is clicked
  const toggleRecognition = () => {
    if (isRecognitionActive) {
      recognitionRef.current.stop(); // Stop recognition if it's active
      setIsListening(false);
    } else {
      recognitionRef.current.start(); // Start recognition if it's inactive
      setIsListening(true);
    }
    setIsRecognitionActive(!isRecognitionActive); // Toggle recognition state
  };

  // Function to play back the recognized speech using SpeechSynthesis API
  const playBackVoice = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div className="z-30 flex flex-col items-center justify-center w-screen h-screen min-h-screen bg-gradient-to-l from-yellow-200 via-fuchsia-200 to-blue-200">
      <div className="items-center mb-6 text-6xl text-black font-unbound">
        Topic: [Placeholder Topic]
      </div>

      {/* Microphone with click event to toggle recognition */}
      <div
        className={`max-w-xs mx-auto pt-48 cursor-pointer ${isSpeaking ? "animate-gradient-flow bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-[length:200%_200%]" : ""}`}
        onClick={toggleRecognition}
      >
        <Image src={Microphone} width={100} height={80} alt="Microphone" />
      </div>

      <div className="pt-4 text-xl text-center text-black">
        {!isRecognitionActive
          ? "Click the mic to start speaking"
          : isSpeaking
            ? "Opponent is listening..."
            : "Start Speaking"}
      </div>
    </div>
  );
}
