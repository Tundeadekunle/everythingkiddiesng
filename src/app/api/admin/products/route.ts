import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const product = await db.query.products.findFirst({
        where: eq(products.id, parseInt(id, 10)),
        with: { category: true },
      });
      if (!product) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, product });
    }

    const allProducts = await db.query.products.findMany({
      with: { category: true },
      orderBy: [desc(products.createdAt)],
    });
    return NextResponse.json({ success: true, products: allProducts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      price,
      compareAtPrice,
      rating,
      reviewsCount,
      stock,
      images,
      categoryId,
      featured,
      badge,
      specifications,
    } = body;

    if (!title || !price || !description) {
      return NextResponse.json(
        { success: false, error: "Title, description, and price are required" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(title);
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const [newProduct] = await db
      .insert(products)
      .values({
        title,
        slug: uniqueSlug,
        description,
        price: price.toString(),
        compareAtPrice: compareAtPrice ? compareAtPrice.toString() : null,
        rating: (rating || 5.0).toString(),
        reviewsCount: parseInt(reviewsCount || 0, 10),
        stock: parseInt(stock || 10, 10),
        images: images || [],
        categoryId: categoryId ? parseInt(categoryId, 10) : null,
        featured: !!featured,
        badge: badge || null,
        specifications: specifications || {},
      })
      .returning();

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      description,
      price,
      compareAtPrice,
      rating,
      reviewsCount,
      stock,
      images,
      categoryId,
      featured,
      badge,
      specifications,
    } = body;

    if (!id || !title || !price || !description) {
      return NextResponse.json(
        { success: false, error: "Product ID, title, description, and price are required" },
        { status: 400 }
      );
    }

    const [updatedProduct] = await db
      .update(products)
      .set({
        title,
        description,
        price: price.toString(),
        compareAtPrice: compareAtPrice ? compareAtPrice.toString() : null,
        rating: (rating || 5.0).toString(),
        reviewsCount: parseInt(reviewsCount || 0, 10),
        stock: parseInt(stock || 10, 10),
        images: images || [],
        categoryId: categoryId ? parseInt(categoryId, 10) : null,
        featured: !!featured,
        badge: badge || null,
        specifications: specifications || {},
        updatedAt: new Date(),
      })
      .where(eq(products.id, parseInt(id, 10)))
      .returning();

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}
