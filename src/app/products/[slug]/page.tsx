import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/rating-stars";
import { ProductGalleryAndCart } from "./product-client";
import { ShieldCheck, Truck, RotateCcw, Zap } from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-rose-600 transition-colors">Products</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-rose-600 transition-colors"
            >
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-900 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Product Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Gallery & Buy Form */}
        <div className="lg:col-span-7">
          <ProductGalleryAndCart product={product} />
        </div>

        {/* Right Column: Specs, Badges & Assurance */}
        <div className="lg:col-span-5 space-y-6">
          {/* Product Specifications Box */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
              <Zap size={16} className="text-amber-500" />
              <span>Features & Specifications</span>
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <dl className="divide-y divide-slate-100 text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-2.5 flex justify-between gap-4">
                    <dt className="font-semibold text-slate-500">{key}</dt>
                    <dd className="font-bold text-slate-900 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-xs text-slate-500">
                Premium grade build, ASTM and CE certified materials for kid safety.
              </p>
            )}
          </div>

          {/* Delivery & Warranty Information */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Buyer Protection & Delivery
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Truck size={16} className="text-rose-500 flex-shrink-0" />
                <span>Doorstep delivery across Lagos, Abuja, Port Harcourt & all 36 states.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0" />
                <span>100% genuine factory warranty with available replacement parts.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw size={16} className="text-sky-500 flex-shrink-0" />
                <span>Hassle-free 7-day return policy for unopened items.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
