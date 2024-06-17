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