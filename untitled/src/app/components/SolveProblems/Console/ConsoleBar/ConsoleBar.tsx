import React from "react";
import {AiOutlineSetting} from "react-icons/ai";

type ConsoleBarProps = {}
const ConsoleBar: React.FC<ConsoleBarProps> = () => {

    return (
        < div className={" flex items-center justify-between bg-blue-400 h-11 rounded-t"}>
            <button className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}>
                <div className={"flex items-center px-1"}>
                    <div className={"text-xs text-white"}>
                        JavaScript
                    </div>
                </div>
            </button>

            <div className={"flex items-center m-2"}>
                <button
                    className={"relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline ml-auto p-1 mr-2 hover:bg-blue-400 group"}>
                    <div className={" h-4 2-4 text-green-50 font-bold text-lg"}>
                        <AiOutlineSetting/>
                    </div>
                    <div
                        className={"absolute text-sm rounded w-auto bg-blue-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100"}>
                        Settings
                    </div>
                </button>

                <button
                    className={"relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline ml-auto p-1 mr-2 hover:bg-blue-400 group"}>
                    <div className={" h-4 2-4 text-green-50 font-bold text-lg"}>
                        <AiOutlineSetting/>
                    </div>
                    <div
                        className={"absolute text-sm rounded w-auto bg-blue-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100"}>
                        FullScreen
                    </div>
                </button>

            </div>
        </div>
    )
}

export default ConsoleBar;