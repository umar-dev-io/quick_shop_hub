import React from "react";
import { Link } from "react-router";
import { ShoppingCart, LogOut } from "lucide-react";

const Navbar = ({ cartCount = 0, username = "student", onLogout }) => {
  const demoAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-sky-blue/95 backdrop-blur-md text-white shadow-md border-t-4 border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        >
          <span className="text-lg font-bold tracking-wide uppercase">
            Quick Shop
          </span>
        </Link>

        {/* Right Section: Cart, User Profile & Logout */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Cart Icon with Counter Badge */}
          <button
            type="button"
            className="relative flex items-center justify-center rounded-full border-2 border-white p-1.5 text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            
            {/* Notification Badge */}
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-sky-blue">
              {cartCount}
            </span>
          </button>

          {/* User Profile Info */}
          <div className="flex items-center gap-2 border-l border-white/20 pl-4 sm:pl-6">
            <img
              src={demoAvatar}
              alt={username}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white/50"
            />
            <span className="hidden text-sm font-semibold capitalize sm:inline-block">
              {username}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-red-600/80 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline-block">Logout</span>
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;