import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, totalAmount } = body;

    if (!customer || !items || items.length === 0 || !totalAmount) {
      return NextResponse.json(
        { success: false, error: "Invalid order payload" },
        { status: 400 }
      );
    }

    const orderNumber = `EK-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const paystackRef = `ps_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/paystack/verify?reference=${paystackRef}&orderNumber=${orderNumber}`;

    // 1. Try saving order to Neon Postgres
    try {
      const [newOrder] = await db
        .insert(orders)
        .values({
          orderNumber,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          shippingAddress: customer.address,
          city: customer.city,
          state: customer.state,
          totalAmount: totalAmount.toString(),
          status: "pending",
          paystackReference: paystackRef,
        })
        .returning();

      if (newOrder) {
        for (const item of items) {
          await db.insert(orderItems).values({
            orderId: newOrder.id,
            productId: item.id || null,
            productTitle: item.title,
            price: item.price.toString(),
            quantity: item.quantity,
            image: item.image,
          });
        }
      }
    } catch (dbError) {
      console.warn("Could not insert order into Neon DB (proceeding in mock/fallback mode):", dbError);
    }

    // 2. Initialize Paystack
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey || secretKey.includes("mock")) {
      // Demo simulated mode
      return NextResponse.json({
        success: true,
        isDemo: true,
        orderNumber,
        reference: paystackRef,
      });
    }

    const amountInKobo = Math.round(parseFloat(totalAmount) * 100);
    const paystackData = await initializePaystackTransaction({
      email: customer.email,
      amount: amountInKobo,
      reference: paystackRef,
      callback_url: callbackUrl,
      metadata: {
        orderNumber,
        customerName: customer.name,
        customerPhone: customer.phone,
      },
    });

    return NextResponse.json({
      success: true,
      authorization_url: paystackData.authorization_url,
      access_code: paystackData.access_code,
      reference: paystackRef,
      orderNumber,
    });
  } catch (error: any) {
    console.error("Paystack init error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
