import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import quickShopLogo from "../../assets/logo/quickShopLogo.png";

const USER_CREDENTIALS = {
  username: "student",
  password: "12345678",
};

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      form.username === USER_CREDENTIALS.username &&
      form.password === USER_CREDENTIALS.password
    ) {
      if (onLogin) onLogin();
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="relative flex h-screen items-center justify-center bg-slate-50 p-4 overflow-hidden">
      {/* Background glow accents using sky-blue */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 sm:p-8 shadow-2xl border border-sky-blue/20 transition-all duration-300 hover:shadow-sky-blue/15 animate-[fadeInUp_0.4s_ease-out]">
        
        {/* Header & Logo Section */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-blue/10 p-3 ring-8 ring-sky-blue/5 transition-transform duration-300 hover:scale-105">
            <img
              src={quickShopLogo}
              alt="QuickShop Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Please enter your credentials to log in.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-200 flex items-center justify-center animate-[shake_0.3s_ease-in-out]">
            <p className="text-center text-sm font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-5 w-5 text-sky-blue transition-colors pointer-events-none" />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-sky-blue/30 bg-slate-50/50 pl-11 pr-4 py-3 text-slate-800 placeholder-slate-400 font-medium transition-all duration-200 hover:bg-white focus:bg-white focus:border-sky-blue focus:outline-none focus:ring-4 focus:ring-sky-blue/15"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-5 w-5 text-sky-blue transition-colors pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-sky-blue/30 bg-slate-50/50 pl-11 pr-11 py-3 text-slate-800 placeholder-slate-400 font-medium transition-all duration-200 hover:bg-white focus:bg-white focus:border-sky-blue focus:outline-none focus:ring-4 focus:ring-sky-blue/15"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 text-sky-blue hover:text-sky-blue/80 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-sky-blue py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-sky-blue/25 hover:bg-sky-blue/90 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-sky-blue/30 transition-all duration-200 mt-2"
          >
            <span>Login</span>
            <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;