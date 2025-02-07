import GameCard from "./Component/GameCard";

export default function GameArea() {
  const handleOnclick = (index:number)=>{
    const loading = true
    
  };

  return (
    <div className="my-3 p-5 grid grid-cols-5 gap-x-3 gap-y-2 rounded-md bg-C1-dark">
      {Array.from({ length: 25 }).map((_, index) => (
        <GameCard 
        key={index}
        Loading = {false}
         />
      ))}
    </div>
  );
}
