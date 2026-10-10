import { getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Package, PackageCheck, DollarSign, AlertCircle, ArrowUpRight, Plus, Sparkles, UserPlus, Edit3, Eye } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardOverview() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  const products = await getProducts();

  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.stock > 0).length;
  const lowStockProducts = products.filter((p) => p.stock <= 3 && p.stock > 0).length;

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0 max-w-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
            <span className="text-xs font-bold text-slate-500 truncate min-w-0 block">
              Welcome, {user.name} ({user.email})
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Admin Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time management for EverythingKiddies on NeonDB
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/signup"
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 font-bold text-[11px] sm:text-xs shadow-sm transition-all inline-flex items-center justify-center gap-1 text-center"
          >
            <UserPlus size={13} />
            <span>Add Admin</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-[11px] sm:text-xs shadow-sm transition-all inline-flex items-center justify-center gap-1 text-center"
          >
            <Plus size={13} />
            <span>New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 w-full min-w-0">
        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm space-y-1 min-w-0">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Total Items</span>
            <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-rose-50 text-rose-500 flex-shrink-0">
              <Package size={14} className="sm:hidden" />
              <Package size={16} className="hidden sm:block" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 truncate">{totalProducts}</div>
          <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">In NeonDB</div>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm space-y-1 min-w-0">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">In Stock</span>
            <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-500 flex-shrink-0">
              <PackageCheck size={14} className="sm:hidden" />
              <PackageCheck size={16} className="hidden sm:block" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-emerald-600 truncate">{inStockProducts}</div>
          <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">Available units</div>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm space-y-1 min-w-0">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Low Stock</span>
            <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-amber-50 text-amber-500 flex-shrink-0">
              <AlertCircle size={14} className="sm:hidden" />
              <AlertCircle size={16} className="hidden sm:block" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-amber-600 truncate">{lowStockProducts}</div>
          <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">Under 3 items</div>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm space-y-1 min-w-0">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Database</span>
            <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-sky-50 text-sky-500 flex-shrink-0">
              <DollarSign size={14} className="sm:hidden" />
              <DollarSign size={16} className="hidden sm:block" />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 truncate">PostgreSQL</div>
          <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate">Connected</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl sm:rounded-3xl border border-slate-200/80 p-3 sm:p-6 shadow-sm space-y-4 sm:space-y-6 w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">Current Products</h2>
            <p className="text-[11px] sm:text-xs text-slate-500 truncate">Uploaded to your NeonDB database</p>
          </div>
          <Link
            href="/admin/products/new"
            className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-[11px] sm:text-xs shadow-sm transition-all inline-flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
          >
            <Plus size={12} />
            <span>Upload Product</span>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl p-6 border border-dashed border-slate-200">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Package size={24} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No products uploaded yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your NeonDB is ready! Click below to upload your first electric ride-on or educational toy with photos, rating, and description.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md hover:bg-rose-600 transition-colors"
            >
              <Sparkles size={14} />
              Upload First Product
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile Cards for Recent Products - Edit & View placed very close to price */}
            <div className="block lg:hidden divide-y divide-slate-100 w-full min-w-0">
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="py-2.5 px-0 flex items-center justify-between gap-2 w-full min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <img
                      src={p.images?.[0] || ""}
                      alt={p.title}
                      className="h-10 w-10 rounded-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-slate-900 text-xs block truncate">
                        {p.title}
                      </span>
                      {/* Price and Edit/View brought directly close together */}
                      <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                        <span className="font-bold text-rose-600 text-xs whitespace-nowrap">
                          {formatPrice(p.price)}
                        </span>
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="inline-flex items-center gap-0.5 text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded text-[10px] transition-colors flex-shrink-0"
                        >
                          <Edit3 size={10} /> Edit
                        </Link>
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-0.5 text-slate-500 hover:text-slate-800 font-bold px-1 py-0.5 rounded text-[10px] transition-colors flex-shrink-0"
                        >
                          <Eye size={10} /> View
                        </Link>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold whitespace-nowrap flex-shrink-0 ml-1 ${p.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    {p.stock > 0 ? `${p.stock} left` : "Out of stock"}
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop Table for Recent Products */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.slice(0, 6).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={p.images?.[0] || ""}
                          alt={p.title}
                          className="h-10 w-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block truncate max-w-xs">
                            {p.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {p.badge || "Standard"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock > 0
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-md"
                        >
                          <Edit3 size={11} /> Edit
                        </Link>
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold"
                        >
                          View <ArrowUpRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
