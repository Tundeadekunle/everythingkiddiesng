import { getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Plus, Eye, Sparkles, Edit3 } from "lucide-react";

export default async function AdminProductsListPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Inventory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Total {products.length} products stored in NeonDB
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={15} />
          Upload New Product
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-800">No products uploaded yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Get started by uploading your first electric ride-on or STEM educational toy.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md hover:bg-rose-600 transition-colors"
            >
              <Plus size={14} /> Upload First Product
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile Cards for small screens */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {products.map((p) => (
                <div key={p.id} className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={p.images?.[0] || ""}
                      alt={p.title}
                      className="h-16 w-16 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-xs line-clamp-2">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {p.category?.name || "General"}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {p.badge && (
                          <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded">
                            {p.badge}
                          </span>
                        )}
                        {p.featured && (
                          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Sparkles size={10} /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="font-black text-slate-900 text-sm block">{formatPrice(p.price)}</span>
                      <span className={`text-[10px] font-bold ${p.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {p.stock > 0 ? `${p.stock} units left` : "Out of stock"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors"
                      >
                        <Edit3 size={12} />
                        Edit
                      </Link>
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 font-bold text-xs transition-colors"
                      >
                        <Eye size={12} />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Image & Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={p.images?.[0] || ""}
                          alt={p.title}
                          className="h-12 w-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1 max-w-sm">
                            {p.title}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {p.badge && (
                              <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded">
                                {p.badge}
                              </span>
                            )}
                            {p.featured && (
                              <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Sparkles size={10} /> Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-600">
                        {p.category?.name || "General"}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[11px] transition-colors"
                        >
                          <Edit3 size={12} />
                          Edit
                        </Link>
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 font-bold text-[11px] transition-colors"
                        >
                          <Eye size={12} />
                          View
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
