import React, {useEffect, useState} from "react";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import {java} from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { Problem } from "@/utils/problemType/ProblemStructure";
import {toast} from "react-toastify";
import GetCookie from "@/hooks/GetCookie";
import UserAuthenticated from "@/hooks/UserAuthenticated";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type CodeConsoleProps = {
    problem: Problem;
    setProblem: React.Dispatch<React.SetStateAction<Problem>>
};

const BASE_URL = 'http://localhost:8080';

const CodeConsole: React.FC<CodeConsoleProps> = ({ problem , setProblem}) => {

    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [displayOutput, setDisplayOutput] = useState(false);
    const {width, height} = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Select Language');
    const [javaCode, setJavaCode] = useState<string>(problem.exampleCode);

    useEffect(() => {
        setJavaCode(problem.exampleCode)
    }, [ problem.exampleCode]);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value:string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        let result = 0;
        setOutput('');
        setError('');
        setDisplayOutput(false)
        setDisplayError(false)
        if(!await UserAuthenticated())
        {
            toast.error("You must be logged in for this action.", {position: "top-center", autoClose: 3000})
            return;
        }
        for(let i = 0; i < problem.testCases.length; i++)
        {
            let response;
            if(selectedValue === 'python') {
                response = await fetch('/api/compilePython', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code: javaCode, input: problem.testCases[i].inputData})
                });
            }
            else if(selectedValue === 'c')
            {
                response = await fetch('/api/compileC', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code: javaCode})
                });
            }
            else if(selectedValue === 'cpp')
            {
                response = await fetch('/api/compileCPP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code: javaCode, input: problem.testCases[i].inputData})
                });
            }
            else if(selectedValue === 'java')
            {
                response = await fetch('/api/compileJava', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code: javaCode, input: problem.testCases[i].inputData})
                });
            }
            else
            {
                toast.error("Please select a language", {position: "top-center", autoClose: 3000})
                window.scrollTo(
                    {
                        top: 765,
                        behavior: 'smooth',
                    })
                return;
            }
            const data = await response.json();
            if (data.response.stderr === "") {
                let message = data.response.stdout.replace(/\r\n/g, '');
                if(message.localeCompare(problem.testCases[i].expectedOutputData) === 0)
                {
                    result += problem.testCases[i].points;
                }

                if(result === 100)
                {
                    setShowConfetti(true);

                    window.scrollTo(
                        {
                            top:0,
                            behavior: "smooth",
                        }
                    )
                }
            } else {
                setDisplayError(true);
                const firstCommaIndex = data.response.stderr.indexOf(',');
                let message = data.response.stderr.substring(firstCommaIndex + 1).trim();
                message = message.replace(/\n/g, '<br>');
                setError(message);
                return;
            }

        }
        toast.success("Your score is: " + result, {position: "top-center", autoClose: 3000})
        setDisplayOutput(true)
        setOutput("Your score is: " + result.toString());
        const cookie = await GetCookie()
        const response = await fetch(`${BASE_URL}/secure/problem/saveSolution`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookie?.substring(10, cookie?.length - 2)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({problemId: problem.id, solution: javaCode, score: result})
        });

        if(response.ok)
        {
            const responseData = await response.json();
            console.log(responseData);
            setProblem(responseData)
        }
        else
         {
            toast.error("Something went wrong, please try again.", {position: "top-center", autoClose: 3000})
        }

    };

    const handleRun = async () => {
        setOutput('');
        setError('');
        setDisplayOutput(false)
        setDisplayError(false)
        let response
        if(selectedValue === 'python') {
             response = await fetch('/api/compilePython', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: javaCode, input: "1 2 3"})
            });
        }
        else if(selectedValue === 'c')
        {
             response = await fetch('/api/compileC', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: javaCode})
            });
        }
        else if(selectedValue === 'cpp')
        {
             response = await fetch('/api/compileCPP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: javaCode})
            });
        }
        else if(selectedValue === 'java')
        {
            response = await fetch('/api/compileJava', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: javaCode, input: "1 2 3"})
            });
        }
        else
        {
            toast.error("Please select a language", {position: "top-center", autoClose: 3000})
            window.scrollTo(
                {
                    top: 765,
                    behavior: 'smooth',
                })
            return;
        }
        const data = await response.json();
        if (data.response.stderr === "") {
            let message = data.response.stdout.replace(/\n/g, '<br>');
            setOutput(message)
            setDisplayOutput(true)
        } else {
            setDisplayError(true);
            const firstCommaIndex = data.response.stderr.indexOf(',');
            let message = data.response.stderr.substring(firstCommaIndex + 1).trim();
            message = message.replace(/\n/g, '<br>');
            setError(message);
        }
    };

    const onChange = (value: string) => {
        setJavaCode(value);
    };

    return (
        <>
            <div id={"top-bar"} className={" flex items-center  bg-blue-400 h-11 rounded-t"}>
                {showConfetti && <Confetti gravity={0.3} tweenDuration={4000} width={width-1} height={height-1}/>}
                {!isOpen && (
                    <button onClick={toggleDropdown}
                            className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}>
                        <div className={"flex items-center px-1"}>
                            <div className={"text-xs text-white"}>
                                {selectedValue}
                            </div>
                        </div>
                    </button>
                )}
                {isOpen && (<>
                        <button onClick={() => {handleSelect('cpp')}}
                                className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}>
                            <div className={"flex items-center px-1"}>
                                <div className={"text-xs text-white"}>
                                    C++
                                </div>
                            </div>
                </button>


                <div className={"flex items-center m-2"}>
                    <button onClick={() => {handleSelect('java')}}
                            className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}>
                        <div className={"flex items-center px-1"}>
                            <div className={"text-xs text-white"}>
                                Java
                            </div>
                        </div>
                    </button>
                </div>
                <div className={"flex items-center m-2"}>
                    <button onClick={() => {handleSelect('python')}}
                            className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}>
                        <div className={"flex items-center px-1"}>
                            <div className={"text-xs text-white"}>
                                Python
                            </div>
                        </div>
                    </button>
                </div>
                <div className={"flex items-center m-2"}>
                    <button onClick={() => {handleSelect('c')}}
                            className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}>
                        <div className={"flex items-center px-1"}>
                            <div className={"text-xs text-white"}>
                                C
                            </div>
                        </div>
                    </button>
                </div>
            </>
            )}

            </div>
            <div className={"h-[calc(100vh-150px)] overflow-auto bg-dark-layer-1 border-2 border-blue-300"}>
                {selectedValue === "java" && <div>
                    <CodeMirror onChange={onChange} value={javaCode} theme={vscodeDark}
                                extensions={[java()]} style={{fontSize: 16}}/>
                </div>
                }
                {selectedValue === "python" && <div>
                    <CodeMirror onChange={onChange} value={javaCode} theme={vscodeDark}
                                extensions={[python()]} style={{fontSize: 16}}/>
                </div>
                }

                {(selectedValue === "cpp" || selectedValue === "c")  && <div>
                    <CodeMirror onChange={onChange} value={javaCode} theme={vscodeDark}
                                extensions={[cpp()]} style={{fontSize: 16}}/>
                </div>
                }

                {selectedValue === 'Select Language'  &&
                    <div>
                    <CodeMirror onChange={onChange} value={javaCode} theme={vscodeDark}
                                extensions={[ java()]} style={{fontSize: 16}}/>
                </div>
                }

            </div>
            <div className={"pt-5"}>
                <div className={"flex bg-blue-300 rounded-xl  w-full mb-5 "}>
                    <div className={"mx-5 my-[10px] flex justify-between w-full"}>
                        <div className={"ml-auto flex items-center space-x-4"}>
                            <button
                                className={"px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"} onClick={handleRun}>
                                Run
                            </button>
                            <button onClick={handleSubmit}
                                className={"px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-green-600 hover:bg-green-700 text-white rounded-lg"}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                {displayOutput &&
                    <div className={"flex bg-green-300 rounded-xl  w-full mb-5 "}>
                        <div className={"mx-5 my-[10px] flex-col justify-between w-full"}>
                            <div className={"mr-2 flex flex-1 flex-nowrap items-center space-x-4"}>
                                <div dangerouslySetInnerHTML={{__html: output}}/>
                            </div>
                        </div>
                    </div>
                }
                {displayError &&
                    <div className={"flex bg-red-400 rounded-xl  w-full mb-5 "}>
                        <div className={"mx-5 my-[10px] flex justify-between w-full"}>
                            <div className={"mr-2 flex flex-1 flex-nowrap items-center space-x-4"}>
                                <div dangerouslySetInnerHTML={{ __html: error }} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default CodeConsole;
