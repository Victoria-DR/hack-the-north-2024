"use client"; 

import Image from "next/image";
import logo from "../public/logoHTN.png";

import { useRouter } from 'next/navigation'


export default function Home() {
    const router = useRouter()

    const handleSubmit = event => {
        const themeChosen = document.getElementById('theme').value

        console.log(themeChosen);
        
        // go to selection
        event.preventDefault();
        router.push('/selection');

        }
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
        <input className="w-full px-3 py-2 text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="theme" type="text" placeholder="Enter Theme..."></input>
        </form>
      </div>
    </div>
  );
}
