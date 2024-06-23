
import React  from "react";
import {useRecoilValue} from "recoil";
import {authModalState} from "@/atoms/authModalAthoms";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import AuthModal from "@/components/Modal/AuthModal";


type Index = {

}

const AuthenticationPage:React.FC<Index> = () => {
    const authModal = useRecoilValue(authModalState)
    return (
        <div className={"bg-gradient-to-b from-white to-blue-800 h-screen relative"}>
            <div className={"max-w-7xl mx-auto"}>
                <NavigationBar/>
                <div
                    className={"flex-col items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none"}>
                    <div className={"flex justify-center mt-10 text-blue-900 font-bold"}>
                        <p className={"text-2xl"}>Develop your coding skills with us!</p>
                    </div>
                    <div className={"flex justify-center mt-5 text-blue-900 text-lg font-semibold"}>
                        <p>
                            Learn with the help of resources, test your knowledge through quizzes and show us your
                            skills by
                            solving problems.</p>
                    </div>
                    <div className={"flex justify-center mt-5"}>
                        <img src="/authPageImage.jpeg" alt="Avatar" width={700} height={700} className="rounded-full"/>
                    </div>
                </div>
                {authModal.isOpen && <AuthModal/>}
            </div>
        </div>
    )
}
export default AuthenticationPage;