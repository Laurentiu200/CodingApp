"use client"

import React, {useEffect, useState} from "react";
import Description from "@/app/components/SolveProblems/Description/Description";
import CodeConsole from "@/app/components/SolveProblems/Console/CodeConsole";
import ConsoleBar from "@/app/components/SolveProblems/Console/ConsoleBar/ConsoleBar";
import TestCases from "@/app/components/SolveProblems/TestCases/TestCases";
import FooterBar from "@/app/components/SolveProblems/FooterBar/FooterBar";
import { Problem, ProblemDetails } from "@/app/utils/problemType/ProblemStructure";
import GetCookie from "@/app/actions/GetCookie";
import axios from "axios";
import UserAuthenticated from "@/app/actions/UserAuthenticated";

type WorkSpaceProps = {
    problem: Problem
}

const BASE_URL = 'http://localhost:8080';

const Workspace: React.FC<WorkSpaceProps> = ({ problem }) => {
    const [problemDetails, setProblemDetails] = useState<ProblemDetails>({ starred:false, difficulty:"Easy"})
    useEffect(() => {
        const getData = async () => {
            if(await UserAuthenticated()) {

                const cookie = await GetCookie()
                const response = await axios.get(`${BASE_URL}/secure/problem/getProblemDetails/${problem.id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie?.value.substring(10, cookie?.value.length - 2)}`
                    }
                })
                setProblemDetails(await response.data)
            }
        };
        getData();
    }, [problem.id]);
    return (
        <div className={"flex items-center flex-col mx-20 my-5"}>
            <div className={"w-full"}>
                <Description problemDetails = {problemDetails} problem={problem} />
            </div>
            <div className={" w-full  items-center justify-between"}>
                <div className={"flex-col items-center  mx-24 border-2 border-blue-400 rounded-md "}>
                    <ConsoleBar />
                    <CodeConsole problem={problem} />
                </div>
            </div>
            <div className={"w-full items-center justify-between mx-20 my-5"}>
                <div className={"flex-col items-center  mx-24 border-2 border-blue-400 rounded-md "}>
                    <TestCases problem={problem} />
                </div>
            </div>
            <div className={" items-center w-full justify-between"}>
                <div className={"items-center mx-24 "}>
                    <FooterBar />
                </div>
            </div>
        </div>
    )
}

export default Workspace;
