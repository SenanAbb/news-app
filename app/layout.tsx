import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News App",
  description: "News App",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${inter.className}  bg-gray-100 dark:bg-zinc-900 transition-all duration-700`}
        >
          <Header />
          <div className="max-w-6xl mx-auto">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
