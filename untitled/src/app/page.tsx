"use client";

import MainBar from "@/app/components/MainNavigationBar/page";
import ProblemPage from "@/app/components/ProblemPage/page";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import React, {useState} from "react";

export default function Home() {

  const [loadingProblems, setLoadingProblems] = useState(false)
  return (
    <main className="min-h-screen bg-white">
    <MainBar/>

          <ProblemPage/>

    </main>
  );
}