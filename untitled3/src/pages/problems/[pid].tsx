
import React from "react";


import {Problem} from "@/utils/problemType/ProblemStructure";
import MainNavigationBar from "@/components/MainNavigationBar/MainNavigationBar";
import {problems} from "@/utils/problems/problemsMap";
import Workspace from "@/components/SolveProblems/Workspace";
import GetCookie from "@/hooks/GetCookie";
import axios from "axios";
import Confetti from "react-confetti/src/Confetti";

const BASE_URL = 'http://localhost:8080';

type ProblemPageProps = {
    problem: string;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {


    return (
        <div>
            <MainNavigationBar problemPage />
            <Workspace problemId={problem} />
        </div>
    );
};
export default ProblemPage;

export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: { pid: key },
    }));

    return {
        paths,
        fallback: false,
    };
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { pid: string } }) {
    const { pid } = params;
    const problem = pid;
    return {
        props: {
            problem,
        },
    };
}