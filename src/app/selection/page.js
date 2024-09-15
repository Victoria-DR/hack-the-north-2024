"use client";

import { useEffect, useState } from "react";
import { generatePrompt } from "../_lib/cohere/cohereHelper.js";
import Carousel from "../_components/carousel.jsx";
import { Switch } from "@headlessui/react";

export default function Selection() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    if (enabled) {
      localStorage.setItem("side", "con");
    } else {
      localStorage.setItem("side", "pro");
    }
  };

  useEffect(() => {
    localStorage.setItem("side", "con");
    const getPrompt = async () => {
      const prompt = await generatePrompt(localStorage.getItem("theme"));
      localStorage.setItem("prompt", prompt);
    };
    getPrompt();
  }, []);

  return (
    <div className="items-center gap-16 p-8 pb-20 justify-items-center sm:p-20 bg-slate-100">
      <div className="flex justify-center w-full text-xl">
        <div className="mt-4 text-gray-700 font-unbound">Pick a Side</div>
      </div>
      <div className="flex justify-center w-full mt-4 text-gray-700">
        <div className="pr-4 text-xl font-unbound">Pro</div>
        <Switch
          checked={enabled}
          onChange={handleToggle}
          className={`${
            enabled ? "bg-purple-600" : "bg-blue-600"
          } relative inline-flex h-8 w-16 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? "translate-x-9" : "translate-x-1"
            } inline-block h-6 w-6 transform rounded-full bg-white transition`}
          />
        </Switch>
        <div className="pl-4 text-xl font-unbound">Con</div>
      </div>
      <div className="w-full h-3/4">
        <Carousel />
      </div>
    </div>
  );
}
