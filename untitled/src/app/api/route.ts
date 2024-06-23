import {NextResponse} from "next/server";
import {python} from "compile-run";


export async function GET() {
    const sourcecode = `print("Hell0 W0rld!")`;
    let resultPromise = python.runSource(sourcecode);
    resultPromise
        .then(result => {
            console.log(result.stdout);
        })
        .catch(err => {
            console.log(err);
        });
    return NextResponse.json({
        hello: "world"
    });
}