"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Shield, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { CartDrawer } from "./cart-drawer";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Announcement */}
      <div className="bg-slate-900 text-slate-100 text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles size={13} className="text-amber-400" />
        <span>• Fast Doorstep Delivery across Nigeria • Electric Rides & Toys</span>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-rose-500/20">
                EK
              </div>
              <div>
                <span className="font-extrabold text-xl text-slate-900 tracking-tight block leading-tight">
                  Everything<span className="text-rose-500">Kiddies</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-0.5">
                  Ride-Ons & Educational Toys
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <Link href="/products?category=electric-ride-ons" className="hover:text-rose-600 transition-colors">
                Electric Cars & Bikes
              </Link>
              <Link href="/products?category=educational-stem" className="hover:text-rose-600 transition-colors">
                STEM & Robotics
              </Link>
              <Link href="/products?category=montessori-sensory" className="hover:text-rose-600 transition-colors">
                Montessori
              </Link>
              <Link href="/products" className="hover:text-rose-600 transition-colors">
                All Toys
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs relative">
              <input
                type="text"
                placeholder="Search electric cars, STEM kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            </form>

            {/* Actions: Admin Portal Link & Cart */}
            <div className="flex items-center gap-3">
              {/* <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Shield size={14} className="text-rose-500" />
                <span>Admin</span>
              </Link> */}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center h-11 w-11 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 transition-all"
                aria-label="View Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search toys & ride-ons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            </form>

            <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
              <Link
                href="/products?category=electric-ride-ons"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                Electric Cars & Bikes
              </Link>
              <Link
                href="/products?category=educational-stem"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                STEM & Robotics
              </Link>
              <Link
                href="/products?category=montessori-sensory"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                Montessori & Sensory
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                All Products
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-rose-600 bg-rose-50 flex items-center gap-2"
              >
                <Shield size={16} /> Admin Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
