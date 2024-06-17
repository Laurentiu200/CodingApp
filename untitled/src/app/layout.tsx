import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import RecoidContextProvider from "@/app/atoms/authModalAthoms";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding and Learning",
  description: "Solve problems, upload solutions and try to get best results!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer/>
      <RecoidContextProvider>{children}</RecoidContextProvider>
      </body>
    </html>
  );
}
