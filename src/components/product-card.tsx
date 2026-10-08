"use client";

import Image from "next/link";
import Link from "next/link";
import { ShoppingBag, Eye, Zap } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "./rating-stars";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    slug: string;
    price: string | number;
    compareAtPrice?: string | number | null;
    rating: string | number;
    reviewsCount: number;
    stock: number;
    images: string[];
    badge?: string | null;
    category?: { name: string; slug: string } | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const primaryImage = product.images?.[0] || "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80";
  const numPrice = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  const numComparePrice = product.compareAtPrice
    ? typeof product.compareAtPrice === "string"
      ? parseFloat(product.compareAtPrice)
      : product.compareAtPrice
    : null;

  const discountPercent = numComparePrice && numComparePrice > numPrice
    ? Math.round(((numComparePrice - numPrice) / numComparePrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) {
      toast.error("This product is currently out of stock");
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: numPrice,
      image: primaryImage,
      stock: product.stock,
    });

    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <Link href={`/products/${product.slug}`}>
          <img
            src={primaryImage}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm">
              <Zap size={11} className="fill-white" />
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900 shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Stock warning */}
        {product.stock <= 0 ? (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white/90 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : product.stock <= 3 ? (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
            Only {product.stock} left!
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {product.category && (
          <span className="text-[11px] font-semibold tracking-wider text-rose-500 uppercase mb-1">
            {product.category.name}
          </span>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-rose-600 transition-colors mb-2"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        {/* Price & Cart button */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
          <div>
            <div className="text-base font-extrabold text-slate-900">
              {formatPrice(numPrice)}
            </div>
            {numComparePrice && numComparePrice > numPrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(numComparePrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            aria-label="Add to cart"
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
