"use client";

import { useState } from "react";
import { ShoppingBag, Zap, Check, Heart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/rating-stars";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductClientProps {
  product: {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string | number;
    compareAtPrice?: string | number | null;
    rating: string | number;
    reviewsCount: number;
    stock: number;
    images: string[];
    badge?: string | null;
  };
}

export function ProductGalleryAndCart({ product }: ProductClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"];

  const numPrice = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  const numComparePrice = product.compareAtPrice
    ? typeof product.compareAtPrice === "string"
      ? parseFloat(product.compareAtPrice)
      : product.compareAtPrice
    : null;

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }
    addItem(
      {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: numPrice,
        image: images[0],
        stock: product.stock,
      },
      quantity
    );
    toast.success(`Added ${quantity} ${product.title} to your bag!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-8">
      {/* Gallery Section */}
      <div className="space-y-4">
        {/* Main active image */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center p-4">
          <img
            src={images[selectedImageIndex]}
            alt={product.title}
            className="w-full h-full object-contain object-center rounded-2xl"
          />

          {product.badge && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Zap size={13} className="fill-white" />
              {product.badge}
            </span>
          )}
        </div>

        {/* Thumbnail Carousel */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 bg-white p-1 transition-all ${
                  selectedImageIndex === index
                    ? "border-rose-500 ring-2 ring-rose-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Details & Pricing */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-4">
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size={18} />
            <span className="text-slate-300">Ã¢â‚¬Â¢</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>

        {/* Price display */}
        <div className="flex items-baseline gap-3 pb-6 border-b border-slate-100">
          <span className="text-3xl font-black text-slate-900">
            {formatPrice(numPrice)}
          </span>
          {numComparePrice && numComparePrice > numPrice && (
            <span className="text-lg text-slate-400 line-through font-semibold">
              {formatPrice(numComparePrice)}
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-700">Quantity</span>
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3.5 py-2 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors"
              >
                -
              </button>
              <span className="px-4 text-xs font-extrabold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                className="px-3.5 py-2 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="py-3.5 px-6 rounded-2xl border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              Add to Bag
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="py-3.5 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Zap size={18} />
              Buy Now with Paystack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
