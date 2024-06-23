
import MainNavigationBar from "@/components/MainNavigationBar/MainNavigationBar";
import ProblemPage from "@/components/ProblemPage/ProblemPage";
import "react-toastify/dist/ReactToastify.css"
import React, {useState} from "react";

export default function Home() {
  return (
      <main className="min-h-screen bg-white">
        <MainNavigationBar/>
        <ProblemPage/>
      </main>
  );
}
