import React, {useState} from "react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/app/atoms/authModalAthoms";
import {useRouter} from "next/navigation";
import {IoCloseCircleOutline} from "react-icons/io5";
import ErrorMessage from "@/app/components/ErrorMessage/ErrorMessage";
import LoginAction from "@/app/actions/LoginAction";
import {toast} from "react-toastify";

const BASE_URL = 'http://localhost:8080'

type RegisterProps = {


}
const Register: React.FC<RegisterProps> = () => {
    const router = useRouter();
    const setAuthModal = useSetRecoilState(authModalState)
    const [inputs, setInputs] = useState(
        {
            email:'',
            lastName:'',
            firstName:'',
            username:'',
            password:''
        })

    const SwitchToLoginModal = () => {
        setAuthModal((prev) => ({...prev, type: "login"}));
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        if(!inputs.email || !inputs.password || !inputs.lastName || !inputs.firstName || !inputs.username)
        {
            toast.error("Please fill all the fields", {position: "top-center", autoClose: 3000})
            e.preventDefault();
        }
        else {


            e.preventDefault();
            const userData = {
                "firstName": inputs.firstName,
                "lastName": inputs.lastName,
                "email": inputs.email,
                "password": inputs.password,
            }

            const response = await fetch(`${BASE_URL}/secure/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)

            })


            const json_response = await response.text();
            await LoginAction(json_response);
            console.log(json_response);
            if (response.ok) {
                router.push('/')
                toast.success("Account created.", {position: "top-center", autoClose: 3000})
            } else {
                toast.error(json_response, {position: "top-center", autoClose: 3000})
            }
        }
    };


    return (
        <form className={"space-y-6 px-6 py-4"} onSubmit={handleRegister}>

            <h3 className={"text-xl font-medium text-white"}>
                Register
            </h3>
            <div>
                <label htmlFor={"email"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Email
                </label>
                <input type={"email"}
                       name={"email"}
                       id={"email"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"email@something.com"}/>
            </div>
            <div>
                <label htmlFor={"first-name"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    First Name
                </label>
                <input type={"text"} name={"firstName"} id={"first-name"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"Laurentiu"}/>
            </div>
            <div>
                <label htmlFor={"last-name"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Last Name
                </label>
                <input type={"text"} name={"lastName"} id={"last-name"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"Borza"}/>
            </div>
            <div>
                <label htmlFor={"username"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Username
                </label>
                <input type={"text"} name={"username"} id={"username"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"Lborza"}/>
            </div>
            <div>
                <label htmlFor={"password"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Enter Your Password
                </label>
                <input type={"password"} name={"password"} id={"password"}
                       onChange={handleChangeValue}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-black"}
                       placeholder={"**************"}/>
            </div>

            <button type={"submit"}
                    className={"w-full text-white focus:ring-blue-300 font-medium text-sm py-2.5 text-center bg-blue-700 rounded-lg hover:bg-blue-900"}>
                Register
            </button>
            <div className={"text-sm font-medium text-gray-300"}>
                Already have an account?{"   "}
                <a href={"#"} className={"text-blue-700 hover:underline"} onClick={SwitchToLoginModal}>
                    Log In
                </a>
            </div>
        </form>
    )
}

export default Register;