"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  Truck,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HowItWorksModal } from "./how-it-works-modal";

interface HeroMessage {
  id: number;
  tagline: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineAccentColor: string;
  lede: string;
  productImage: string;
  productTitle: string;
  productSpecs: string;
  productBadge: string;
}

const HERO_MESSAGES: HeroMessage[] = [
  {
    id: 1,
    tagline: "Little Rides. Big Dreams. Endless Fun!",
    headlineLine1: "Buy original.",
    headlineLine2: "Pay for quality.",
    headlineAccentColor: "from-rose-500 via-rose-600 to-amber-500",
    lede: "Shop original licensed electric ride-on cars, superbikes, and STEM robotics kits from trusted distributors.",
    productImage: "/atcar.jpeg",
    productTitle: "AT-1719 Turbo Sports Supercar",
    productSpecs: "Dual 12V High Torque Motors • Bluetooth • Xenon Headlights",
    productBadge: "Licensed Distributor Edition",
  },
  {
    id: 2,
    tagline: "Timely Delivery",
    headlineLine1: "Receive at your desired address.",
    headlineLine2: "We deliver what you order.",
    headlineAccentColor: "from-amber-500 via-orange-500 to-rose-500",
    lede: "Your Favourite Toys, Delivered! Bringing smiles to your doorstep. Delivery available across Nigeria!",
    productImage: "/bump-car.jpeg",
    productTitle: "360° Joyful Spin Bumper Car",
    productSpecs: "Anti-Collision Rubber Ring • Safety Harness • Dual Joysticks",
    productBadge: "Doorstep Delivery.",
  },
  {
    id: 3,
    tagline: "Transparent Market Prices",
    headlineLine1: "No hidden charges.",
    headlineLine2: "Zero extra fees.",
    headlineAccentColor: "from-emerald-500 via-teal-500 to-sky-500",
    lede: "No hidden charges, zero markups. Secure Payments — Shop confidently with our supported, secure payment options.",
    productImage: "/lambo.jpeg",
    productTitle: "Lamborghini Huracán STO Supercar",
    productSpecs: "Hydraulic Scissor Doors • Leather Seat • Parental Emergency Remote",
    productBadge: "No Hidden Charges.",
  },
];

const AUTOPLAY_DELAY = 6000; // 6 seconds

export function CdcareHero() {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Autoplay effect
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const currentMessage = HERO_MESSAGES[activeMessageIndex];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const nextSlide = () => {
    setActiveMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
  };

  const prevSlide = () => {
    setActiveMessageIndex((prev) => (prev - 1 + HERO_MESSAGES.length) % HERO_MESSAGES.length);
  };

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-white pt-6 sm:pt-10 pb-12 lg:pb-16 border-b border-slate-100"
      >
        {/* Ambient subtle glow backdrops */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main 2-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Hero Copy & Dynamic Engine */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              
              {/* Pay Small Small Mark / Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                  <span>PLAY . LEARN . GROW</span>
                </div>

                <p className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Delivering joyful progress since 2021</span>
                </p>
              </div>

              {/* Dynamic Message Stage */}
              <div
                className="min-w-0 min-h-[220px] sm:min-h-[200px] flex flex-col justify-between"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] transition-all duration-300">
                    {currentMessage.headlineLine1}
                    <br />
                    <span
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${currentMessage.headlineAccentColor}`}
                    >
                      {currentMessage.headlineLine2}
                    </span>
                  </h1>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
                    {currentMessage.lede}
                  </p>
                </div>

                {/* Message Dots & Navigation Controls */}
                <div className="flex items-center gap-3 pt-5" aria-label="Homepage message carousel">
                  <div className="flex items-center gap-2">
                    {HERO_MESSAGES.map((msg, index) => {
                      const isActive = activeMessageIndex === index;
                      return (
                        <button
                          key={msg.id}
                          type="button"
                          onClick={() => setActiveMessageIndex(index)}
                          aria-label={`Show message ${index + 1}`}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-8 bg-slate-900 shadow-sm"
                              : "w-2.5 bg-slate-200 hover:bg-slate-400"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    0{activeMessageIndex + 1} / 0{HERO_MESSAGES.length}
                  </span>
                </div>
              </div>

              {/* Payment Options Row */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
                <strong className="text-slate-900 font-extrabold mr-1">Pay your way:</strong>
                <span className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors cursor-default">
                  Pay once
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200/60 transition-colors cursor-default">
                  Pay weekly
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200/60 transition-colors cursor-default">
                  Pay monthly
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-rose-600 text-white font-extrabold text-sm shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Shop original products</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/80 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Why EverythingKiddies</span>
                </button>
              </div>

              {/* CDcare signature: Embedded Search Bar */}
              <form onSubmit={handleSearch} className="pt-3 max-w-xl">
                <label
                  htmlFor="ownership-search-input"
                  className="block text-xs font-extrabold text-slate-800 mb-2"
                >
                  What do you want to own for your child?
                </label>
                <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-md shadow-slate-900/5 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
                  <Search size={18} className="text-slate-400 ml-3 shrink-0" />
                  <input
                    id="ownership-search-input"
                    type="search"
                    placeholder="Try Mercedes Benz, 360 Bumper Car, STEM Robot, or Scooter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs shrink-0 shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>Search</span>
                  </button>
                </div>
              </form>

            </div>

            {/* Right Column: Hero World & Floating Status Cards */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 select-none">
              
              {/* Product Visual Container (hero-photo) */}
              <div
                className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-[4/3] sm:aspect-[1/1] shadow-2xl border border-slate-800 group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Ambient Blurred Aura */}
                <img
                  src={currentMessage.productImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none transition-all duration-700"
                />

                {/* Subtle Showroom Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 z-[1] pointer-events-none" />

                {/* Main Product Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                  <img
                    src={currentMessage.productImage}
                    alt={currentMessage.productTitle}
                    className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Top Badge: Category & Specification */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-black px-3 py-1.5 rounded-full border border-white/10 shadow-lg flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>{currentMessage.productBadge}</span>
                  </span>
                </div>

                {/* Bottom Product Info Bar inside photo frame */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-white flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-xs sm:text-sm text-white truncate">
                      {currentMessage.productTitle}
                    </h3>
                    <p className="text-[10px] text-slate-300 truncate">
                      {currentMessage.productSpecs}
                    </p>
                  </div>
                  <Link
                    href="/products"
                    className="h-8 w-8 rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shrink-0 transition-all hover:scale-105 shadow"
                    aria-label="View product"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Next/Prev Arrow Controls */}
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Floating Card 1: CDcare Progress Card (Bottom-Left) */}
              <div className="absolute -bottom-6 -left-3 sm:-left-6 z-30 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-4 shadow-2xl max-w-[270px] sm:max-w-[290px] animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Your Ownership Plan
                  </span>
                  <span className="text-xs font-black text-rose-600">50% complete</span>
                </div>
                
                {/* Progress bar track */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden my-2">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-emerald-400 rounded-full w-1/2 transition-all duration-1000" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Truck size={14} className="text-emerald-500 shrink-0" />
                  <span>Eligible for Midpoint Delivery!</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  ₦35,000 remaining while child rides safely
                </p>
              </div>

              {/* Floating Card 2: CDcare Original Card (Top-Right) */}
              <div className="absolute -top-5 -right-3 sm:-right-5 z-30 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl py-2.5 px-3.5 shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-500">
                <div className="h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm shadow-emerald-500/20">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-tight">
                    100% Original Product
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Verified distributor warranty included
                  </p>
                </div>
              </div>

              {/* Floating Card 3: 0% Interest Pill */}
              <div className="hidden sm:flex absolute top-1/2 -right-4 -translate-y-1/2 z-30 bg-slate-900/90 backdrop-blur-md border border-white/10 text-white rounded-xl px-3 py-1.5 shadow-lg items-center gap-1.5 text-[11px] font-bold">
                <Zap size={13} className="text-amber-400" />
                <span>0% Extra fees · Direct Source</span>
              </div>

            </div>

          </div>

          {/* CDcare Trust Strip (Full Width Strip Underneath Hero) */}
          <div
            className="mt-14 pt-8 border-t border-slate-200/70"
            aria-label="Customer trust promises"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center md:text-left">
              
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-bold text-slate-800">
                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                  ✓
                </div>
                <span>100% Original products</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-bold text-slate-800">
                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                  ✓
                </div>
                <span>Trusted brand distributors</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-bold text-slate-800">
                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                  ✓
                </div>
                <span>Manufacturer warranty</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-bold text-slate-800">
                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                  ✓
                </div>
                <span>Flexible payment plans</span>
              </div>

              <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-2.5 text-xs font-bold text-slate-800">
                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                  ✓
                </div>
                <span>Nationwide delivery</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </>
  );
}
