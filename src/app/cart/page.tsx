"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalAmount, getTotalItems } = useCartStore();

  const totalAmount = getTotalAmount();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="h-20 w-20 mx-auto rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
          <ShoppingBag size={36} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8">
          Looks like you haven&#39;t added any electric cars, bikes or STEM kits yet.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
        >
          Explore Catalog
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Bag</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your items before proceeding to Paystack secure checkout
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
        >
          Clear all items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 rounded-xl object-cover bg-slate-50 flex-shrink-0"
              />

              <div className="flex-1 w-full space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-bold text-sm text-slate-900 hover:text-rose-600 line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="text-sm font-extrabold text-rose-600">
                  {formatPrice(item.price)}
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 text-xs font-black text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-30"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="text-sm font-black text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal ({totalItems})</span>
                <span className="font-bold text-slate-800">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-emerald-600">Calculated at Checkout</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-black text-slate-900">
                <span>Estimated Total</span>
                <span className="text-lg text-rose-600">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 justify-center">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Protected by Paystack Secure Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
