
"use client";

import { useState, useEffect } from "react";
import CarouselPane from "./carouselpane";
import Goose from "../../public/goose.png";
import Link from 'next/link';
import Image from "next/image";


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
        "Goose is angry.",
        "Goose will make this YOUR problem.",
        "Goose will tear you apart in person AND in debate."
        
      ],
      imgLink: Goose,
      difficulty: "???",   
    },
    {
      title: "Mastermind",
      opponentDescription: [
        "L + ratio",
        "L + ratio",
        "L + ratio",

      ],
      imgLink: Goose,
      difficulty: "Medium",
    },
    {
      title: "Aristotle",
      opponentDescription: [
        "You lack wisdom.",
        "Your foolishness is matched only poor quality of the verbal spew you speak.",
      ],
      imgLink: Goose,
      difficulty: "Hard",
    },
    {
      title: "Person 4",
      opponentDescription: [
        "I am out of ideas Sobbing",
        "we can replace this later",
        "among us"
      ],
      imgLink: Goose,
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
      <div className="relative flex flex-col items-center justify-center w-full min-h-[480px] text-sm">
        {carousel.map((pane, id) => (
          <CarouselPane
            key={id}
            id={id}
            numPanes={carousel.length}
            activePane={activePane}
          >
            <div className="hidden space-y-4 sm:block font-unbound">
              <h1 className="text-4xl text-center font-unbound">{pane.title}</h1>
              <div className="mt-32">
                <Image className="absolute right-0 w-48" src={pane.imgLink} alt="Goose" />
              </div>
              <br />
              <div className="w-2/3">
              {pane.opponentDescription.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              </div>
              <div className="flex justify-between w-full pt-8">
                <div className="pt-4 align-text-bottom">Difficulty: {pane.difficulty}</div>
                <Link className="w-1/2 p-2 px-4 text-center text-white bg-purple-900 rounded-md z-100" href="/opponent-speaking">
                        Start Debate
                </Link>
                </div>
            </div>
            <div className="space-y-4 text-sm sm:hidden">
              <h1 className="text-3xl">{pane.title}</h1>
              Mobile Text
            </div>
          </CarouselPane>
        ))}
        <div className="absolute w-full max-w-4xl m-auto t-0 r-0 b-0 l-0 h-4/6 sm:h-3/5">
          <div className="relative z-40 w-full h-2/3">
            <button
              className="absolute bottom-0 text-6xl font-bold duration-1000 -left-40 text-fuchsia-900"
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
              className="absolute bottom-0 text-6xl font-bold duration-1000 -right-40 text-fuchsia-900"
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