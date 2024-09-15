"use client";

import { useEffect, useState } from "react";
import Goose from "../../public/goose.png";
import Image from "next/image";
import Link from "next/link";

// Character picture map
const characterPictureMap = {
  Goose: Goose,
  Mastermind: Goose,
  Aristotle: Goose,
  Person4: Goose,
};

const OpponentSpeakingPage = ({ character = "Goose" }) => {
  const [creativityScore, setCreativityScore] = useState(0);
  const [logicScore, setLogicScore] = useState(0);
  const [flowScore, setFlowScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    setCreativityScore(localStorage.getItem("creativityScore"));
    setLogicScore(localStorage.getItem("logicScore"));
    setFlowScore(localStorage.getItem("flowScore"));
    setFeedback(localStorage.getItem("feedback"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-yellow-100 from-10% via-sky-300 via-30% to-pink-400">
      <div className="flex justify-center p-8 mb-4 rounded-full w-60">
        <Image className="" src={characterPictureMap[character]} alt="Goose" />
      </div>
      <div className="flex flex-col justify-center w-2/3 p-8 pb-8 text-2xl text-black bg-white rounded font-unbound shadow-homeCard">
        <div className="flex justify-between">
          <div>Creativity: {creativityScore}%</div>
          <div>Logic: {logicScore}%</div>
          <div>Flow: {flowScore}%</div>
        </div>
        <div className="pt-8 text-base text-center">{feedback}</div>
      </div>
      <div className="flex justify-center w-full">
        <Link
          className="px-16 py-4 mt-8 text-lg text-center text-white bg-purple-900 rounded-md font-unbound"
          href="/"
          onClick={() => window.localStorage.clear()}
        >
          Debate Again!
        </Link>
      </div>
    </div>
  );
};

export default OpponentSpeakingPage;
