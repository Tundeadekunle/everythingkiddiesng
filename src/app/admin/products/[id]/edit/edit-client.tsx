"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, Trash2, ArrowLeft, Loader2, Sparkles, Star, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface EditProductFormProps {
  product: {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    compareAtPrice: string | null;
    rating: string;
    reviewsCount: number;
    stock: number;
    images: string[];
    categoryId: number | null;
    featured: boolean;
    badge: string | null;
    specifications: Record<string, string>;
  };
}

export function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: product.title,
    categoryId: product.categoryId ? product.categoryId.toString() : "1",
    price: product.price,
    compareAtPrice: product.compareAtPrice || "",
    rating: product.rating || "5.0",
    reviewsCount: product.reviewsCount ? product.reviewsCount.toString() : "0",
    stock: product.stock.toString(),
    badge: product.badge || "",
    featured: product.featured,
    description: product.description,
  });

  const [images, setImages] = useState<string[]>(product.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");

  const initialSpecs = product.specifications && Object.keys(product.specifications).length > 0
    ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
    : [
        { key: "Battery", value: "12V 7Ah Rechargeable" },
        { key: "Age Range", value: "3 - 8 Years" },
      ];

  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>(initialSpecs);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImages((prev) => [...prev, data.url]);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Upload failed: " + (data.error || ""));
      }
    } catch {
      toast.error("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
      toast.success("Image URL added");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.description) {
      toast.error("Please fill in required fields (title, price, description)");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload or add at least one product image");
      return;
    }

    setLoading(true);

    const specObject: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specObject[s.key.trim()] = s.value.trim();
      }
    });

    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          ...formData,
          images,
          specifications: specObject,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update product");
      }

      toast.success("Product updated successfully in NeonDB!");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update product in NeonDB");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Product Editing • NeonDB
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Edit Product: {product.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Modify details, photos, custom rating, price and inventory in real time.
            </p>
          </div>

          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 self-start sm:self-auto"
          >
            View Live in Store ?
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Basic Product Details
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Product Title *</label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="1">Electric Ride-Ons</option>
                  <option value="2">Educational & STEM</option>
                  <option value="3">Montessori & Sensory</option>
                  <option value="4">Outdoor & Sports</option>
                  <option value="5">Creative & Arts</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Product Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  placeholder="e.g. Best Seller, 12V Dual Motor, Trending"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Price (₦ NGN) *</label>
                <input
                  type="number"
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Original / Compare Price (₦ NGN)</label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                />
              </div>


              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono font-bold"
                />
              </div>
            </div>

            {/* Admin Rating & Reviews Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Star size={13} className="text-amber-500 fill-amber-500" />
                  Admin Rating (1.0 - 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-900">Reviews Count</label>
                <input
                  type="number"
                  name="reviewsCount"
                  value={formData.reviewsCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Product Description *</label>
              <textarea
                rows={4}
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Product Images ({images.length} attached)
            </h3>

            {/* Upload Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/50 hover:bg-rose-50 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                <Upload size={22} className="text-rose-500 mb-1" />
                <span className="text-xs font-bold text-rose-700">
                  {uploadingImage ? "Uploading..." : "Upload New Photo from Device"}
                </span>
                <span className="text-[10px] text-slate-400">Select JPG, PNG or WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>

              {/* Add direct URL */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-700 mb-1">Add Image Web URL</span>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative group h-20 w-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                    <img src={img} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Builder */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Specifications
              </h3>
              <button
                type="button"
                onClick={handleAddSpec}
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                <Plus size={14} /> Add Spec Item
              </button>
            </div>

            <div className="space-y-2">
              {specs.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    placeholder="Specification Key"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    placeholder="Specification Value"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Link
              href="/admin/products"
              className="px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving Updates to NeonDB...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes to NeonDB
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
