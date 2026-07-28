import React from "react";
import { Link } from "react-router";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="relative flex h-screen items-center justify-center bg-slate-50 p-4 overflow-hidden">
      {/* Background glow accents using sky-blue */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative w-full max-w-lg text-center rounded-3xl bg-white p-8 sm:p-12 shadow-2xl border border-sky-blue/20 transition-all duration-300 hover:shadow-sky-blue/15 animate-[fadeInUp_0.4s_ease-out]">
        
        {/* Animated Icon Container */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-sky-blue/10 p-5 ring-8 ring-sky-blue/5 transition-transform duration-300 hover:scale-105">
          <FileQuestion className="h-full w-full text-sky-blue animate-bounce" />
        </div>

        {/* 404 Large Text & Message */}
        <h1 className="text-6xl font-black text-sky-blue tracking-tight sm:text-7xl">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mt-3 text-sm text-slate-500 sm:text-base font-medium leading-relaxed">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        {/* Navigation Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-blue py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-sky-blue/25 hover:bg-sky-blue/90 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-sky-blue/30 transition-all duration-200"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-sky-blue/30 bg-slate-50/50 py-3.5 px-6 text-sm font-semibold text-slate-700 hover:bg-white hover:border-sky-blue focus:outline-none focus:ring-4 focus:ring-sky-blue/15 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 text-sky-blue" />
            <span>Go Back</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PageNotFound;