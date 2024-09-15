"use client"; // Enables client-side rendering
import { useState, useEffect } from "react";
import Image from "next/image";
import { generateArgument } from "../_lib/cohere/cohereHelper";
import { textToSpeech } from "../_lib/aws/polly";
import Microphone from "../../public/microphone.png";

export default function UserSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false); // Checking if the user is speaking
  const [isRecognitionActive, setIsRecognitionActive] = useState(false); // To toggle the microphone on and off

  useEffect(() => {
    const getArgument = async () => {
      const argument = await generateArgument(
        localStorage.getItem("prompt"),
        localStorage.getItem("agent"),
        localStorage.getItem("side"),
      );
      const response = await textToSpeech(argument);
    };
    getArgument();
  }, []);

  return (
    <div className="z-30 flex flex-col items-center justify-center w-screen h-screen min-h-screen bg-gradient-to-l from-yellow-200 via-fuchsia-200 to-blue-200">
      <div className="items-center mb-6 text-6xl text-black font-unbound">
        Topic: [Placeholder Topic]
        <div
          className={`max-w-xs mx-auto pt-48 cursor-pointer ${
            isSpeaking
              ? "animate-gradient-flow bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-[length:200%_200%]"
              : ""
          }`}
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
    </div>
  );
}
