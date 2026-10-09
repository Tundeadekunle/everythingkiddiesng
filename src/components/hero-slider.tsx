"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Sparkles, ArrowRight, Zap, Play, Pause } from "lucide-react";

interface HeroSlide {
  id: string;
  image: string;
  fallbackImage: string;
  alt: string;
  title: string;
  badge: string;
  badgeIcon: "award" | "shield" | "sparkles";
  tag: string;
  specs: string;
  href: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: "atcar",
    image: "/atcar.jpeg",
    fallbackImage: "/uploads/atcar.jpeg",
    alt: "AT-1719 Turbo Sports Super Ride-On Car with LED Headlights",
    title: "AT-1719 Turbo Sport Edition",
    badge: "Parental Remote & Xenon LEDs",
    badgeIcon: "award",
    tag: "Dual 12V High Torque",
    specs: "Dual Motor • Xenon LED Lights • Bluetooth Audio",
    href: "/products?category=electric-ride-ons",
  },
  {
    id: "bump-car",
    image: "/bump-car.jpeg",
    fallbackImage: "/uploads/bump-car.jpeg",
    alt: "360 Spin Electric Bumper Car for Kids",
    title: "360° Joyful Spin Bumper Car",
    badge: "Soft Rubber Anti-Collision Ring",
    badgeIcon: "shield",
    tag: "360° Joyful Spin Mode",
    specs: "Safety Harness • Joyful Music • Dual Joysticks",
    href: "/products?category=electric-ride-ons",
  },
  {
    id: "lambo",
    image: "/lambo.jpeg",
    fallbackImage: "/uploads/lambo.jpeg",
    alt: "Lamborghini Huracán STO Kids Electric Supercar",
    title: "Lamborghini Huracán STO Supercar",
    badge: "Hydraulic Butterfly Doors",
    badgeIcon: "sparkles",
    tag: "Official Supercar Edition",
    specs: "Hydraulic Scissor Doors • Leather Seat • Drift Mode",
    href: "/products?category=electric-ride-ons",
  },
];

const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds per slide

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -40) {
        nextSlide();
      } else if (touchDeltaX > 40) {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsPaused(false);
  };

  const activeSlide = SLIDES[currentIndex];

  const renderBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case "award":
        return <Award size={13} className="text-amber-400 shrink-0" />;
      case "shield":
        return <ShieldCheck size={13} className="text-emerald-400 shrink-0" />;
      case "sparkles":
      default:
        return <Sparkles size={13} className="text-sky-400 shrink-0" />;
    }
  };

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl bg-white p-3 border border-slate-100 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Viewport */}
      <div
        className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 flex items-center justify-center overflow-hidden bg-slate-900"
            >
              {/* Ambient atmospheric blurred backdrop */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                onError={(e) => {
                  if (e.currentTarget.src !== slide.fallbackImage) {
                    e.currentTarget.src = slide.fallbackImage;
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-35 brightness-90 transition-all duration-700 pointer-events-none"
              />

              {/* Subtle gradient vignette to give showroom contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 z-[1] pointer-events-none" />

              {/* Main crisp ride-on photo */}
              <img
                src={slide.image}
                alt={slide.alt}
                onError={(e) => {
                  if (e.currentTarget.src !== slide.fallbackImage) {
                    e.currentTarget.src = slide.fallbackImage;
                  }
                }}
                className="relative z-10 w-full h-full object-contain p-2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Dynamic Top Badge */}
        <div className="absolute top-3 left-3 z-20 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10 transition-all duration-300">
          {renderBadgeIcon(activeSlide.badgeIcon)}
          <span className="truncate max-w-[200px] sm:max-w-none">{activeSlide.badge}</span>
        </div>

        {/* Dynamic Bottom-Right Spec Tag */}
        <div className="absolute bottom-3 right-3 z-20 bg-rose-500/95 backdrop-blur-sm text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg border border-rose-400/20 transition-all duration-300">
          {activeSlide.tag}
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg border border-white/10"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg border border-white/10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-6 bg-rose-500 shadow-sm"
                  : "w-2 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Autoplay Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <div
            key={currentIndex + (isPaused ? "-paused" : "-active")}
            className="h-full bg-gradient-to-r from-rose-500 to-amber-400"
            style={{
              animation: isPaused ? "none" : `heroSlideProgress ${AUTOPLAY_INTERVAL}ms linear`,
            }}
          />
        </div>
      </div>

      {/* Slide Info & Quick Link Footer */}
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
              Slide {currentIndex + 1} of {SLIDES.length}
            </span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate mt-1 transition-all duration-300">
            {activeSlide.title}
          </h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {activeSlide.specs}
          </p>
        </div>

        <Link
          href={activeSlide.href}
          aria-label={`Explore ${activeSlide.title}`}
          className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-700 transition-all hover:scale-105 shadow-sm"
        >
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Mini Thumbnails Selector */}
      <div className="px-4 pb-2 pt-0 grid grid-cols-3 gap-2 border-t border-slate-100/80 pt-3">
        {SLIDES.map((slide, idx) => {
          const isSelected = currentIndex === idx;
          return (
            <button
              key={`thumb-${slide.id}`}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-rose-400 bg-rose-50/50 shadow-sm"
                  : "border-slate-100 hover:border-slate-200 bg-slate-50/50 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-900 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-[11px] font-bold truncate leading-tight ${isSelected ? "text-rose-600" : "text-slate-700"}`}>
                  {slide.title.split(" ")[0]}
                </p>
                <p className="text-[9px] text-slate-400 truncate">
                  {slide.id === "atcar" ? "Sport" : slide.id === "bump-car" ? "Bumper" : "Supercar"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
