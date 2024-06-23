import React from "react";
import MainNavigationBar from "@/components/MainNavigationBar/MainNavigationBar";
import WorkSpaceExercise from "@/components/SolveExercise/WorkSpace";
import {problems} from "@/utils/problems/problemsMap";

type ExerciseProps = {
    exerciseId: string
}
const Exercise: React.FC < ExerciseProps > = ({exerciseId}) => {

    return (
        <div>
            <MainNavigationBar/>
            <WorkSpaceExercise exerciseId={exerciseId}/>
        </div>
    )
}

export default Exercise;


export async function getServerSideProps({ params }: { params: { pid: string } }) {
    const { pid } = params;
    const exerciseId = pid;

    return {
        props: {
            exerciseId,
        },
    };
}