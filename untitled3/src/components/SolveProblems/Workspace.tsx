import React, {useEffect, useState} from "react";

import Description from "@/components/SolveProblems/Description/Description";
import CodeConsole from "@/components/SolveProblems/Console/CodeConsole";
import TestCases from "@/components/SolveProblems/TestCases/TestCases";
import { Problem, ProblemDetails} from "@/utils/problemType/ProblemStructure";
import GetCookie from "@/hooks/GetCookie";
import axios from "axios";
import UserAuthenticated from "@/hooks/UserAuthenticated";
import Confetti from "react-confetti/src/Confetti";
import SolutionsView from "@/components/SolveProblems/Solutions/SolutionsView";

type WorkSpaceProps = {
    problemId: string
}

const BASE_URL = 'http://localhost:8080';

const Workspace: React.FC<WorkSpaceProps> = ({problemId}) => {
    const [problemDetails, setProblemDetails] = useState<ProblemDetails>({starred: false, difficulty: "Easy"})
    const [problem, setProblem] = useState<Problem>({
        id: "",
        title: "",
        problemStatement: '',
        examples: [{
            id: 1,
            inputText: '',
            outputText: '',
            explanation: ''
        }],
        constraints: '',
        order: 2,
        exampleCode: '',
        starred: false,
        bestScore: 1,
        difficulty: '',
        solutions: [{
            id: 0,
            score: 0,
            solution: '',
            submissionDate: ''

        }],
        testCases: [{
            id: 1,
            inputData: '',
            expectedOutputData: '',
            points: 0
        }]
    })
    useEffect(() => {

        const getData = async () => {
            if (await UserAuthenticated()) {
                const cookie = await GetCookie()
                const response = await axios.get(`${BASE_URL}/secure/problem/getProblemAuthenticated/${problemId}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie?.substring(10, cookie?.length - 2)}`
                    }
                })
                setProblem(await response.data)
            }
            else {
                const response = await axios.get(`${BASE_URL}/secure/problem/getProblem/${problemId}`, {
                })
                setProblem(await response.data)
            }
        };
        getData();
    }, [problemId]);


    return (
        <div className={"flex items-center flex-col mx-20 my-5"}>
            <div className={"w-full"}>
                <Description  problem={problem} setProblem={setProblem}/>
            </div>
            <div className={" w-full  items-center justify-between"}>
                <div className={"flex-col items-center  mx-24 rounded-md "}>
                    <CodeConsole problem={problem} setProblem={setProblem}/>
                </div>
            </div>
            <div className={"w-full items-center justify-between mx-20 my-5"}>
                <div className={"flex-col items-center  mx-24 border-2 border-blue-400 rounded-md "}>
                    <TestCases problem={problem}/>
                </div>
            </div>
                <div className={"w-full items-center justify-between mx-20 my-5"}>
                    <div className={"flex-col items-center  mx-24 border-2 border-blue-400 rounded-md"}>
                        <SolutionsView solutions={problem.solutions}/>
                    </div>
                </div>
        </div>

    )
}

export default Workspace;
