import React, {useState} from "react";
import {useSetRecoilState} from "recoil";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {authModalState} from "@/atoms/authModalAthoms";
import LoginAction from "@/hooks/LoginAction";


const BASE_URL = 'http://localhost:8080'

type LoginProps = {}
const Login:React.FC<LoginProps> = () => {

    const router = useRouter();
    const setAuthModal = useSetRecoilState(authModalState)
    const [inputs, setInputs] = useState(
        {
            email:'',
            password:''
        })

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    };

    const SwitchToForgotModal = () => {
        setAuthModal((prev) => ({...prev, type: "forgotPassword"}));
    };

    const SwitchToRegisterModal = () => {
        setAuthModal((prev) => ({...prev, type: "register"}));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        if(!inputs.email || !inputs.password )
        {
            toast.error("Please fill all the fields", {position: "top-center", autoClose: 3000})
            e.preventDefault();
        }
        else {
            e.preventDefault();
            const userData = {
                "email": inputs.email,
                "password": inputs.password,
            }
            const response = await fetch(`${BASE_URL}/secure/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const json_response = await response.text();
            await LoginAction(json_response)
            if (response.ok) {
                router.push('/')
               toast.success("Login success.", {position: "top-center", autoClose: 3000})

            } else {
                toast.error(json_response, {position: "top-center", autoClose: 3000})
            }
        }
    };

    return (
        <form className={"space-y-6 px-6 py-4"} onSubmit={handleLogin}>
            <h3 className={"text-xl font-medium text-white"}>
                Sign In
            </h3>
            <div>
                <label htmlFor={"email"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Enter Your Email
                </label>
                <input type={"email"}
                       name={"email"}
                       id={"email"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"email@something.com"}/>
            </div>
            <div>
                <label htmlFor={"password"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Enter Your Password
                </label>
                <input type={"password"}
                       name={"password"}
                       id={"password"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"**************"}/>
            </div>

            <button type={"submit"} className={"w-full text-white focus:ring-blue-300 font-medium text-sm py-2.5 text-center bg-blue-700 rounded-lg hover:bg-blue-900"}>
                Login
            </button>
            <button className={"flex w-full justify-end"} onClick={SwitchToForgotModal}>
                <a href={"#"} className={"text-sm block text-blue-700 hover:underline w-full text-right"}>Forgot password</a>
            </button>
            <div className={"text-sm font-medium text-gray-300"}>
                Not Registered?{"  "}
                <a href={"#"} className={"text-blue-700 hover:underline"} onClick={SwitchToRegisterModal}>
                    Create account
                </a>
            </div>
        </form>
    )
}

export default Login;