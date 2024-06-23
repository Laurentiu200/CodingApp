import React, {useEffect, useState} from "react";
import ProblemBar from "@/components/ProblemBar/ProblemBar";
import Link from "next/link";
import GetCookie from "@/hooks/GetCookie";
import axios from "axios";
import {Exercise} from "@/utils/problemType/ExerciseStructure";
import ExerciseBar from "@/components/ExerciseBar/ExerciseBar";

type ExerciseContentProps = {}

const BASE_URL = 'http://localhost:8080';
const ExerciseContent: React.FC<ExerciseContentProps> = () => {

    const [exercises, setExercises] = useState<[Exercise]>();

    useEffect(() => {
        const getProblems = async () => {

            try {
                const cookie = await GetCookie();
                if (cookie) {
                    const response = await axios.get(`${BASE_URL}/secure/exercises/getAllExercises`, {
                    })

                    setExercises(response.data);
                } else {

                    const response = await axios.get(`${BASE_URL}/secure/exercises/getAllExercises`);
                    setExercises(response.data);
                }
            }
            catch (error)
            {
                console.error("Error fetching problems:", error);
            }

        };
        getProblems()
    }, []);
    return (
        <>
            {exercises && exercises.map((prob) => (
                <React.Fragment key={prob.id}>
                    <div
                        className={"bg-white border-2 border-blue-200 rounded-lg mt-20 sm:w-7/12 max-w-[1200px] mx-auto "}
                    >
                        <div className={"max-w-1xl mx-auto"}>
                            <div className={"max-width: 100px mx-auto"}>
                                <ExerciseBar difficulty={prob.difficulty} exerciseId={prob.id}
                                             date={prob.lastSubmissionDate} correctSolution={prob.correctSolution}/>
                            </div>

                            <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                <div dangerouslySetInnerHTML={{__html: prob.statement}}/>
                            </div>
                            <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                <div className={"bg-blue-100 rounded px-4 py-0.5 flex my-1"}>
                                     {prob.var1}<br/>
                                </div>
                                <div className={"bg-blue-100 rounded px-4 py-0.5 flex my-1"}>
                                     {prob.var2}<br/>
                                </div>
                                <div className={"bg-blue-100 rounded px-4 py-0.5 flex my-1"}>
                                    {prob.var3}<br/>
                                </div>
                                <div className={"bg-blue-100 rounded px-4 py-0.5 flex my-1"}>
                                    {prob.var4}<br/>
                                </div>
                            </div>
                            <div
                                className={"relative flex items-center justify-between sm:px px-2 md:px-5 rounded-md mx-auto py-1"}
                            >
                                <Link
                                    className={`bg-blue-300 float-right rounded-lg hover:bg-blue-500 transition duration-400 ease-in-out px-2`}
                                    href={`/exercise/${prob.id}`}
                                >
                                    Category: {prob.category}
                                </Link>
                                <div className={"text-2xl flex items-center"}>
                                    <Link
                                        href={`/exercise/${prob.id}`}
                                        className={"space-y-8 bg-blue-800 text-white py-1.5 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent hover:text-blue-700 hover:bg-white hover:border-2 hover:border-blue-700 transition duration-400 ease-in-out"}
                                    >
                                        Start
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </>
    )
}

export default ExerciseContent;