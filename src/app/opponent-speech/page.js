"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Panel from "../_components/panel";

const OpponentSpeakingPage = () => {
  const [topic, setTopic] = useState("Loading...");

  useEffect(() => {
    setTopic(localStorage.getItem("prompt"));
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-screen bg-gradient-to-b from-yellow-100 from-10% via-sky-300 via-30% to-pink-400">
      <div className="flex justify-center w-full px-32 pb-8 text-2xl text-black font-unbound ">
        Topic: {topic}
      </div>
      <Panel />
      <audio
        autoPlay
        src="https://hack-the-north-2024-audio.s3.amazonaws.com/aiNew.mp3"
      />
      <div className="flex justify-center w-full">
        <Link
          className="px-16 py-4 mt-8 text-lg text-center text-white bg-purple-900 rounded-md font-unbound"
          href="/end-screen"
        >
          Results
        </Link>
      </div>
    </div>
  );
};

export default OpponentSpeakingPage;
