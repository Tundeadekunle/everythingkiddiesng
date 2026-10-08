import { db } from "@/db";
import { products, categories, orders, orderItems } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function getProducts(options?: { categorySlug?: string; search?: string; featured?: boolean }) {
  try {
    const allProducts = await db.query.products.findMany({
      with: {
        category: true,
      },
      orderBy: [desc(products.createdAt)],
    });

    let filtered = allProducts;

    if (options?.categorySlug) {
      filtered = filtered.filter((p) => p.category?.slug === options.categorySlug);
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (options?.featured) {
      filtered = filtered.filter((p) => p.featured);
    }

    return filtered;
  } catch (error) {
    console.error("Error fetching products from NeonDB:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const found = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: {
        category: true,
      },
    });
    return found || null;
  } catch (error) {
    console.error("Error fetching product by slug from NeonDB:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const allCategories = await db.query.categories.findMany({
      orderBy: [categories.id],
    });
    return allCategories;
  } catch (error) {
    console.error("Error fetching categories from NeonDB:", error);
    return [];
  }
}
