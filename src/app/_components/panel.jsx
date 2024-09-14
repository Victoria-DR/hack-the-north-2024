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
        <div className="flex self-center justify-center w-2/3 bg-white rounded-lg h-2/3 shadow-homeCard">
            
            <div>
                <Image src={characterPictureMap[character]} alt="Goose" width={200} height={200} />
                <h1>{characterMap[character]} Speaking</h1>
                <p>This is the {character} speaking page.</p>
            </div>
        </div>
    );
}

export default panel;