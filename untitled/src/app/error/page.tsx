"use client"

import React from "react";
import {redirect} from "next/navigation";

type ErrorProps = {}
const Error: React.FC<ErrorProps> = () => {

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => {redirect("/")}}>Try again</button>
        </div>
    )
}

export default Error;