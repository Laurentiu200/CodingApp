

import React  from "react";
import Link from "next/link";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAthoms";

type NavbarProps = {

}

const NavigationBar:React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleOpenSignInModal = () =>  {
        setAuthModalState((prev) => ({...prev, isOpen: true}))
    };

    return (
        <div className={"flex items-center justify-between sm:px12 px-2 md:px-24"}>
            <Link href={"/"} className={"flex items-center justify-center h-24"}>
                <img src={"/logo.png"} alt={"Coding and Learning"} className={"h-full"}/>
            </Link>
            <div className={"flex items-center"}>
                <button className={"bg-blue-800 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent hover:text-blue-700 hover:bg-white hover:border-2 hover:border-blue-700 transition duration-400 ease-in-out"}
                        onClick={handleOpenSignInModal}>
                    Sign In
                </button>
            </div>
        </div>
    )
}
export default NavigationBar;