"use client"

import React, {useState} from "react";
import MainBar from "@/app/components/MainNavigationBar/page";
import Workspace from "@/app/components/SolveProblems/page";
import {problems} from "@/app/utils/problems/problemsMap";
import {redirect, useParams} from "next/navigation";
import {Problem} from "@/app/utils/problemType/ProblemStructure";
import {badRequest} from "next/dist/client/components/react-dev-overlay/server/shared";

type ProblemPageProps = {

}
const ProblemPage: React.FC<ProblemPageProps> = () => {

    const params1 = useParams()
    const pid1 = Object.values(params1).map((value) => {
        return value;
    })
    let problem: Problem | null = null;
    Object.entries(problems).map(([key, value]) => {
        if(key.toString() === pid1[0].toString())
            problem = value;
     })
    if(!problem)
    {
        redirect("/error")
    }
    return (
        <div>
            <MainBar probPage={true}/>
            <Workspace problem={problem}/>

        </div>
    )

}

export default ProblemPage;