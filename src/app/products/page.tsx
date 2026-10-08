import { getProducts, getCategories } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { Filter, Search } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ categorySlug: category, search: search }),
    getCategories(),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
          <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800">Products</span>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-rose-600">{activeCategory.name}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {search
            ? `Search results for "${search}"`
            : activeCategory
            ? activeCategory.name
            : "All Kids Rides & Educational Toys"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Showing {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-sm font-bold text-slate-800">
              <Filter size={16} className="text-rose-500" />
              <span>Filter by Category</span>
            </div>

            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-1 lg:pb-0 scrollbar-none">
              <Link
                href="/products"
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0 lg:flex-shrink ${
                  !category
                    ? "bg-rose-500 text-white shadow-sm"
                    : "text-slate-600 bg-slate-50 lg:bg-transparent hover:bg-slate-100"
                }`}
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0 lg:flex-shrink ${
                    category === cat.slug
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-600 bg-slate-50 lg:bg-transparent hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>


          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider">Electric Ride-On Warranty</h4>
            <p className="text-[11px] leading-relaxed text-amber-800">
              All 12V and 24V electric vehicles come with complimentary battery maintenance guide and 6-month motor warranty.
            </p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm space-y-3">
              <div className="h-16 w-16 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <Search size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&#39;t find any toys matching your current filter. Try clearing your search or browsing another category.
              </p>
              <Link
                href="/products"
                className="inline-block px-5 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
