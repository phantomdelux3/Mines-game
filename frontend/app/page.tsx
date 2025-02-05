import GameArea from "@/components/GameArea/GameArea";
import mine from "@/public/mine.svg"
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-C1">
      <div className="text-7xl font-semibold">
        Mines
      </div>
      <div>
        <GameArea/>
      </div>
    </div>
  );
}
