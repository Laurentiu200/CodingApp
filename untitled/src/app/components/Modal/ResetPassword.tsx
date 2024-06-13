import React from "react";

type ResetPasswordProps = {

}
const ResetPassword: React.FC<ResetPasswordProps> = () => {

    return (
        <form className={"space-y-6 px-6 py-4 lg:px-6 sm:pb-6 xl:pb-8"}>
            <h3 className={"text-xl font-medium text-white"}>
                Reset Password
            </h3>
            <p className={"text-white text-sm"}>
                Please enter your email address below, and you will receive an email with the instructions.
            </p>
            <div>
                <label htmlFor={"email"} className={"text-sm font-medium block mb-2 text-gray-300"}>
                    Enter Your Email
                </label>
                <input type={"email"} name={"email"} id={"email"}
                       className={"border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5 bg-gray600 border-gray-500 placeholder-gray-400 text-white"}
                       placeholder={"email@something.com"}/>
            </div>
            <button type={"submit"}
                    className={"w-full text-white focus:ring-blue-300 font-medium text-sm py-2.5 text-center bg-blue-700 rounded-lg hover:bg-blue-900"}>
                Reset Password
            </button>
        </form>
    )
}

export default ResetPassword;