
export default function Header() {
    return (
        <div className="bg-C1 drop-shadow-lg shadow-black py-3 px-2" >
            <div className="mx-auto md:max-w-[1200px] px-[3vw] flex justify-between">
                <div className="flex justify-center items-center text-2xl">
                    Casino
                </div>
                <div>
                    <button className="justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]  text-sm leading-none py-[0.9375rem] px-[1.25rem]">
                        Login
                    </button>
                    <button className="justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] px-[1.25rem]">
                        Register
                    </button>
                </div>
            </div>
            
        </div>
    )
}