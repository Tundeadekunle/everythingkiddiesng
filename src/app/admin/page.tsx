import { getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Package, ShoppingBag, DollarSign, AlertCircle, ArrowUpRight, Plus, Sparkles, UserPlus, Edit3 } from "lucide-react";
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500">
              Welcome, {user.name} ({user.email})
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Admin Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time management for EverythingKiddies on NeonDB
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/signup"
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
          >
            <UserPlus size={14} />
            <span>Add Admin Account</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Upload New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-500">
              <Package size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalProducts}</div>
          <div className="text-[11px] font-semibold text-slate-400">Stored in NeonDB</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Inventory</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-500">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">{inStockProducts}</div>
          <div className="text-[11px] font-semibold text-slate-400">Available units</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Low Stock</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-500">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">{lowStockProducts}</div>
          <div className="text-[11px] font-semibold text-slate-400">Under 3 items</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Database Status</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-500">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="text-sm font-black text-slate-900 mt-1">Neon PostgreSQL</div>
          <div className="text-[11px] font-semibold text-emerald-600">Connected & Verified</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Current Products</h2>
            <p className="text-xs text-slate-500">Uploaded to your NeonDB database</p>
          </div>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            + Upload Product
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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md hover:bg-rose-600 transition-colors"
            >
              <Sparkles size={14} />
              Upload First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
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
                    <td className="py-3.5 px-4 font-bold text-amber-500">
                      ? {p.rating} <span className="text-slate-400 font-normal">({p.reviewsCount})</span>
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
        )}
      </div>
    </div>
  );
}
