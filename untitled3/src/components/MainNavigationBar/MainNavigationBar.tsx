
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { FiLogOut } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import {authModalState} from "@/atoms/authModalAthoms";
import UserAuthenticated from "@/hooks/UserAuthenticated";
import LogoutAction from "@/hooks/LogoutAction";
import Timer from "@/components/Timer/Timer";


type MainBarProps = {
    problemPage?: boolean;
};

const MainNavigationBar: React.FC<MainBarProps> = ({ problemPage }) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await UserAuthenticated();
            setIsAuth(authStatus);
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await LogoutAction();
        setIsAuth(false);
        window.location.reload();
    };

    return (
        <nav
            className="relative flex justify-between h-[100px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
            <div className="flex w-full items-center justify-between">
                <Link href="/" className="flex items-center justify-start h-28">
                    <img src="/logo.png" alt="Coding and Learning" className="h-full"/>
                </Link>
                <div className="flex items-center space-x-4 flex-1 justify-start h-full ml-10">
                    <div className="cursor-pointer group relative h-full">
                        <Link href={`/`}
                              className="flex items-center  font-medium  text-gray-400 cursor-pointer
                              bg-dark-layer-1 h-full py-9 px-2 hover:text-white text-xl">
                            Problems
                        </Link>
                    </div>
                    <div className="cursor-pointer group relative h-full">
                        <Link href={`/exercises`}
                              className="flex items-center  font-medium  text-gray-400 cursor-pointer bg-dark-layer-1 h-full py-9 px-2 hover:text-white text-xl">
                            Exercises
                        </Link>

                    </div>
                    <div className="cursor-pointer group relative h-full">
                        <Link href={`/resources`}
                              className="flex items-center  font-medium  text-gray-400 cursor-pointer bg-dark-layer-1 h-full py-9 px-2 hover:text-white text-xl">
                            Resources
                        </Link>

                    </div>
                </div>
                {!isAuth && (
                    <div className="flex items-center space-x-4 flex-1 justify-end">
                        <Link href="/auth"
                              onClick={() => {
                                  setAuthModalState((prev) => ({
                                          ...prev, isOpen: true, type: "login"}));
                              }}
                              className="bg-blue-800 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                              border-2 border-transparent hover:text-blue-700 hover:bg-white hover:border-2
                              hover:border-blue-700 transition duration-400 ease-in-out">
                            Sign In
                        </Link>
                    </div>
                )}
                {isAuth && (
                    <div className="flex items-center space-x-4 flex-1 justify-end">
                        {problemPage && <Timer/>}
                        <div className="cursor-pointer group relative">
                            <img src="/avatar.png" alt="Avatar" width={50} height={150} className="rounded-full"/>
                            <div
                                className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange
                                p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                                <p className="text-sm"></p>
                            </div>
                        </div>
                        <button className="bg-blue-800 py-1.5 px-3 cursor-pointer rounded-md text-white"
                                onClick={handleLogout}>
                            <FiLogOut/>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MainNavigationBar;
