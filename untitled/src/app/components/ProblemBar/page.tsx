import React from "react";
import {problems} from "@/app/mockProoblems/Problems";
import Link from "next/link";

type ProblemBarProps = {

    difficulty: string,
    title: string,
    problemId: string
}
const ProblemBar: React.FC<ProblemBarProps> = (props) => {

    const difficulyColor =
        props.difficulty === "Easy"
            ? "bg-dark-green-s"
            : props.difficulty === "Medium"
                ? "bg-dark-yellow"
                : "bg-dark-pink";

    return (
        <div
            className={"relative bg-blue-300 flex items-center justify-between sm:px px-2 md:px-5 rounded-md  py-1"}>
            <Link href={`/problems/${props.problemId}`} className={"text-2xl text-blue-700 hover:underline"}>
                {props.title}
            </Link>
            <div className={"text-1xl flex items-center"}>
                <code className={`${difficulyColor} float-right rounded-lg px-1 py-0.5`}>{props.difficulty}</code>
            </div>
        </div>
    )
}

export default ProblemBar;