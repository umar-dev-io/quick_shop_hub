import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { ShieldCheck, Info } from "lucide-react";
import quickShopLogo from "../assets/logo/quickShopLogo.png";

const PublicLayout = () => {
  const location = useLocation();

  // Helper function to apply active link styling dynamically
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 font-sans antialiased relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs for Ambient Glow */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-sky-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 -z-10 h-80 w-80 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />

      {/* Modern Glassmorphism Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-105 focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-blue/10 p-2 ring-4 ring-sky-blue/5 transition-colors group-hover:bg-sky-blue/20">
              <img
                src={quickShopLogo}
                alt="QuickShop Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800 transition-colors group-hover:text-sky-blue">
              Quick<span className="text-sky-blue">Shop</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-3">
            
            {/* About Page Link */}
            <Link
              to="/privateAbout"
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 ${
                isActive("/about")
                  ? "bg-sky-blue/10 text-sky-blue shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>

            {/* Admin Portal Button */}
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                isActive("/admin")
                  ? "border-amber-500/30 bg-amber-50 text-amber-600"
                  : "border-slate-200 bg-white text-slate-700 shadow-xs hover:border-amber-400 hover:bg-amber-50/50 hover:text-amber-600 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>Admin</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Animated Outlet Container */}
      <main className="flex-1 animate-[fadeIn_0.3s_ease-out]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs font-medium text-slate-400">
        <p>© {new Date().getFullYear()} QuickShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;