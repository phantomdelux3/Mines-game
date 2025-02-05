type GameCardProps = {
    Loading: boolean;
  };

export default function ({ Loading }: GameCardProps){
    const isloading = Loading;

    return (<div className={`relative w-[6rem] h-[6rem] hover:-translate-y-[3px]  transition-all ease-in-out duration-100 ${isloading ? "animate-scaleLoop" : ""  } `}>
        <div className="absolute inset-0 bg-[#2f4553] w-[6rem] h-[6rem] text-center rounded-lg hover:bg-[#557086]  z-10">
        </div>
        <div className="absolute inset-0 bg-C1 w-[6rem] h-[6rem] text-center rounded-lg translate-y-[3px]">
        </div>
        
    </div>
    )
}