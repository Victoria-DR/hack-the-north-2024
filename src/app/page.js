"use client";

import Image from "next/image";
import logo from "../public/logoHTN.png";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();

  const handleSubmit = (event) => {
    const themeChosen = document.getElementById("theme").value;
    localStorage.setItem("theme", themeChosen);
    event.preventDefault();
    router.push("/selection");
  };

  return (
    <div className="items-center min-h-screen gap-16 p-8 pb-20 justify-items-center sm:p-20 bg-slate-100">
      <div className="flex justify-center w-full">
        <Image className="" src={logo} alt="Logo" width={100} height={100} />
      </div>
      <div className="py-4 text-2xl text-center text-black">
        Untitled Debate AI
      </div>
      <label className="block w-full mb-2 text-2xl text-center text-gray-700 font-unbound mt-28">
        I want to debate about...
      </label>
      <div className="flex justify-center w-full">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full px-3 py-2 text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="theme"
            type="text"
            placeholder="Enter Theme..."
          ></input>
        </form>
      </div>
      <div className="flex justify-center w-full text-xl">
        <div className="mt-4 text-gray-700 font-unbound">Pick a Side</div>
      </div>

      <div className="flex justify-center w-full mt-4 text-gray-700">
        <div className="pr-4 text-xl font-unbound">Pro</div>
        <Switch
          checked={enabled}
          onChange={setEnabled}
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
    </div>
  );
}
