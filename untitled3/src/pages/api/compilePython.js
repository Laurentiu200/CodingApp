import {python} from 'compile-run';

export default async function handler(req, res) {
    let resultPromise = python.runSource(req.body.code, {stdin: req.body.input});
    resultPromise
        .then(result => {
            res.status(200).json({response:result})
        })
}
