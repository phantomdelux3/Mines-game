"use client"
import { useRouter } from "next/navigation"

export function GamesSection(){
    const router = useRouter()

    const handleMinesClick = ()=>{
        router.push("mines")
    }
    return (
        <div className="mt-5">
            <div>
                <div onClick={handleMinesClick} className="bg-black w-[7rem] h-[10rem] hover:bg-black/50 active:bg-black/50 rounded-md flex justify-center items-center">
                    Mines
                </div>
            </div>
        </div>
    )
}