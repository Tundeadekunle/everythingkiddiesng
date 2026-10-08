import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPaystackSignature } from "@/lib/paystack";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // 1. Verify HMAC-SHA512 webhook signature
    const isValid = verifyPaystackSignature(rawBody, signature);
    if (!isValid) {
      console.warn("Paystack Webhook: Invalid or missing x-paystack-signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // 2. Handle successful charge event
    if (event.event === "charge.success") {
      const { reference, paid_at, metadata } = event.data || {};

      if (reference) {
        try {
          const paidDate = paid_at ? new Date(paid_at) : new Date();

          // Update order status idempotently
          const result = await db
            .update(orders)
            .set({
              status: "paid",
              paidAt: paidDate,
            })
            .where(eq(orders.paystackReference, reference))
            .returning({ id: orders.id, orderNumber: orders.orderNumber });

          if (result.length > 0) {
            console.log(`Paystack Webhook: Order ${result[0].orderNumber} (${reference}) confirmed and marked paid.`);
          } else if (metadata?.orderNumber) {
            // Fallback match by orderNumber if reference differed
            const fallbackResult = await db
              .update(orders)
              .set({
                status: "paid",
                paidAt: paidDate,
                paystackReference: reference,
              })
              .where(eq(orders.orderNumber, metadata.orderNumber))
              .returning({ id: orders.id, orderNumber: orders.orderNumber });

            if (fallbackResult.length > 0) {
              console.log(`Paystack Webhook: Order ${fallbackResult[0].orderNumber} matched by metadata and marked paid.`);
            }
          }
        } catch (dbError) {
          console.error("Paystack Webhook: Database update error:", dbError);
          // Return 200 so Paystack does not retry endlessly if DB is temporarily unreachable
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Paystack Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
