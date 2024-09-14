
"use client";

import { useState, useEffect } from "react";
import CarouselPane from "./carouselpane";

const mod = (k, n) => {
  let res = k % n;
  if (res < 0) {
    return res + n;
  } else {
    return res;
  }
};

export const Carousel = () => {
  const [activePane, setActivePane] = useState(0);
  const [animateArrows, setAnimateArrows] = useState(-5);

  const carousel = [
    {
      title: "Goose",
      opponentDescription: [
        "Goose is enraged. Goose is angry.",
        "Goose is going to make this YOUR problem.",
        "Goose will tear you apart in person AND in debate."
        
      ],
      difficulty: "Hard",   
    },
    {
      title: "Elon Musk",
      opponentDescription: [
        "L + ratio",
        "L + ratio",
        "L + ratio",
        "L + ratio",

      ],
      difficulty: "Medium",
    },
    {
      title: "Aristotle",
      opponentDescription: [
        "In thyne eye there lay not a speck of philosophical wisdom.",
        "Your foolishness is matched only poor quality of the verbal spew you speak.",
        "Dare to challenge me, but such an ant will never understand the wisdom of the lion."
      ],
      difficulty: "Hard",
    },
    {
      title: "Person 4",
      opponentDescription: [
        "I am out of ideas Sobbing",
        "we can replace this later",
        "among us"
      ],
      difficulty: "Easy",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setAnimateArrows(-animateArrows);
    }, 1000);
  }, [animateArrows]);

  return (
    <div className="px-8 overflow-hidden sm:px-14">
      <div className="relative flex flex-col items-center justify-center w-full min-h-[480px]">
        {carousel.map((pane, id) => (
          <CarouselPane
            key={id}
            id={id}
            numPanes={carousel.length}
            activePane={activePane}
          >
            <div className="hidden space-y-4 sm:block">
              <h1 className="text-4xl">{pane.title}</h1>
              <br />
              {pane.opponentDescription.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="space-y-4 text-sm sm:hidden">
              <h1 className="text-3xl">{pane.title}</h1>
              Mobile Text
            </div>
          </CarouselPane>
        ))}
        <div className="absolute w-full max-w-4xl m-auto t-0 r-0 b-0 l-0 h-4/6 sm:h-3/5">
          <div className="relative z-40 w-full h-full">
            <button
              className="absolute text-6xl font-bold duration-1000 -left-40 text-fuchsia-900 top-1/2"
              style={{
                transform: `translate(${-animateArrows}px, -50%)`,
              }}
              onClick={() =>
                setActivePane(mod(activePane - 1, carousel.length))
              }
            >
              {"◀"}
            </button>
            <button
              className="absolute text-6xl font-bold duration-1000 -right-40 text-fuchsia-900 top-1/2"
              style={{
                transform: `translate(${-animateArrows}px, -50%)`,
              }}
              onClick={() =>
                setActivePane(mod(activePane + 1, carousel.length))
              }
            >
              {"▶"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;