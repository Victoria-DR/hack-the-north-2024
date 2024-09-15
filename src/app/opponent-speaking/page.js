import React from "react";
import Panel from "../_components/panel";
import Image from "next/image";
import Microphone from "../../public/microphone.png";
// src/public/microphone.png

const OpponentSpeakingPage = ({topic}) => {
    return (
        <div className="flex flex-col justify-center w-full h-screen bg-gradient-to-b from-yellow-100 from-10% via-sky-300 via-30% to-pink-400" >
            <div className="flex justify-center w-full pb-8 text-2xl text-black font-unbound">Topic: topic goes here blahblah {topic}</div>
            <Panel character="Goose" topic="test" />
            {/* <div className="flex justify-center pt-8 blur-sm">
                <Image src={Microphone} alt="Microphone" width={80} /></div> */}
        </div>
    );
};

export default OpponentSpeakingPage;
