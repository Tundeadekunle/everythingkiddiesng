import { NextResponse } from "next/server";
import { createUserSession, clearUserSession, getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name, phone } = body;

    // Logout
    if (action === "logout") {
      await clearUserSession();
      return NextResponse.json({ success: true });
    }

    const cleanEmail = email?.toLowerCase().trim();

    // 1. Admin Sign Up in NeonDB
    if (action === "signup") {
      if (!name || !cleanEmail || !password) {
        return NextResponse.json(
          { success: false, error: "Name, email, and password are required" },
          { status: 400 }
        );
      }

      // Check existing email
      const existing = await db.query.users.findFirst({
        where: eq(users.email, cleanEmail),
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "An admin with this email already exists" },
          { status: 400 }
        );
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const [newAdmin] = await db
        .insert(users)
        .values({
          name: name.trim(),
          email: cleanEmail,
          passwordHash,
          role: "admin",
          phone: phone || null,
        })
        .returning();

      await createUserSession({
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: "admin",
      });

      return NextResponse.json({
        success: true,
        user: {
          id: newAdmin.id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: "admin",
        },
      });
    }

    // 2. Admin Login
    if (!cleanEmail || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check NeonDB for registered admin
    const dbAdmin = await db.query.users.findFirst({
      where: eq(users.email, cleanEmail),
    });

    if (dbAdmin && dbAdmin.role === "admin") {
      const match = await bcrypt.compare(password, dbAdmin.passwordHash);
      if (match) {
        await createUserSession({
          id: dbAdmin.id,
          name: dbAdmin.name,
          email: dbAdmin.email,
          role: "admin",
        });
        return NextResponse.json({
          success: true,
          user: {
            id: dbAdmin.id,
            name: dbAdmin.name,
            email: dbAdmin.email,
            role: "admin",
          },
        });
      }
    }

    // Fallback env credentials check
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@everythingkiddies.com").toLowerCase().trim();
    const envAdminPass = process.env.ADMIN_PASSWORD || "admin123";

    if (cleanEmail === envAdminEmail && password === envAdminPass) {
      await createUserSession({
        id: 9999,
        name: "Super Administrator",
        email: envAdminEmail,
        role: "admin",
      });
      return NextResponse.json({
        success: true,
        user: {
          id: 9999,
          name: "Super Administrator",
          email: envAdminEmail,
          role: "admin",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin credentials" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Authentication error" },
      { status: 500 }
    );
  }
}
