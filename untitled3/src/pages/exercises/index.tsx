import React from "react";
import MainNavigationBar from "@/components/MainNavigationBar/MainNavigationBar";
import ExerciseContent from "@/components/ExercsesPage/ExerciseContent";

type ExercisesProps = {}
const Exercises: React.FC<ExercisesProps> = () => {

    return (
        <div>
            <MainNavigationBar problemPage />
            <ExerciseContent/>
        </div>
    )
}

export default Exercises;