import React, {useState} from "react";

type ErrorMessageProps = {
    isOpen: boolean,
    errorMessage: String
}
const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
    return (
        <>
            {
                props.isOpen ?
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg relative" role="alert">
                        <span className="block sm:inline">{props.errorMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
                    </div> : ""
            }
        </>
    )
}

export default ErrorMessage;