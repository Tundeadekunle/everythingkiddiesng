import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { OrderSuccessClient } from "./order-success-client";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, or } from "drizzle-orm";

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

  let orderData = null;
  try {
    const lookupRef = reference || orderNumber;
    orderData = await db.query.orders.findMany({
      where: or(
        eq(orders.orderNumber, orderNumber),
        eq(orders.paystackReference, lookupRef)
      ),
      with: {
        items: true,
      },
      limit: 1,
    });
  } catch (e) {
    // DB lookup is optional / fallback gracefully
  }

  const order = orderData && orderData.length > 0 ? orderData[0] : null;
  const isPaid = order ? order.status === "paid" : true;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <OrderSuccessClient />

      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className={`h-20 w-20 mx-auto rounded-full flex items-center justify-center ${
          isPaid ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
        }`}>
          {isPaid ? <CheckCircle2 size={44} /> : <Clock size={44} />}
        </div>

        <div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            isPaid ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
          }`}>
            {isPaid ? "Payment Verified & Confirmed" : "Payment Pending Confirmation"}
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
            {isPaid ? "Thank You for Your Order!" : "Order Received!"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {isPaid
              ? "We have confirmed your payment via Paystack and our dispatch team is prepping your kids' items."
              : "Your payment is being confirmed. You will receive an update shortly once processed."}
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
          {order && (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Customer:</span>
                <span className="font-medium text-slate-800">{order.customerName} ({order.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Total Paid:</span>
                <span className="font-bold text-rose-600">{formatPrice(order.totalAmount)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Status:</span>
            <span className={`font-bold capitalize ${isPaid ? "text-emerald-600" : "text-amber-600"}`}>
              {order?.status || (isPaid ? "Paid / Processing" : "Pending")}
            </span>
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
