import Image from "next/image";
import logo from "../public/logoHTN.png";

export default function Home() {
  return (
    <div className="items-center min-h-screen gap-16 p-8 pb-20 justify-items-center sm:p-20 bg-slate-100">
      <div className="flex justify-center w-full">
        <Image className="" src={logo} alt="Logo" width={100} height={100} />
      </div>
      <div className="py-4 text-2xl text-center text-black">
        Untitled Debate AI
      </div>
       <label class="block w-full text-center text-2xl text-gray-700 font-unbound mb-2 mt-28" for="theme">
        I want to debate about...
      </label>
      <div className="flex justify-center">
        <input class=" shadow appearance-none border rounded py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none focus:shadow-outline w-2/3" id="theme" type="text" placeholder="Enter Theme..."></input>
      </div>
      
    </div>
  );
}
