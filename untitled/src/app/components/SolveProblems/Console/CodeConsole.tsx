"use client"

import React from "react";
import CodeMirror from "@uiw/react-codemirror"
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java"
import {Problem} from "@/app/utils/problemType/ProblemStructure";
type CodeConsoleProps = {
    problem: Problem
}
const CodeConsole: React.FC<CodeConsoleProps> = ({problem}) => {

    const code = 'function twoSum(nums, target) { \n Write your code here!\n};';


    return (
        <div className={"h-[calc(100vh-94px)]  overflow-auto bg-dark-layer-1 rounded-b"}>
            <div >
            <CodeMirror value={problem.exampleCode} theme={vscodeDark} extensions={[javascript(), java()]} style={{fontSize:16}}/>
            </div>
        </div>
    )
}

export default CodeConsole;