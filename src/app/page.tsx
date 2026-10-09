import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { CdcareHero } from "@/components/cdcare-hero";
import { getProducts, getCategories } from "@/lib/data";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* CDcare-Style Hero Section */}
      <CdcareHero />


      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Browse by Joyful Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            Explore all categories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block p-3 rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors mb-3">
                  <Zap size={20} />
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-rose-500 flex items-center gap-1">
                Shop collection <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              Top Rated by Parents
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Featured Rides & Educational Picks
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1 border border-slate-200 px-3.5 py-1.5 rounded-full"
          >
            View All ({featuredProducts.length}+)
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section id="trust-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              Parents&#39; #1 Choice in Nigeria
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              Every Ride Tested for Safety. Every Toy Crafted for Curious Minds.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We understand child safety comes first. That&#39;s why all electric vehicles feature emergency parental brake remotes, smooth-start acceleration systems, and certified non-toxic plastics.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 shadow transition-colors"
              >
                Browse All Available Toys
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <ShieldCheck size={18} className="text-emerald-400" />
                Guaranteed After-Sales Support
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
