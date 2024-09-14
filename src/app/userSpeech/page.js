export default function userSpeech() {
  return (
    <div className="w-96 h-96 relative bg-white rounded-3xl">
      <img
        className="w-40 h-40 left-[552px] top-[200px] absolute rounded-full shadow border border-[#666666]"
        src="https://via.placeholder.com/158x158"
      />
      <img
        className="w-24 h-24 left-[30px] top-[15px] absolute"
        src="https://via.placeholder.com/90x90"
      />
      <div className="w-40 h-40 left-[559px] top-[566px] absolute">
        <div className="w-11 h-20 left-[59.27px] top-[32.40px] absolute bg-gradient-to-b from-[#da39e4] via-[#7ddffe] to-[#fff390] rounded-2xl" />
        <img
          className="w-40 h-40 left-0 top-0 absolute"
          src="https://via.placeholder.com/162x162"
        />
      </div>
      <div className="w-96 h-48 left-[154px] top-[321px] absolute text-center text-[#340737] text-6xl font-bold font-['Red Hat Display']">
        Topic: Why Python is better than Java
      </div>
      <div className="w-96 h-24 left-[463px] top-[755px] absolute text-center text-black text-2xl font-normal font-['Noto Sans Bengali UI']">
        Your Opponent is listening...
      </div>
    </div>
  );
}
