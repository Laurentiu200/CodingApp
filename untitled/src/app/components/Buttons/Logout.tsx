import React from "react";
import {FiLogOut} from "react-icons/fi";
import LogoutAction from "@/app/actions/LogoutAction";
import {useRouter} from "next/navigation";


type LogoutProps = {

}
const Logout: React.FC<LogoutProps> = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await LogoutAction()
    };
    return (
        <button  className={"bg-blue-800 py-1.5 px-3 cursor-pointer rounded-md text-white" } onClick={handleLogout}>
            <FiLogOut/>
        </button>
    )
}

export default Logout;