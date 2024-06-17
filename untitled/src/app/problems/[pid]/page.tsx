"use client"

import React, { useState } from "react";
import MainNavigationBar from "@/app/components/MainNavigationBar/MainNavigationBar";
import Workspace from "@/app/components/SolveProblems/Workspace";
import { problems } from "@/app/utils/problems/problemsMap";
import { redirect, useParams } from "next/navigation";

type ProblemPageProps = {}

const ProblemPage: React.FC<ProblemPageProps> = () => {
    const params = useParams();
    const pid = Object.values(params)[0] as string;
    const problem = problems[pid] || null;

    return (
        <div>
            <MainNavigationBar problemPage={true} />
            <Workspace problem={problem} />
        </div>
    );
}

export default ProblemPage;
