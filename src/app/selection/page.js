"use client";

import { useEffect } from "react";
import Carousel from "../_components/carousel.jsx";
import { generatePrompt } from "../_lib/cohere/cohereHelper.js";

export default function Selection() {
  1;
  useEffect(() => {
    const getPrompt = async () => {
      const prompt = await generatePrompt(localStorage.getItem("theme"));
      localStorage.setItem("prompt", prompt);
    };
    getPrompt();
  }, []);

  return (
    <div className="items-center gap-16 p-8 pb-20 justify-items-center sm:p-20 bg-slate-100">
      <div className="w-full h-3/4">
        <Carousel />
      </div>
    </div>
  );
}
