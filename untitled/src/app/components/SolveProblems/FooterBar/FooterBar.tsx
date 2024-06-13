import React from "react";
import {BsChevronUp} from "react-icons/bs";

type FooterBarProps = {}
const FooterBar: React.FC<FooterBarProps> = () => {

    return (
        <div className={"flex bg-blue-300 rounded-xl  w-full mb-5 "}>
            <div className={"mx-5 my-[10px] flex justify-between w-full"}>
                <div className={"mr-2 flex flex-1 flex-nowrap items-center space-x-4"}>
                    <button
                        className={"px-3 py-1.5 font-medium items-center transition-all inline-flex bg-blue-500 text-sm hover:bg-blue-600 text-white rounded-lg pl-3 pr-2"}>
                        Console
                        <div className={" ml-1 transition transform flex items-center"}>
                            <BsChevronUp className={"fill-white mx-1 "}/>
                        </div>
                    </button>
                </div>
                <div className={"ml-auto flex items-center space-x-4"}>
                    <button
                        className={"px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"}>
                        Run
                    </button>
                    <button
                        className={"px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-green-600 hover:bg-green-700 text-white rounded-lg"}>
                        Submit
                    </button>

                </div>

            </div>
        </div>
    )
}

export default FooterBar;