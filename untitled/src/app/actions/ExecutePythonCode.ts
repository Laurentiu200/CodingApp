"use server"

export default async function ExecutePythonCode() {
    const {c, cpp, node, python, java} = require('compile-run');

    const sourcecode = `print("Hell0 W0rld!")`;

    // Define the expected result type
    interface RunResult {
        stdout: string;
        stderr: string;
        exitCode: number;
    }

    let resultPromise: Promise<RunResult> = python.runSource(sourcecode);
    resultPromise
        .then((result: RunResult) => {
            console.log(result);
        })
        .catch((err: any) => {
            console.log(err);
        });
}