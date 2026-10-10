"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, User, Mail, Lock, Phone, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in name, email, and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "signup",
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Admin account created & registered in NeonDB!");
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to register admin");
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
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Sign Up</h1>
          <p className="text-xs text-slate-400">
            Create an administrator account stored in NeonDB
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Admin Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Store Manager"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <User size={15} className="absolute left-3 top-3 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Admin Email *</label>
            <div className="relative">
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="manager@everythingkiddies.com"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Mail size={15} className="absolute left-3 top-3 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08012345678"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Phone size={15} className="absolute left-3 top-3 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
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
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Registering to NeonDB...
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Register New Admin
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-700">
          Already registered?{" "}
          <Link href="/admin/login" className="font-bold text-rose-400 hover:underline">
            Admin Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
