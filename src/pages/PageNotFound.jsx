import React from "react";
import { Link } from "react-router";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />

      {/* Main Container Card (Reduced max-width to max-w-sm and padding to p-6) */}
      <div className="relative w-full max-w-sm text-center rounded-2xl bg-white p-6 shadow-xl border border-sky-blue/20 transition-all duration-300 hover:shadow-sky-blue/15 animate-[fadeInUp_0.4s_ease-out]">
        
        {/* Animated Icon Container */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-blue/10 p-3.5 ring-4 ring-sky-blue/5 transition-transform duration-300 hover:scale-105">
          <FileQuestion className="h-full w-full text-sky-blue animate-bounce" />
        </div>

        {/* 404 Large Text & Message */}
        <h1 className="text-4xl font-black text-sky-blue tracking-tight sm:text-5xl">
          404
        </h1>
        <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">
          Page Not Found
        </h2>
        <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        {/* Navigation Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link
            to="/"
            className="group relative w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg bg-sky-blue py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-sky-blue/25 hover:bg-sky-blue/90 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky-blue/30 transition-all duration-200"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg border border-sky-blue/30 bg-slate-50/50 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-white hover:border-sky-blue focus:outline-none focus:ring-2 focus:ring-sky-blue/15 transition-all duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-sky-blue" />
            <span>Go Back</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PageNotFound;