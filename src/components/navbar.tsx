"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Sparkles, ChevronDown, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { CartDrawer } from "./cart-drawer";
import { HowItWorksModal } from "./how-it-works-modal";

export function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();

  // Hide customer navbar and cart drawer completely on admin console pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar - cdcare style */}
      <div className="bg-slate-950 text-slate-200 text-[11px] sm:text-xs font-medium py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Delivering joyful moments since 2021</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">
              Pay once or pay small-small weekly/monthly with <strong>0% extra fees</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              How Pay Small-Small Works
            </button>
            <span>•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} /> Midpoint Delivery Eligible
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Nav Shell */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/70 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo Brand Link */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                EK
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-tight group-hover:text-rose-600 transition-colors">
                  Everything<span className="text-rose-500">Kiddies</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 -mt-0.5 flex items-center gap-1">
                  PLAY • LEARN • GROW
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-slate-600">
              <Link
                href="/products"
                className="hover:text-rose-600 transition-colors py-2"
              >
                Shop
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-rose-600 transition-colors"
                >
                  Categories
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50">
                    <div className="rounded-2xl bg-white p-3 shadow-xl border border-slate-100 ring-1 ring-slate-900/5 space-y-1">
                      <Link
                        href="/products?category=electric-ride-ons"
                        className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        🚗 Electric Ride-On Cars
                      </Link>
                      <Link
                        href="/products?category=electric-ride-ons"
                        className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        🏍️ Kids Racing Superbikes
                      </Link>
                      <Link
                        href="/products?category=educational-stem"
                        className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        🤖 STEM & Robotics Kits
                      </Link>
                      <Link
                        href="/products?category=montessori-sensory"
                        className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        🧩 Montessori & Busy Boards
                      </Link>
                      <Link
                        href="/products?category=outdoor-sports"
                        className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        🛴 Bumper Cars & Scooters
                      </Link>
                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <Link
                          href="/products"
                          className="block px-3 py-1.5 text-[11px] font-bold text-rose-600 hover:underline"
                        >
                          View Full Catalog →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* <button
                type="button"
                onClick={() => setIsHowItWorksOpen(true)}
                className="hover:text-rose-600 transition-colors py-2 flex items-center gap-1.5"
              >
                <span>How it works</span>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                  0%
                </span>
              </button> */}

              <Link
                href="/products?featured=true"
                className="hover:text-rose-600 transition-colors py-2"
              >
                Deals
              </Link>

              <Link
                href="/#trust-section"
                className="hover:text-rose-600 transition-colors py-2"
              >
                Parents & Stories
              </Link>

              <button
                type="button"
                onClick={() => setIsHowItWorksOpen(true)}
                className="hover:text-rose-600 transition-colors py-2"
              >
                Why EverythingKiddies
              </button>
            </nav>

            {/* Desktop Right Actions: Account, Shop products button, Cart */}
            <div className="flex items-center gap-3">
              {/* Account Link */}
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg transition-colors"
              >
                Account
              </Link>

              {/* Shop products primary CTA */}
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span>Shop products</span>
                <ArrowRight size={13} />
              </Link>

              {/* Cart Drawer Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-800 transition-all border border-slate-200/50"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl px-4 pt-4 pb-8 space-y-4 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search electric cars, STEM kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </form>

            <div className="flex flex-col space-y-1 text-sm font-bold text-slate-800">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                All Products
              </Link>

              <Link
                href="/products?category=electric-ride-ons"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center justify-between"
              >
                <span>Electric Ride-On Cars & Bikes</span>
                <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">Hot</span>
              </Link>

              <Link
                href="/products?category=educational-stem"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                STEM & Robotics
              </Link>

              <Link
                href="/products?category=montessori-sensory"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                Montessori & Sensory
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsHowItWorksOpen(true);
                }}
                className="p-3 rounded-xl text-left hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center justify-between"
              >
                <span>How It Works (Pay Small-Small)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">0% Extra Fees</span>
              </button>

              <Link
                href="/products?featured=true"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                Deals & Offers
              </Link>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <Shield size={16} className="text-rose-500" />
                <span>Account & Admin Portal</span>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm text-center flex items-center justify-center gap-2 shadow-md shadow-rose-500/20"
              >
                Shop Products Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* How It Works Modal */}
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
    </>
  );
}
