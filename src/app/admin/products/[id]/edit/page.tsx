import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditProductForm } from "./edit-client";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    with: { category: true },
  });

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}
