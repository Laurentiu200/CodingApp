"use client"

import React, {useEffect, useState} from "react";
import { Problem } from "@/app/utils/problemType/ProblemStructure";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror"
import {java} from "@codemirror/lang-java";

type CodeConsoleProps = {
    problem: Problem;
};

const CodeConsole: React.FC<CodeConsoleProps> = ({ problem }) => {
    const [javaCode, setJavaCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {

        setOutput('');
        setError('');

        const response = await fetch('/app/actions/compileJava', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ javaCode })
        });

        const data = await response.json();
        if (response.ok) {
            setOutput(data.output);
            setError(data.error);
        } else {
            setError(data.error);
        }
    };

    return (
        <div className={"h-[calc(100vh-94px)] overflow-auto bg-dark-layer-1 rounded-b"}>
            <div>
                <CodeMirror value={problem.exampleCode} theme={vscodeDark} extensions={[javascript(), java()]} style={{ fontSize: 16 }} />
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
                Run Code
            </button>
            <div className="mt-4 p-2 bg-gray-800 text-white rounded">
                {output}
            </div>
        </div>
    );
};

export default CodeConsole;
