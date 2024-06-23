export type Exercise = {
    id: number;
    statement: string;
    var1: string;
    var2: string;
    var3: string;
    var4: string;
    correctAnswer: string;
    lastSubmissionDate?: string;
    correctSolution?: boolean;
    category: string;
    difficulty: string;
}