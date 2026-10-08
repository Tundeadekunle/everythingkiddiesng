import Link from "next/link";
import { Heart, ShieldCheck, Truck, Clock, RefreshCcw } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* Value propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Nationwide Shipping</h4>
              <p className="text-xs text-slate-400">Fast doorstep delivery across all states in Nigeria.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Safe & Tested Toys</h4>
              <p className="text-xs text-slate-400">Child-safe non-toxic materials with factory certifications.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Paystack Verified</h4>
              <p className="text-xs text-slate-400">100% secure payments with debit cards & bank transfers.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
              <RefreshCcw size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Warranty Included</h4>
              <p className="text-xs text-slate-400">Battery & motor replacement guarantee on electric ride-ons.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-rose-500 text-white font-black flex items-center justify-center text-base">
                EK
              </div>
              <span className="text-lg font-black text-white">
                Everything<span className="text-rose-500">Kiddies</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nigeria&#39;s premier boutique store for luxury kids electric cars, motorbikes, STEM building sets, and interactive Montessori educational toys.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categories</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/products?category=electric-ride-ons" className="hover:text-rose-400 transition-colors">Electric Ride-On Cars</Link></li>
              <li><Link href="/products?category=electric-ride-ons" className="hover:text-rose-400 transition-colors">Kids Racing Superbikes</Link></li>
              <li><Link href="/products?category=educational-stem" className="hover:text-rose-400 transition-colors">STEM & Robotics Kits</Link></li>
              <li><Link href="/products?category=montessori-sensory" className="hover:text-rose-400 transition-colors">Montessori Busy Boards</Link></li>
              <li><Link href="/products?category=outdoor-sports" className="hover:text-rose-400 transition-colors">Outdoor Play & Scooters</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Customer Care</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/cart" className="hover:text-rose-400 transition-colors">Shopping Bag</Link></li>
              <li><Link href="/checkout" className="hover:text-rose-400 transition-colors">Checkout</Link></li>
              <li><Link href="/admin" className="hover:text-rose-400 transition-colors">Admin Portal</Link></li>
              <li><span className="text-slate-500">Lagos & Abuja Showroom Hubs</span></li>
              <li><span className="text-slate-500">WhatsApp Hotline: +234 800 543 3437</span></li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Secured Payments</h5>
            <p className="text-xs text-slate-400 mb-4">
              We accept Mastercard, Visa, Verve, and Bank Transfers processed securely through Paystack.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Secured with Paystack Nigeria
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} EverythingKiddies Nigeria. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> for smart, happy kids.
        </span>
      </div>
    </footer>
  );
}
