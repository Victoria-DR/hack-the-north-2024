"use client";

import Image from "next/image";
import logo from "../public/logoHTN.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (event) => {
    const themeChosen = document.getElementById("theme").value;
    localStorage.setItem("theme", themeChosen);
    event.preventDefault();
    router.push("/selection");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-100">
      <main className="flex-grow items-center gap-16 p-8 pb-20 justify-items-center sm:p-20">
        <div className="flex justify-center w-full">
          <Image className="" src={logo} alt="Logo" width={120} height={120} />
        </div>
        <div class="flex items-center justify-center mt-12">
          <h1 class="text-6xl font-unbound font-bold text-gray-800 mb-4 animate-fadeIn">
            deb(AI)te
          </h1>
        </div>

        <div>
          <p className="font-unbound py-4 text-2xl text-center text-black">
            A better and smarter way to win your arguments with the power of AI.
          </p>
          <label className="block w-full mb-2 text-2xl text-center text-gray-600 font-unbound ">
            Let’s get started! Please choose the theme of your debate.
          </label>
        </div>
        <div className="flex justify-center w-full pt-2">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              className="w-full font-unbound px-3 text-center py-2 text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="theme"
              type="text"
              placeholder="Enter your theme here"
            />
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-300 text-black py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="font-unbound text-sm text-center md:text-left">
            © 2024 Deb(AI)te All rights reserved.
          </div>

          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="font-unbound hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-unbound hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-unbound hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
