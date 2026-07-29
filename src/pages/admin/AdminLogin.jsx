import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Eye, EyeOff, ShieldCheck, LogIn, UserCheck } from "lucide-react";
import quickShopLogo from "../../assets/logo/quickShopLogo.png";
import umarImage from "../../assets/personal/umar876.jpeg";

// Set your Admin Credentials
const ADMIN_CREDENTIALS = {
  username: "Umar Farooq",
  password: "12345678", 
};

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (password === ADMIN_CREDENTIALS.password) {
      // Set admin flag in localStorage for AdminProtectedRoute
      localStorage.setItem("isAdmin", "true");
      
      // Navigate directly to the Admin Dashboard
      navigate("/admin");
    } else {
      setError("Incorrect administrator password!");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-900 p-4 overflow-hidden font-sans">
      
      {/* Dynamic Animated Ambient Background Lights */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-sky-500/20 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none animate-pulse delay-700" />

      {/* Main Glassmorphism Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-800/80 p-6 sm:p-8 shadow-2xl border border-slate-700/60 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 animate-[fadeInUp_0.5s_ease-out]">
        
        {/* QuickShop Logo Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 p-2.5 border border-slate-700 shadow-xl ring-4 ring-slate-900">
          <img
            src={quickShopLogo}
            alt="QuickShop Logo"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Profile Section */}
        <div className="mt-4 mb-6 text-center flex flex-col items-center">
          
          {/* Admin Avatar Photo Frame */}
          <div className="relative mb-3 group">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-amber-400 p-1 bg-slate-700 shadow-lg shadow-amber-500/10 transition-transform duration-300 group-hover:scale-105">
              <img
                src={umarImage} 
                alt="Umar Farooq"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            {/* Verified Security Badge */}
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-md ring-2 ring-slate-800">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Admin Name & Role */}
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            Umar Farooq
          </h2>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-400/20">
            <UserCheck className="h-3 w-3" /> System Administrator
          </span>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 p-2.5 border border-red-500/30 flex items-center justify-center animate-[shake_0.3s_ease-in-out]">
            <p className="text-center text-xs font-semibold text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-300 mb-1"
            >
              Admin Master Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-amber-400 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 pl-9 pr-9 py-2.5 text-xs text-white placeholder-slate-500 font-medium transition-all duration-200 focus:bg-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-slate-400 hover:text-amber-400 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 px-4 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition-all duration-200 mt-2"
          >
            <span>Access Dashboard</span>
            <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;