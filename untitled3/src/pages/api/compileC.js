import {c} from 'compile-run';

export default async function handler(req, res) {
    let resultPromise = c.runSource(req.body.code);
    resultPromise
        .then(result => {
            res.status(200).json({response:result})
        })
}
