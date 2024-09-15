"use client";

import { useState } from "react";
import {
  generatePrompt,
  generateArgument,
  generateFeedback,
} from "../_lib/cohere/cohereHelper";

export default function Cohere() {
  const userArgument =
    "Well, well, my dear opponents, let me enlighten you on why investing in green spaces and community gardens is a rather... *unfruitful* endeavor! Urban areas are bustling hubs of innovation and progress, and we must prioritize development over, erm, daisies and dandelions. You see, cities are the engines of economic growth, and every square foot of land is valuable real estate. Converting these precious spaces into gardens or parks could hinder the potential for high-rise buildings, shopping malls, or even futuristic transport systems! By focusing on greenery, we might miss out on the next big tech hub or commercial center, which could boost the local economy and create jobs. So, let's not get sidetracked by the allure of nature when we can build a brighter, more prosperous future with concrete and steel!";
  const [prompt, setPrompt] = useState("");
  const [agent, setAgent] = useState({
    name: "Mastermind",
    personality: "dorky",
    difficulty: 9,
  });
  const [side, setSide] = useState("");
  const [aiArgument, setAiArgument] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div>
      <h1>Debate</h1>
      <h2>Prompt</h2>
      <button onClick={async () => setPrompt(await generatePrompt())}>
        Generate Prompt
      </button>
      {prompt && <p>{prompt}</p>}
      <h2>Choose a side:</h2>
      <button onClick={() => setSide("con")}>Pro</button>
      <button onClick={() => setSide("pro")}>Con</button>
      <h2>AI Argument</h2>
      <button
        onClick={async () =>
          setAiArgument(await generateArgument(prompt, agent, side))
        }
      >
        Generate Argument
      </button>
      {aiArgument && <p>{aiArgument}</p>}
      <h2>Feedback</h2>
      <button
        onClick={async () =>
          setFeedback(await generateFeedback(prompt, userArgument, aiArgument))
        }
      >
        Generate Feedback
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}
