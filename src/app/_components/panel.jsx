import Link from "next/link";
import Goose from "../../public/goose.png";
import Image from "next/image";


// Character name map
const characterMap = {
    "Goose": "Goose Goose",
    "Mastermind": "Mastermind",
    "Aristotle": "Aristotle",
    "Person4": "Person 4",
};


// Character picture map
const characterPictureMap = {
    "Goose": Goose,
    "Mastermind": Goose,
    "Aristotle": Goose,
    "Person4": Goose,
};



const panel = ({character}) => {
    return (
        <div className="flex self-center justify-center w-2/3 text-black bg-white rounded-lg h-2/3 shadow-homeCard font-unbound">
            <div className="flex flex-col items-center justify-center justify-items-center">
                <div className="flex justify-center p-8 mb-4 bg-gray-200 rounded-full w-60">
                <Image className="" src={characterPictureMap[character]} alt="Goose"  />
                </div>
                <div className="mb-4 font-bold">{characterMap[character]}</div>
                <div className="px-24 text-base text-center">This is the {character} speaking transcript. The words the character will say appear here as they speak. The words the character will say appear here as they speak. The words the character will say appear here as they speak. The words the character will say appear here as they speak. The words the character will say appear here as they speak.  The words the character will say appear here as they speak. The words the character will say appear here as they speak. The words the character will say appear here as they speak.</div>
            </div>
        </div>
    );
}

export default panel;