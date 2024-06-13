"use client";

import Link from 'next/link';
import ProblemBar from "@/app/components/ProblemBar/page";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = 'http://localhost:8080';

type ProblemPageProps = {
};

const ProblemPage: React.FC<ProblemPageProps> = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 6;

    const [listOfProblems, setListOfProblems] = useState([
        {
            id: "",
            difficulty: "",
            order: 0,
            likes: 0,
            dislikes: 0,
            title: "",
            category: ""
        }
    ]);

    useEffect(() => {
        const getProblems = async () => {
            try {
                console.log("Fetching problems...");
                const response = await axios.get(`${BASE_URL}/secure/problem/getAll`);
                setListOfProblems(response.data);
            } catch (error) {
                console.error("Error fetching problems:", error);
            }
        };
        getProblems();
    }, []);

    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = listOfProblems.slice(indexOfFirstProblem, indexOfLastProblem);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {currentProblems.map((prob) => (
                <React.Fragment key={prob.id}>
                    <div
                        className={"bg-white border-2 border-blue-200 rounded-lg mt-20 sm:w-7/12 max-w-[1200px] mx-auto "}
                    >
                        <div className={"max-w-1xl mx-auto"}>
                            <div className={"max-width: 100px mx-auto"}>
                                <ProblemBar difficulty={prob.difficulty} title={prob.title} problemId={prob.id} />
                            </div>

                            <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                <p>
                                    This is some centered text. This text will wrap to a new line if it exceeds the
                                    width of the div. Make sure to test with a long text to see the effect.
                                </p>
                                <p>
                                    This is some centered text. This text will wrap to a new line if it exceeds the
                                    width of the div. Make sure to test with a long text to see the effect.
                                </p>
                            </div>
                            <div
                                className={"relative flex items-center justify-between sm:px px-2 md:px-5 rounded-md mx-auto py-1"}
                            >
                                <Link
                                    className={`bg-blue-300 float-right rounded-lg px-0.5 hover:bg-blue-500 transition duration-400 ease-in-out`}
                                    href={`/problems/${prob.id}`}
                                >
                                    Category: {prob.category}
                                </Link>
                                <div className={"text-2xl flex items-center"}>
                                    <Link
                                        href={`/problems/${prob.id}`}
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
            <div className="flex justify-center mt-4 pb-3">
                {Array.from({ length: Math.ceil(listOfProblems.length / problemsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === (i + 1) ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default ProblemPage;
