import {java} from 'compile-run';

export default async function handler(req, res) {
    let resultPromise = java.runSource(req.body.code, {
        stdin: req.body.input,
        compilationPath: 'C:\\Program Files\\Java\\jdk1.8.0_361\\bin\\javac',
        executionPath: 'C:\\Program Files\\Java\\jdk1.8.0_361\\bin\\java'

    });
    resultPromise
        .then(result => {
            res.status(200).json({response:result})
        })
}
