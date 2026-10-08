import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Award, Star, Truck, HeartHandshake, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getProducts, getCategories } from "@/lib/data";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-white pt-10 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold shadow-sm">
                <Sparkles size={14} className="text-rose-600" />
                <span>Next-Gen Kids Electric Rides & Montessori Toys</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Unforgettable Thrills.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600">
                  Brighter Minds.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover Nigeria&#39;s premier collection of licensed electric Mercedes, BMW ride-on cars, superbikes, and award-winning STEM robotics kits that nurture childhood imagination.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/products?category=electric-ride-ons"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={18} />
                  Shop Electric Ride-Ons
                </Link>
                <Link
                  href="/products?category=educational-stem"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  Explore STEM & Learning
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500">Child-Safe Verified</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-rose-600">2,500+</div>
                  <div className="text-[11px] font-semibold text-slate-500">Happy Kids in Nigeria</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">4.9 / 5</div>
                  <div className="text-[11px] font-semibold text-slate-500">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl bg-white p-3 border border-slate-100">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80"
                    alt="Mercedes G63 Kids Ride On Car"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Award size={13} className="text-amber-400" />
                    <span>Parental Remote Included</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-rose-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg">
                    Dual 12V High Torque
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Mercedes-Benz G63 AMG
                    </h3>
                    <p className="text-xs text-slate-500">Dual Motor Ã¢â‚¬Â¢ Bluetooth Music Ã¢â‚¬Â¢ Leather Seat</p>
                  </div>
                  <Link
                    href="/products/mercedes-benz-g63-amg-12v-electric-ride-on-suv"
                    className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-700 transition-colors"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Decorative Blur Spheres */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-rose-300/30 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl pointer-events-none -z-10" />
            </div>
          </div>
        </div>
      </section>

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
