import React, {useState} from "react";
import FooterBar from "@/app/components/SolveProblems/FooterBar/FooterBar";
import {Problem} from "@/app/utils/problemType/ProblemStructure";

type TestCasesProps = {
    problem: Problem
}
const TestCases: React.FC<TestCasesProps> = ({problem}) => {

    const [activeCase, setActiveCase] = useState<number>(0)

    return (
        // test case header
        <div className={"h-[calc(100vh-450px)] overflow-auto rounded-b mx-4"}>
            <div className={" flex h-10 items-center space-x-6"}>
                <div className={"relative flex h-full flex-col justify-center cursor-pointer"}>
                    <div className={"text-sm font-medium leading-5 text-blue-700"}>
                        Testcases
                    </div>
                    <hr className={"absolute bottom-0 h-0.5 w-full rounded-full border-none bg-blue-700"}/>
                </div>
            </div>
            <div className={"flex"}>
                {problem.examples.map((example, index) => (
                    <div className={"mr-2 items-start mt-2 text-white"} key={example.id} onClick={() => setActiveCase(index)}>
                        <div className={" flex flex-wrap items-center gap-y-4"}>
                            <div
                                className={`font-medium items-center transition-all focus:outline-none inline-flex bg-blue-500 hover:bg-blue-600 relative rounded px-4 py-1 cursor-pointer whitespace-nowrap ${activeCase === index ? "bg-blue-800" : ""}`}>
                                Case {index + 1}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className={"font-semibold my-4"}>
                <p className={"text-sm font-medium mt-4 text-blue-700"}>Input</p>
                <div
                    className={"w-full cursor-text rounded-lg border px-3 py-[10px] bg-blue-400 border-transparent text-white mt-2"}>
                    {problem.examples[activeCase].inputText}
                </div>

                <p className={"text-sm font-medium mt-4 text-blue-700"}>Output</p>
                <div className={"w-full cursor-text rounded-lg border px-3 py-[10px] bg-blue-400 border-transparent text-white mt-2"}>
                    {problem.examples[activeCase].outputText}
                </div>


            </div>
        </div>

    )
}

export default TestCases;