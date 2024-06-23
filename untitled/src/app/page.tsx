"use client";

import MainNavigationBar from "@/app/components/MainNavigationBar/MainNavigationBar";
import ProblemPage from "@/app/components/ProblemPage/ProblemPage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import React, {useState} from "react";

export default function Home() {

  const [loadingProblems, setLoadingProblems] = useState(false)
  return (
    <main className="min-h-screen bg-white">
    <MainNavigationBar/>
          <ProblemPage/>
    </main>
  );
}



import React, { useState } from 'react';

export default function Home() {

  return (  const [javaCode, setJavaCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEventHandler<HTMLFormElement>) => {

    setOutput('');
    setError('');

    const response = await fetch('/api/compileJava', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ javaCode })
    });

    const data = await response.json();
    if (response.ok) {
      setOutput(data.output);
      setError(data.error);
    } else {
      setError(data.error);
    }
  };

  <div>
        <h1>Compile Java Code</h1>
        <form onSubmit={handleSubmit}>
        <textarea
            value={javaCode}
            onChange={(e) => setJavaCode(e.target.value)}
            placeholder="Enter Java code here"
        />
          <br />
          <button type="submit">Compile and Run</button>
        </form>
        {output && (
            <div>
              <h2>Output:</h2>
              <pre>{output}</pre>
            </div>
        )}
        {error && (
            <div>
              <h2>Error:</h2>
              <pre>{error}</pre>
            </div>
        )}
      </div>
  );
}
