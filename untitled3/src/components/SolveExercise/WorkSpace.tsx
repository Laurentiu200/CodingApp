import React, {useEffect, useState} from "react";
import ExerciseBar from "@/components/ExerciseBar/ExerciseBar";
import Link from "next/link";
import {Exercise} from "@/utils/problemType/ExerciseStructure";
import GetCookie from "@/hooks/GetCookie";
import axios from "axios";
import UserAuthenticated from "@/hooks/UserAuthenticated";
import {toast} from "react-toastify";
import {relativizeURL} from "next/dist/shared/lib/router/utils/relativize-url";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type WorkSpaceExerciseProps = {
    exerciseId: string;
}


const BASE_URL = 'http://localhost:8080';
const WorkSpaceExercise: React.FC<WorkSpaceExerciseProps> = ({exerciseId}) => {

    const [prob, setProb] = useState<Exercise>();
    const [selectedValue, setSelectedValue] = useState("");
    const [response, setResponse] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const {width, height} = useWindowSize();

    useEffect(() => {
        const getProblems = async () => {

            try {
                const cookie = await GetCookie();
                if (cookie) {
                    const response = await axios.get(`${BASE_URL}/secure/exercises/getExercise/${exerciseId}`, {})

                    setProb(response.data);
                } else {

                    const response = await axios.get(`${BASE_URL}/secure/exercises/getExerciseAuthenticated/${exerciseId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${cookie?.substring(10, cookie?.length - 2)}`
                        }
                    });
                    setProb(response.data);
                }
            } catch (error) {
                console.error("Error fetching problems:", error);
            }

        };
        getProblems()
    }, [])
    const scoreColor =
        (prob?.lastSubmissionDate && prob.correctSolution === true)
            ? "bg-dark-green-s"
            : "bg-dark-pink";


    const handleSubmit = async  () => {
        if(!await UserAuthenticated())
        {
            toast.error("You must be logged in for this action.", {position: "top-center", autoClose: 3000})
            return;
        }
        if(selectedValue === "")
        {
            toast.error("Please select an option.", {position: "top-center", autoClose: 3000})
            return;
        }
        if(response === prob?.correctAnswer)
        {
            {
                setShowConfetti(true);
                toast.success("You answer is correct.", {position: "top-center", autoClose: 3000})
                window.scrollTo(
                    {
                         top:0,
                        behavior: "smooth",
                    }
                )
                setTimeout(() => {  setShowConfetti(false) }, 3500);
            }
        }
        console.log(response)

    };
    return (
        <>{prob &&
                    <div className={"bg-white border-2 border-blue-200 rounded-lg mt-20 sm:w-7/12 max-w-[1200px] mx-auto "}>
                        {showConfetti && <Confetti gravity={0.3} tweenDuration={4000} width={width-1} height={height-1}/>}
                        <div className={"max-w-1xl mx-auto"}>
                            <div className={"max-width: 100px mx-auto"}>
                                <ExerciseBar difficulty={prob.difficulty} exerciseId={prob.id}
                                             date={prob.lastSubmissionDate} correctSolution={prob.correctSolution}/>
                            </div>

                            <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                <div dangerouslySetInnerHTML={{__html: prob.statement}}/>
                            </div>
                            <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                <div
                                    className={`bg-blue-100 rounded px-4 py-0.5 flex my-3 hover:bg-blue-300 cursor-pointer transition ${selectedValue === 'var1' ? "bg-blue-500" : ""}`}
                                    onClick={() => {
                                        setSelectedValue("var1"), setResponse(prob?.var1)
                                    }}>
                                    {prob.var1}<br/>
                                </div>
                                <div
                                    className={`bg-blue-100 rounded px-4 py-0.5 flex my-3 hover:bg-blue-300 cursor-pointer transition ${selectedValue === 'var2' ? "bg-blue-500" : ""}`}
                                    onClick={(e) => {
                                        setSelectedValue("var2"), setResponse(prob?.var2)
                                    }}>
                                    {prob.var2}<br/>
                                </div>
                                <div
                                    className={`bg-blue-100 rounded px-4 py-0.5 flex my-3 hover:bg-blue-400 cursor-pointer transition ${selectedValue === 'var3' ? "bg-blue-500" : ""}`}
                                    onClick={() => {
                                        setSelectedValue("var3"), setResponse(prob?.var3)
                                    }}>
                                    {prob.var3}<br/>
                                </div>
                                <div
                                    className={`bg-blue-100 rounded px-4 py-0.5 flex my-3 hover:bg-blue-500 cursor-pointer transition ${selectedValue === 'var4' ? "bg-blue-500" : ""}`}
                                    onClick={() => {
                                        setSelectedValue("var4"), setResponse(prob?.var4)
                                    }}>
                                    {prob.var4}<br/>
                                </div>
                            </div>
                            {prob.lastSubmissionDate &&
                                <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                    <div>
                                        <code
                                            className={`${scoreColor} float-right rounded-lg px-1 py-0.5`}>{prob.lastSubmissionDate}</code>
                                    </div>
                                </div>
                            }
                            <div
                                className={"relative flex items-center justify-between sm:px px-2 md:px-5 rounded-md mx-auto py-1"}>
                                <Link
                                    className={`bg-blue-300 float-right rounded-lg px-0.5 hover:bg-blue-500 transition duration-400 ease-in-out`}
                                    href={`/problems/${prob.id}`}>
                                    Category: {prob.category}
                                </Link>
                                <div className={"text-2xl flex items-center"}>
                                    <button className={"space-y-8 bg-blue-800 text-white py-1.5 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent hover:text-blue-700 hover:bg-white hover:border-2 hover:border-blue-700 transition duration-400 ease-in-out"}
                                            onClick={handleSubmit}>
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        </>
    )
}

export default WorkSpaceExercise;