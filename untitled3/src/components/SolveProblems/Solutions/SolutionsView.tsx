import React, {useEffect, useState} from "react";
import {Solutions} from "@/utils/problemType/ProblemStructure";
import UserAuthenticated from "@/hooks/UserAuthenticated";
import {userAgent} from "next/server";

type SolutionsProps = {
    solutions: Solutions[]
}
const SolutionsView: React.FC<SolutionsProps> = ({solutions}) => {
    const [displaySolutions, setDisplaySolutions] = useState(false)
    const [solutionText, setSolutionText] = useState("")
    const [showSolutionText, setShowSolutionText] = useState(false)
    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await UserAuthenticated();
            setDisplaySolutions(authStatus);
        };
        checkAuth();
    }, []);

    function handleShowSolution(sol: Solutions) {
        setSolutionText(sol.solution.replace(/\n/g, '</br>'));
        setShowSolutionText(true);
        window.scrollTo({
            top: document.body.scrollHeight + 300,
            behavior: 'smooth',
        })
    }

    return (
        <>
            {displaySolutions &&
                <div className={" overflow-auto rounded-b mx-4 "}>
                    <div className={"font-semibold my-4"}>
                        <div
                            className={"w-full flex items-center justify-between  rounded-lg border  border-transparent  mt-2"}>
                            <div className={"flex"}>
                                <p className={"text-xl font-medium mt-4 text-blue-700"}>Solutions:</p>
                            </div>
                            <div className={"flex"}>
                                <p className={"text-xl font-medium mt-4 text-blue-700"}>Score</p>
                            </div>
                            <div className={"flex mr-12"}>
                                <p className={"text-xl font-medium mt-4 text-blue-700"}>Action</p>
                            </div>
                        </div>
                        {solutions.map((sol) => (

                            <React.Fragment key={sol.id}>
                                <div
                                    className={`w-full flex items-center justify-between  rounded-lg border px-3 py-[10px] ${(sol.score && sol.score === 100)
                                        ? "bg-dark-green-s"
                                        : (sol.score && sol.score > 60)
                                            ? "bg-dark-yellow"
                                            : "bg-dark-pink"} border-transparent text-white mt-2`}>
                                    <div className={"flex"}>
                                        <div className={" py-0.5 px-0.5"}>
                                            {sol.submissionDate}
                                        </div>
                                    </div>
                                    <div className={"flex"}>
                                        <div className={" py-0.5 px-0.5"}>
                                            {sol.score}
                                        </div>
                                    </div>
                                    <button
                                        className={"ml-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700 hover:border-2 hover:border-blue-700 "}
                                        onClick={() => handleShowSolution(sol)}>
                                        <div className={"flex items-center px-1"}>
                                            <div className={"text-xs text-white"}>
                                                Show Solution
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </React.Fragment>

                        ))}
                    </div>
                    {showSolutionText &&
                        <div className={"flex border bg-blue-100 rounded-xl  w-full mb-5 "}>
                            <div className={"mx-5 my-[10px] flex-col justify-between w-full"}>
                                <div className={"mr-2 flex flex-1 flex-nowrap items-center space-x-4"}>
                                    <div dangerouslySetInnerHTML={{__html: solutionText}}/>
                                </div>
                            </div>
                        </div>
                    }

                </div>

            }
        </>
    )
}

export default SolutionsView;