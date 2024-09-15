import Image from "next/image";
import logo from "../../public/logoHTN.png";
import Carousel from "../_components/carousel.jsx";

export default function Home() {
  return (
    <div className="items-center gap-16 p-8 pb-20 justify-items-center sm:p-20 bg-slate-100">
      
      <div className="flex justify-center w-full">
        <Image className="" src={logo} alt="Logo" width={100} height={100} />
      </div>
      <div className="py-4 text-2xl text-center text-black">
        Untitled Debate AI
      </div>
      <div className="w-full h-3/4">
        <Carousel />
      </div>
    
    </div>
  );
}
