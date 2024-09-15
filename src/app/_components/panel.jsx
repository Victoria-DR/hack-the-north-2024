"use client";

import { useEffect, useState } from "react";
import { generateFeedback } from "../_lib/cohere/cohereHelper";
import Goose from "../../public/goose.png";
import Image from "next/image";
import { getText } from "../_lib/aws/s3";
import Adam from "../../public/adam.png";
import Brian from "../../public/brian.png";

// Character name map
const characterMap = {
  Goose: "Goose Goose",
  Mastermind: "Mastermind",
  Aristotle: "Aristotle",
  Adam: "Adam",
};

// Character picture map
const characterPictureMap = {
  Goose: Goose,
  Mastermind: Brian,
  Aristotle: Adam,
  Adam: Adam,
};

export default function panel () {
  // eslint-disable-next-line no-unused-vars
  const [agent, setAgent] = useState("Goose"); // eslint-disable-line
  // eslint-disable-next-line no-unused-vars
  const [aiTranscript, setAiTranscript] = useState("Loading..."); // eslint-disable-line

  // eslint-disable-next-line no-unused-vars
  useEffect(() => { // eslint-disable-line
    setAgent(localStorage.getItem("agentName"));
    setAiTranscript(localStorage.getItem("aiArgument"));
    const getFeedback = async () => {
      const userArgument = await getText();
      localStorage.setItem("userArgument", userArgument);
      const feedback = await generateFeedback(localStorage.getItem("prompt"), userArgument, localStorage.getItem("aiArgument"));
      localStorage.setItem("creativity", JSON.parse(feedback).creativity);
      localStorage.setItem("logic", JSON.parse(feedback).logic);
      localStorage.setItem("flow", JSON.parse(feedback).flow);
      localStorage.setItem("feedback", JSON.parse(feedback).feedback);
    };
    getFeedback();
  }, []);

  return (
    <div className="flex self-center justify-center w-2/3 text-black bg-white rounded-lg h-2/3 shadow-homeCard font-unbound">
      <div className="flex flex-col items-center justify-center justify-items-center">
        <div className="flex justify-center p-8 mb-4 border-8 border-gray-200 rounded-full w-60">
          <Image
            className="rounded"
            src={characterPictureMap[agent]}
            alt="agent"
          />
        </div>
        <div className="mb-4 font-bold">{characterMap[agent]}</div>
        <div className="px-24 text-sm text-center">
          {aiTranscript}
        </div>
      </div>
    </div>
  );
};

//export default panel;
