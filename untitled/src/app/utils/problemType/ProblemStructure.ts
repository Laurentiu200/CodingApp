import exportedTypeSuite from "sucrase/dist/types/Options-gen-types";

export type Example = {
    id: number;
    inputText: string;
    outputText: string;
    explanation?: string;
};


export type Problem = {
    id: string;
    title: string;
    problemStatement: string;
    examples: Example[];
    constraints: string;
    order: number;
    exampleCode: string;
    handlerFunction: ((fn: any) => boolean) | string;
    functionName: string;
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