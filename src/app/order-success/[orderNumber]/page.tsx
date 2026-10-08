import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { OrderSuccessClient } from "./order-success-client";

interface OrderSuccessProps {
  params: Promise<{
    orderNumber: string;
  }>;
  searchParams: Promise<{
    reference?: string;
  }>;
}

export default async function OrderSuccessPage({ params, searchParams }: OrderSuccessProps) {
  const { orderNumber } = await params;
  const { reference } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <OrderSuccessClient />

      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="h-20 w-20 mx-auto rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
          <CheckCircle2 size={44} />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Payment Verified & Confirmed
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            We have received your payment via Paystack and our dispatch team is prepping your kids&#39; items.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Order Reference:</span>
            <span className="font-mono font-bold text-slate-900">{orderNumber}</span>
          </div>
          {reference && (
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Paystack Ref:</span>
              <span className="font-mono font-bold text-slate-700">{reference}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Status:</span>
            <span className="font-bold text-emerald-600">Paid / Processing</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href="/products"
            className="flex-1 py-3 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 px-6 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
