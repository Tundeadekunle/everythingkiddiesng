"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, Loader2, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Welcome back to Admin Portal!");
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-3.5 sm:p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400">EverythingKiddies Store Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@everythingkiddies.com"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Mail size={15} className="absolute left-3 top-3 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Lock size={15} className="absolute left-3 top-3 text-slate-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In to Admin Portal"}
          </button>
        </form>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700 text-xs">
          <Link
            href="/admin/signup"
            className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5"
          >
            <UserPlus size={14} />
            <span>Register New Admin</span>
          </Link>

          <Link
            href="/"
            className="text-slate-400 hover:text-slate-200 font-semibold flex items-center gap-1"
          >
            ← Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
