"use client";

import React  from "react";
import NavigationBar from "@/app/components/NavigationBar/page";
import AuthModal from "@/app/components/Modal/AuthModal";
import {useRecoilValue} from "recoil";
import {authModalState} from "@/app/atoms/authModalAthoms";

type Page = {

}

const AuthenticationPage:React.FC<Page> = () => {
    const authModal = useRecoilValue(authModalState)
    return (
        <div className={"bg-gradient-to-b from-white to-blue-800 h-screen relative"}>
            <div className={"max-w-7xl mx-auto"}>
                <NavigationBar/>
                <div className={"flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none"}>
                    aici o sa adaug ceva scris sau o imagine
                </div>
                {authModal.isOpen && <AuthModal/>}
            </div>
        </div>
    )
}
export default AuthenticationPage;