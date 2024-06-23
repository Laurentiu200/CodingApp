"use server"

import {java, python} from 'compile-run';

export  async function POST() {
    const sourcecode = `print("Hell0 W0rld!")`;
    let resultPromise = python.runSource(sourcecode);
    resultPromise
        .then(result => {
            console.log(result.stdout);
        })
        .catch(err => {
            console.log(err);
        });
}
