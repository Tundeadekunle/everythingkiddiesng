import crypto from "crypto";

interface PaystackInitParams {
  email: string;
  amount: number; // in kobo (NGN * 100)
  reference: string;
  callback_url: string;
  metadata?: Record<string, unknown>;
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata?: Record<string, any>;
    customer: {
      id: number;
      first_name?: string;
      last_name?: string;
      email: string;
      phone?: string;
      customer_code: string;
    };
  };
}

export async function initializePaystackTransaction(params: PaystackInitParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured in .env");
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!data.status) {
    throw new Error(data.message || "Failed to initialize Paystack payment");
  }

  return data.data as {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function verifyPaystackTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured in .env");
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data as PaystackVerifyResponse;
}

/**
 * Validates HMAC-SHA512 signature from Paystack webhook event
 */
export function verifyPaystackSignature(rawBody: string, signature: string | null): boolean {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || !signature) {
    return false;
  }

  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");

  return hash === signature;
}

