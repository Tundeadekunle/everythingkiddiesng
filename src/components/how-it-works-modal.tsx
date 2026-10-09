"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Calendar, Truck, ArrowRight, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [samplePrice, setSamplePrice] = useState(140000);
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly">("monthly");
  const [duration, setDuration] = useState(4); // 4 months or 16 weeks

  if (!isOpen) return null;

  const installmentAmount =
    selectedPlan === "monthly"
      ? Math.round(samplePrice / duration)
      : Math.round(samplePrice / (duration * 4));

  const deliveryMilestone =
    selectedPlan === "monthly"
      ? Math.ceil(duration / 2)
      : Math.ceil((duration * 4) / 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-slate-100">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 mb-3">
              <Sparkles size={13} className="text-rose-400" />
              <span>The CDcare-Inspired Model for Kids</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Buy Original. <span className="text-rose-400">Pay Small-Small.</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg leading-relaxed">
              No loan sharks. No balloon interest. Spread payments weekly or monthly and receive your ride-on car or toy before finishing payment!
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
            {/* The 4-Step Journey */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                The 4-Step Ownership Journey
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-7 rounded-lg bg-rose-100 text-rose-600 font-black text-xs flex items-center justify-center">
                      01
                    </span>
                    <h4 className="text-sm font-black text-slate-900">Choose Original</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Select authentic licensed electric cars, superbikes, or STEM kits directly from verified brand distributors.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-7 rounded-lg bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center">
                      02
                    </span>
                    <h4 className="text-sm font-black text-slate-900">Choose Your Pace</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pay upfront in full, or choose a comfortable weekly or monthly installment plan with <strong>0% extra fees</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-7 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                      03
                    </span>
                    <h4 className="text-sm font-black text-rose-950">Receive at your desired address</h4>
                  </div>
                  <p className="text-xs text-rose-900/80 leading-relaxed font-medium">
                    At the exact <strong>halfway mark (midpoint)</strong> of your plan time, your child's vehicle is delivered to your doorstep!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      04
                    </span>
                    <h4 className="text-sm font-black text-emerald-950">Complete Ownership</h4>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed font-medium">
                    Continue your scheduled payments with total peace of mind while your child enjoys their ride-on car.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Calculator Simulator */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Zap size={16} className="text-amber-400" />
                    Interactive Plan Simulator
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    See how your installment schedule and delivery milestone work
                  </p>
                </div>
                <div className="flex items-center bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedPlan("weekly")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedPlan === "weekly" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setSelectedPlan("monthly")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedPlan === "monthly" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">
                    Sample Toy Price
                  </label>
                  <select
                    value={samplePrice}
                    onChange={(e) => setSamplePrice(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rose-500"
                  >
                    <option value={45000}>₦45,000 (STEM Kit / Scooter)</option>
                    <option value={95000}>₦95,000 (Kids Superbike)</option>
                    <option value={140000}>₦140,000 (Dual Motor Ride-On)</option>
                    <option value={220000}>₦220,000 (Lamborghini Huracán)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">
                    Plan Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rose-500"
                  >
                    <option value={2}>2 Months (8 Weeks)</option>
                    <option value={3}>3 Months (12 Weeks)</option>
                    <option value={4}>4 Months (16 Weeks)</option>
                    <option value={6}>6 Months (24 Weeks)</option>
                  </select>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 font-semibold block">You Pay</span>
                  <div className="text-base sm:text-lg font-black text-rose-400">
                    {formatPrice(installmentAmount)}
                    <span className="text-xs text-slate-400 font-normal">
                      /{selectedPlan === "monthly" ? "month" : "week"}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">
                    🚚 Delivered at {selectedPlan === "monthly" ? `Month ${deliveryMilestone}` : `Week ${deliveryMilestone}`}!
                  </span>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Zero Interest Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck size={16} className="text-rose-500 shrink-0" />
                <span>1-Year Distributor Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Truck size={16} className="text-amber-500 shrink-0" />
                <span>Doorstep Nationwide Delivery</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/products"
                onClick={onClose}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm text-center shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
              >
                Browse Available Toys & Rides
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
              >
                Got it, Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
