import React from "react";
import Link from "next/link";

type ExerciseBarProps = {
    difficulty: string,
    exerciseId: number,
    correctSolution?: boolean,
    date?: string;
}
const ExerciseBar: React.FC<ExerciseBarProps> = (props) => {
    const difficulyColor =
        props.difficulty === "Easy"
            ? "bg-dark-green-s"
            : props.difficulty === "Medium"
                ? "bg-dark-yellow"
                : "bg-dark-pink";

    const scoreColor =
        (props.date && props.correctSolution)
            ? "bg-dark-green-s"
                : "bg-dark-pink";

    return (

        <div
            className={"relative bg-blue-300 flex items-center justify-between sm:px px-2 md:px-5 rounded-md  py-1"}>
            <div className={"flex items-center"}>
                <Link href={`/problems/${props.exerciseId}`} className={"text-2xl text-blue-700 hover:underline"}>
                    Exercise #{props.exerciseId}
                </Link>
                {props.date && props.correctSolution  &&
                    <div className={"text-1xl flex items-center ml-5"}>
                        <code className={`${scoreColor} float-right rounded-lg px-1 py-0.5`}>{props.date}</code>
                    </div>
                }
            </div>

            <div className={"text-1xl flex items-center"}>
                <code className={`${difficulyColor} float-right rounded-lg px-1 py-0.5`}>{props.difficulty}</code>
            </div>
        </div>
    )
}

export default ExerciseBar;