import React from "react";
import Panel from "../_components/panel";


const OpponentSpeakingPage = ({topic}) => {
    return (
        <div className="flex flex-col justify-center w-full h-screen bg-slate-200" >
            <div className="flex justify-center w-full pb-8 text-xl text-black">Topic: topic goes here blahblah {topic}</div>
            <Panel character="Goose" topic="test" />
        </div>
    );
};

export default OpponentSpeakingPage;
