export type Example = {
    id: number;
    inputText: string;
    outputText: string;
    explanation?: string;
};
export type TestCases = {
    id: number;
    inputData: string;
    expectedOutputData: string;
    points: number;
};
export type Solutions = {
    id: number;
    solution: string;
    submissionDate: string;
    score: number;
}
export type Problem = {
    id: string;
    title: string;
    problemStatement: string;
    examples: Example[];
    testCases: TestCases[];
    constraints: string;
    order: number;
    exampleCode: string;
    starred: boolean;
    bestScore: number;
    difficulty: string;
    solutions: Solutions[];
}

export type ProblemDetails = {
    starred:false,
    difficulty:string
}

export type DBProblem = {
    id: string,
    difficulty: string,
    order: number,
    likes: number,
    dislikes: number,
    title: string,
    category: string
}