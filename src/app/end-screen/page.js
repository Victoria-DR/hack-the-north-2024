import React from "react";
import Panel from "../_components/panel";
import Goose from "../../public/goose.png";
import Image from "next/image";
import Link from "next/link";

// Character picture map
const characterPictureMap = {
    "Goose": Goose,
    "Mastermind": Goose,
    "Aristotle": Goose,
    "Person4": Goose,
};


const OpponentSpeakingPage = ({character = "Goose"}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-yellow-100 from-10% via-sky-300 via-30% to-pink-400" >
            <div className="flex justify-center p-8 mb-4 rounded-full w-60">
                <Image className="" src={characterPictureMap[character]} alt="Goose"  />
            </div>
            <div className="flex flex-col justify-center w-2/3 p-8 pb-8 text-2xl text-black bg-white rounded font-unbound shadow-homeCard">
                <div className="flex justify-between">
                    <div>Creativity: 00</div>
                    <div>Logic: 00</div>
                    <div>Flow: 00</div>
                </div>
                <div className="pt-8 text-base text-center">You presented a unique perspective, favoring urban development over green spaces, which added a creative twist to the debate. However, your argument relied heavily on hyperbole, emphasizing the choice between nature and economic progress. While there is some truth to the potential economic benefits of urban infrastructure, your logic could have been more nuanced by acknowledging the value of green spaces in urban planning. Nonetheless, your writing flowed smoothly, capturing the essence of a passionate advocate for city development.</div>
            </div>
            <div className="flex justify-center w-full">
               <Link className="px-16 py-4 mt-8 text-lg text-center text-white bg-purple-900 rounded-md font-unbound" href="/">
                        Debate Again!
                </Link>
            </div>
        </div>
    );
};

export default OpponentSpeakingPage;
