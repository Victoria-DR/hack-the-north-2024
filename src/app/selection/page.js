"use client"; 

import Image from "next/image";
import logo from "../../public/logoHTN.png";
import Carousel from "../_components/carousel.jsx";
import {useState} from 'react';
import { Switch } from '@headlessui/react'

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <div className="items-center gap-16 p-8 pb-20 justify-items-center sm:p-20 bg-slate-100">
      <div className="flex justify-center w-full">
        <Image className="" src={logo} alt="Logo" width={100} height={100} />
      </div>
      <div className="py-4 text-2xl text-center text-black">
        Untitled Debate AI
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
                  enabled ? 'bg-purple-600' : 'bg-blue-600'
              } relative inline-flex h-8 w-16 items-center rounded-full`}
              >
               <span className="sr-only">Enable notifications</span>
                <span
                    className={`${
                    enabled ? 'translate-x-9' : 'translate-x-1'
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
