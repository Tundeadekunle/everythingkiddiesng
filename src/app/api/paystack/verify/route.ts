import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPaystackTransaction } from "@/lib/paystack";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const orderNumber = searchParams.get("orderNumber");

  if (!reference) {
    return NextResponse.redirect(new URL("/cart", req.url));
  }

  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (secretKey && !secretKey.includes("mock")) {
      const verifyRes = await verifyPaystackTransaction(reference);

      if (verifyRes.status && verifyRes.data.status === "success") {
        // Update database order to paid
        try {
          await db
            .update(orders)
            .set({
              status: "paid",
              paidAt: new Date(),
            })
            .where(eq(orders.paystackReference, reference));
        } catch (dbErr) {
          console.warn("DB update failed on verification:", dbErr);
        }
      }
    }

    const targetOrderNumber = orderNumber || reference;
    return NextResponse.redirect(
      new URL(`/order-success/${targetOrderNumber}?reference=${reference}`, req.url)
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(new URL("/cart", req.url));
  }
}
