import React from "react";
import Description from "@/app/components/SolveProblems/Description/Description";
import CodeConsole from "@/app/components/SolveProblems/Console/CodeConsole";
import ConsoleBar from "@/app/components/SolveProblems/Console/ConsoleBar/ConsoleBar";
import TestCases from "@/app/components/SolveProblems/TestCases/TestCases";
import FooterBar from "@/app/components/SolveProblems/FooterBar/FooterBar";
import {Problem} from "@/app/utils/problemType/ProblemStructure";

type WorkSpaceProps = {
    problem: Problem
}
const Workspace: React.FC<WorkSpaceProps> = ({problem}) => {

    return (
        <div className={"flex items-center flex-col mx-20 my-5"}>
            <Description problem={problem}/>
            <div className={" w-full  items-center justify-between"}>
                <div className={"flex-col items-center  mx-24 border-2 border-blue-400 rounded-md "}>
                    <ConsoleBar/>
                    <CodeConsole problem={problem}/>
                </div>
            </div>
            <div className={"w-full items-center justify-between mx-20 my-5"}>
                <div className={"flex-col items-center  mx-24 border-2 border-blue-400 rounded-md "}>
                    <TestCases problem={problem}/>
                </div>
            </div>
            <div className={" items-center w-full justify-between"}>
                <div className={"items-center mx-24 "}>
                <FooterBar/>
                </div>
            </div>

        </div>
    )
}

export default Workspace;

