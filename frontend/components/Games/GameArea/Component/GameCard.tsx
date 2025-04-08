type GameCardProps = {
    Loading: boolean;
    Status: boolean;
    onClick: () => void;
  };
  
  export default function GameCard({ Loading, Status, onClick }: GameCardProps) {
    return (
      <div
        onClick={onClick} // Handle click event
        className={`relative w-[6rem] h-[6rem] cursor-pointer 
          ${Loading ? "animate-scaleLoop" : ""}`}
      >
        {/* Foreground Layer */}
        <div className="absolute inset-0 bg-[#2f4553] w-[6rem] h-[6rem] text-center flex items-center justify-center rounded-lg hover:bg-[#557086] z-10">
          {Loading ? "Loading..." : Status ? "Win" : "Lose"}
        </div>
  
        {/* Background Layer */}
        <div className="absolute inset-0 bg-C1 w-[6rem] h-[6rem] text-center rounded-lg translate-y-[3px]"></div>
      </div>
    );
  }
  