"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ClipboardList,
  LogOut,
  Store,
  Home,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Do not render admin sidebar on login or signup pages
  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return null;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "All Products", href: "/admin/products", icon: Package },
    { label: "Add New Product", href: "/admin/products/new", icon: PlusCircle },
    { label: "Customer Orders", href: "/admin/orders", icon: ClipboardList },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full min-h-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center font-black text-white text-base shadow-sm">
              EK
            </div>
            <div>
              <span className="font-extrabold text-sm block tracking-tight text-white">Admin Console</span>
              <span className="text-[10px] text-slate-400 font-semibold block">EverythingKiddies</span>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close admin menu"
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-800"
                }`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="space-y-2 pt-5 border-t border-slate-800 mt-6">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Store size={16} />
            <span>View Public Store</span>
          </div>
          <ExternalLink size={13} className="text-slate-500" />
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 active:bg-rose-500/30 transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header for Admin - Logo on left, Home and Menu icons separated on the right */}
      <header className="lg:hidden bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30 shadow-sm w-full max-w-full">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center font-black text-white text-xs flex-shrink-0 shadow-sm">
            EK
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-xs block leading-tight text-white">Admin Console</span>
            <span className="text-[10px] text-slate-400 block leading-tight">EverythingKiddies</span>
          </div>
        </div>

        {/* Separated Home and Menu icons */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white active:bg-slate-700 transition-colors flex items-center justify-center"
            title="View public store"
          >
            <Home size={16} />
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open admin menu"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white active:bg-slate-700 transition-colors flex items-center justify-center"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-slate-900 text-white p-5 flex flex-col z-10 shadow-2xl overflow-y-auto">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white min-h-screen p-5 flex-col justify-between flex-shrink-0">
        {navContent}
      </aside>
    </>
  );
}
