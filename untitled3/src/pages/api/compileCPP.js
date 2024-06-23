import {cpp} from 'compile-run';

export default async function handler(req, res) {
    try {
        // Await the promise to get the result
        let result = await cpp.runSource(req.body.code);
        console.log(result);
        res.status(200).json({response: result});
    } catch (error) {
        // Handle any errors that occur during the execution
        res.status(500).json({error: error.message});
    }
}