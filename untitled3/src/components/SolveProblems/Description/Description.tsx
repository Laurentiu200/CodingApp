import React from "react";
import {Problem, ProblemDetails} from "@/utils/problemType/ProblemStructure";
import ProblemBar from "@/components/ProblemBar/ProblemBar";

type DescriptionProps = {
    problem: Problem
    setProblem: React.Dispatch<React.SetStateAction<Problem>>
}
const Description: React.FC<DescriptionProps> = ({problem, setProblem}) => {
    return (
        <div className={"flex-col mx-24 my-5 border-2 border-blue-300 rounded-xl"} >
            <ProblemBar starred={problem.starred} difficulty={problem.difficulty} title={problem.title} score={problem.bestScore} problemId={problem.id} setProblem={setProblem}/>
            <div className='flex-nowrap px-0 py-4 h-[calc(100vh-94px)]  overflow-y-auto border-blue-700'>
                <div className='px-5'>
                    <div className='w-full'>
                        <div className='text-black text-md mt-3'>
                            <div dangerouslySetInnerHTML={{__html: problem.problemStatement}}>
                            </div>
                        </div>

                        <div className='mt-4'>
                            {problem.examples.map((example, index) => (
                                <div key={example.id}>
                                    <p style={{fontSize: "24px"}} className=' text-black '>Example {index + 1}: </p>
                                    <div className='example-card'>
										<pre>
											<strong className='text-black'>Input: </strong> {example.inputText}
                                            <br/>
											<strong>Output:</strong> {example.outputText}
                                            <br/>
                                            {
                                                example.explanation && (
                                                    <>
                                                        <strong>Explanation:</strong> {example.explanation}
                                                    </>)
                                            }
										</pre>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className='my-8 pb-4 '>
                            <p style={{fontSize: "24px"}} className=' text-black '>Constraints: </p>
                            <ul className='text-black ml-5 list-disc'>
                              <div dangerouslySetInnerHTML={{__html: problem.constraints}}/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;