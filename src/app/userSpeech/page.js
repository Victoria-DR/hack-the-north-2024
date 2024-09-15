"use client"; // Enables client-side rendering
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Microphone from "../../public/microphone.png";

export default function Home() {
  const [isSpeaking, setIsSpeaking] = useState(false); // Checking if the user is speaking
  const [isRecognitionActive, setIsRecognitionActive] = useState(false); // To toggle the microphone on and off

  return (
    <div className="flex flex-col items-center z-30 justify-center min-h-screen h-screen w-screen bg-gradient-to-l from-yellow-200 via-fuchsia-200 to-blue-200">
      <h1 className="text-6xl items-center font-regular text-black mb-6">
        Topic: [Placeholder Topic]
      </h1>
      <div
        className={`max-w-xs mx-auto pt-48 cursor-pointer ${
          isSpeaking
            ? "animate-gradient-flow bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-[length:200%_200%]"
            : ""
        }`}
      >
        <Image src={Microphone} width={100} height={80} alt="Microphone" />
      </div>

      <div className="text-center text-black text-xl pt-4">
        {!isRecognitionActive
          ? "Click the mic to start speaking"
          : isSpeaking
            ? "Opponent is listening..."
            : "Start Speaking"}
      </div>
    </div>
  );
}
