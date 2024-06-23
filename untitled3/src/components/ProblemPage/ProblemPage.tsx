import Link from 'next/link';
import React, {useEffect, useState} from "react";
import axios from "axios";
import GetCookie from "@/hooks/GetCookie";
import ProblemBar from "@/components/ProblemBar/ProblemBar";
import {Problem} from "@/utils/problemType/ProblemStructure";

const BASE_URL = 'http://localhost:8080';

type ProblemProps = {};

const ProblemPage: React.FC<ProblemProps> = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [difficulty, setDifficulty] = useState('');
    const [starred, setStarred] = useState(false);
    const [category, setCategory] = useState('');
    const problemsPerPage = 6;

    const [listOfProblems, setListOfProblems] = useState([
        {
            id: "",
            difficulty: "",
            order: 0,
            shortDescription: "",
            score: 0,
            title: "",
            category: "",
            starred: false
        }
    ]);
    let displayedProblems = listOfProblems;

    useEffect(() => {
        const getProblems = async () => {

            try {
                const cookie = await GetCookie();
                if (cookie) {
                    console.log(cookie)
                    const response = await axios.get(`${BASE_URL}/secure/problem/getAllAuthenticated`, {
                        headers: {
                            'Authorization': `Bearer ${cookie?.substring(10, cookie?.length - 2)}`
                        }
                    })
                    setListOfProblems(response.data);
                } else
                {
                    const response = await axios.get(`${BASE_URL}/secure/problem/getAll`);
                    setListOfProblems(response.data);
                }
            } catch (error) {
                console.error("Error fetching problems:", error);
            }

        };
        getProblems()
    }, []);

    let indexOfLastProblem = currentPage * problemsPerPage;
    let indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    let currentProblems = displayedProblems.slice(indexOfFirstProblem, indexOfLastProblem);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        indexOfLastProblem = currentPage * problemsPerPage;
        indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
        currentProblems = displayedProblems.slice(indexOfFirstProblem, indexOfLastProblem);
    };

    const filterProblems = async () => {


            try {
                const cookie = await GetCookie();
                if (cookie) {
                    console.log(cookie)
                    const response = await axios.get(`${BASE_URL}/secure/problem/getAllAuthenticated`, {
                        headers: {
                            'Authorization': `Bearer ${cookie?.substring(10, cookie?.length - 2)}`
                        }
                    })
                    setListOfProblems(response.data);
                } else
                {
                    const response = await axios.get(`${BASE_URL}/secure/problem/getAll`);
                    setListOfProblems(response.data);
                }
            } catch (error) {
                console.error("Error fetching problems:", error);
            }


        if(difficulty != '' && starred && category != '')
             setListOfProblems(listOfProblems.filter(prob =>
                prob.difficulty === difficulty &&
                prob.starred === starred &&
                prob.category === category
            ));

        else if(difficulty != '' && starred )
            setListOfProblems(listOfProblems.filter(prob =>
                prob.difficulty === difficulty &&
                prob.starred === starred
            ));

        else if(difficulty != ''  && category != '')
            setListOfProblems(listOfProblems.filter(prob =>
                prob.difficulty === difficulty &&
                prob.category === category
            ));

        else if( starred && category != '')
            setListOfProblems(listOfProblems.filter(prob =>
                prob.starred === starred &&
                prob.category === category
            ));

        else if( starred )
            setListOfProblems(listOfProblems.filter(prob =>
                prob.starred === starred
            ));

        else if( category != '')
            setListOfProblems(listOfProblems.filter(prob =>
                prob.starred === starred
            ));

        else if(difficulty != '' )
            setListOfProblems(listOfProblems.filter(prob =>
                prob.difficulty === difficulty
            ));



    }

    return (
        <>
            <div className={"bg-white border-2 border-blue-200 rounded-lg mt-10 sm:w-7/12 max-w-[1200px] mx-auto "}>
                <div className={"max-w-1xl mx-auto"}>
                    <div className={"flex justify-between bg-blue-300 py-1.5 rounded-lg"}>
                        <div className={"flex mx-2"}>
                            <label>
                                Difficulty:
                                <select className={"mx-2 rounded px-1"} value={difficulty}
                                        onChange={e => setDifficulty(e.target.value)}>
                                    <option value="">All</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </label>
                        </div>
                        <div className={"flex mx-2"}>
                            <label>
                                Starred:
                                <input className={"mx-2 rounded px-1"}
                                       type="checkbox"
                                       checked={starred}
                                       onChange={e => setStarred(e.target.checked)}
                                />
                            </label>
                        </div>
                        <div className={"flex mx-2"}>
                            <label>
                                Category:
                                <input className={"mx-2 rounded px-1"}
                                       type="text"
                                       value={category}
                                       onChange={e => setCategory(e.target.value)}
                                />
                            </label>
                        </div>
                        <button
                            className={"mx-3 flex cursor-pointer items-center rounded text-left focus:outline-none bg-blue-600 text-white hover:bg-blue-400 px-2 py-1.5 font-medium hover:text-blue-700  hover:border-blue-700 "}
                            onClick={filterProblems}>
                            <div className={"flex items-center px-1"}>
                                <div className={"text-xs text-white"}>
                                    FilterProblems
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {currentProblems.map((prob) => (
                <React.Fragment key={prob.id}>
                    <div className={"bg-white border-2 border-blue-200 rounded-lg mt-20 sm:w-7/12 max-w-[1200px] mx-auto "}>
                        <div className={"max-w-1xl mx-auto"}>
                            <div className={"max-width: 100px mx-auto"}>
                                <ProblemBar difficulty={prob.difficulty} title={prob.title} problemId={prob.id}
                                            starred={prob.starred} score={prob.score}/>
                            </div>

                            <div className="text-black text-2md px-4 py-2 relative break-before-right">
                                <div dangerouslySetInnerHTML={{__html: prob.shortDescription}}/>
                            </div>
                            <div
                                className={"relative flex items-center justify-between sm:px px-2 md:px-5 rounded-md mx-auto py-1"}
                            >
                                <Link
                                    className={`bg-blue-300 float-right rounded-lg px-0.5 hover:bg-blue-500 transition duration-400 ease-in-out`}
                                    href={`/problems/${prob.id}`}>
                                    Category: {prob.category}
                                </Link>
                                <div className={"text-2xl flex items-center"}>
                                    <Link
                                        href={`/problems/${prob.id}`}
                                        className={"space-y-8 bg-blue-800 text-white py-1.5 sm:px-4 rounded-md text-sm" +
                                            " font-medium border-2 border-transparent hover:text-blue-700 hover:bg-white" +
                                            " hover:border-2 hover:border-blue-700 transition duration-400 ease-in-out"}>
                                        Start
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
            <div className="flex justify-center mt-4 pb-3">
                {Array.from({length: Math.ceil(displayedProblems.length / problemsPerPage)}, (_, i) => (
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
