"use client"

import React, {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {AiFillStar} from "react-icons/ai";
import {TiStarOutline} from "react-icons/ti";
import UserAuthenticated from "@/app/actions/UserAuthenticated";
import {toast} from "react-toastify";
import GetCookie from "@/app/actions/GetCookie";
import {useRouter} from "next/router";
import {bool} from "prop-types";
import {isBooleanObject} from "node:util/types";

type ProblemBarProps = {
    difficulty: string,
    title: string,
    problemId: string,
    starred?:boolean
}
const BASE_URL = 'http://localhost:8080';
const ProblemBar: React.FC<ProblemBarProps> = (props) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleStarredProblem = useCallback(async () =>
    {
        setIsProcessing(true)
        try {
            if (!await UserAuthenticated()) {
                toast.error("You must be logged in for this action!", {
                    position: "top-center",
                    theme: "dark",
                    autoClose: 3000
                })
            } else if (!props.starred) {
                const cookie = await GetCookie()
                const response = await fetch(`${BASE_URL}/secure/problem/starProblem/${props.problemId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie?.value.substring(10, cookie?.value.length - 2)}`
                    },

                })
                window.location.reload()
            }
            else   {
                const cookie = await GetCookie()
                console.log(cookie?.value.substring(10, cookie?.value.length - 2))
                const response = await fetch(`${BASE_URL}/secure/problem/removeStarProblem/${props.problemId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie?.value.substring(10, cookie?.value.length - 2)}`
                    },

                })
                window.location.reload()
            }

        } catch (error)
        {
            toast.error("Something went wrong...", { position: "top-center", theme: "dark", autoClose: 3000 });
        }
        finally {
            setIsProcessing(false)

        }
    },[isProcessing, props.problemId, props.starred]);

    const difficulyColor =
        props.difficulty === "Easy"
            ? "bg-dark-green-s"
            : props.difficulty === "Medium"
                ? "bg-dark-yellow"
                : "bg-dark-pink";

    return (

            <div
                className={"relative bg-blue-300 flex items-center justify-between sm:px px-2 md:px-5 rounded-md  py-1"}>
                <div className={"flex items-center"}>
                    <Link href={`/problems/${props.problemId}`} className={"text-2xl text-blue-700 hover:underline"}>
                        {props.title}
                    </Link>
                    <div
                        className=' cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ' onClick={handleStarredProblem}>
                        {props.starred && <AiFillStar className='text-dark-yellow'/>}
                        {!props.starred && <TiStarOutline/>}
                    </div>
                </div>

                <div className={"text-1xl flex items-center"}>
                    <code className={`${difficulyColor} float-right rounded-lg px-1 py-0.5`}>{props.difficulty}</code>
                </div>
            </div>
    )
}

export default ProblemBar;