"use client"; // Enables client-side rendering

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [seconds, setSeconds] = useState(30); // Start countdown from 30
  const [isActive, setIsActive] = useState(true); // Tracks if the timer is active (running)

  // Effect to handle the countdown logic
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval); // Stop the timer if inactive
    }

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [isActive, seconds]); // Depend on both 'isActive' and 'seconds'

  // Function to stop the timer
  const stopTimer = event => {
    setIsActive(false);

    // go to selection
    event.preventDefault();
    router.push('/opponent-speaking');

  };

  return (
    <div className="z-20 flex flex-col items-center justify-center w-screen h-screen min-h-screen bg-gradient-to-l from-yellow-200 via-fuchsia-200 to-blue-200">
      
      <h1 className="mb-6 text-black text-7xl font-unbound">
        Prepare your speech
      </h1>
      <h1 className="text-8xl tracking-[0.17em] text-black font-unbound font-bold mb-4">
        {formatTime(seconds)}
      </h1>
      

      {/* Stop Button */}
      <button
        onClick={stopTimer}
        className="px-6 py-2 font-semibold text-black bg-purple-300 rounded-lg hover:bg-purple-800 hover:text-white"
      >
        Start Debate
      </button>
      {seconds === 0 && (
        <h2 className="pt-8 text-3xl font-semibold text-black">
          Prep over! Debate starts now!
        </h2>
      )}
      {/* <div class="text-center text-black text-2xl pt-28">
        Tips: Lorem Ipsum dolor frances ino bun pancake
        <br />
        french fries
      </div> */}
      <div className="items-center mt-32 mb-6 text-6xl text-black font-unbound">
        Topic: [Placeholder Topic]
      </div>
      <div className="" src="src/public/microphone.png"></div>
    </div>
  );
}

// Format the time to display in minutes:seconds format
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
