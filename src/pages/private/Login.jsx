import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { LogInOutUse } from "../../context/LogInOutContext";
import quickShopLogo from "../../assets/logo/quickShopLogo.png";

const USER_CREDENTIALS = {
  username: "student",
  password: "12345678",
};

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  const { onLogin } = LogInOutUse();
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
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-sky-blue/15 blur-3xl pointer-events-none" />

      {/* Login Card (Reduced max-width to max-w-sm and padding to p-6) */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-sky-blue/20 transition-all duration-300 hover:shadow-sky-blue/15 animate-[fadeInUp_0.4s_ease-out]">
        {/* Header & Logo Section */}
        <div className="mb-5 text-center flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-blue/10 p-2.5 ring-4 ring-sky-blue/5 transition-transform duration-300 hover:scale-105">
            <img
              src={quickShopLogo}
              alt="QuickShop Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Please enter your credentials to log in.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-2.5 border border-red-200 flex items-center justify-center animate-[shake_0.3s_ease-in-out]">
            <p className="text-center text-xs font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 h-4 w-4 text-sky-blue transition-colors pointer-events-none" />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-lg border border-sky-blue/30 bg-slate-50/50 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 font-medium transition-all duration-200 hover:bg-white focus:bg-white focus:border-sky-blue focus:outline-none focus:ring-2 focus:ring-sky-blue/15"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-sky-blue transition-colors pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-sky-blue/30 bg-slate-50/50 pl-9 pr-9 py-2 text-xs text-slate-800 placeholder-slate-400 font-medium transition-all duration-200 hover:bg-white focus:bg-white focus:border-sky-blue focus:outline-none focus:ring-2 focus:ring-sky-blue/15"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-sky-blue hover:text-sky-blue/80 focus:outline-none transition-colors"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex items-center justify-center gap-1.5 rounded-lg bg-sky-blue py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-sky-blue/25 hover:bg-sky-blue/90 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky-blue/30 transition-all duration-200 mt-1"
          >
            <span>Login</span>
            <LogIn className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
