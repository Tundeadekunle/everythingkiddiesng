import * as dotenv from "dotenv";
dotenv.config();

import { neon } from "@neondatabase/serverless";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(connectionString);

  console.log("Connecting to NeonDB and creating real-time schema...");

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer',
      phone TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      icon TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      price NUMERIC(12, 2) NOT NULL,
      compare_at_price NUMERIC(12, 2),
      rating NUMERIC(2, 1) DEFAULT '5.0' NOT NULL,
      reviews_count INTEGER DEFAULT 0 NOT NULL,
      stock INTEGER DEFAULT 10 NOT NULL,
      images JSONB DEFAULT '[]'::jsonb NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      featured BOOLEAN DEFAULT FALSE NOT NULL,
      badge TEXT,
      specifications JSONB DEFAULT '{}'::jsonb NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number TEXT NOT NULL UNIQUE,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      total_amount NUMERIC(12, 2) NOT NULL,
      status TEXT DEFAULT 'pending' NOT NULL,
      paystack_reference TEXT,
      paid_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
      product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
      product_title TEXT NOT NULL,
      price NUMERIC(12, 2) NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT
    );
  `;

  // Seed default core categories if none exist so users can organize uploaded products
  await sql`
    INSERT INTO categories (name, slug, description, icon)
    VALUES 
      ('Electric Ride-Ons', 'electric-ride-ons', 'Battery-powered luxury cars, superbikes and buggies', 'Car'),
      ('Educational & STEM', 'educational-stem', 'Robotics, science and engineering sets', 'Brain'),
      ('Montessori & Sensory', 'montessori-sensory', 'Developmental busy boards and tactile toys', 'Sparkles'),
      ('Outdoor & Sports', 'outdoor-sports', 'Scooters and active physical play', 'Rocket'),
      ('Creative & Arts', 'creative-arts', 'Craft, drawing and music toys', 'Palette')
    ON CONFLICT (slug) DO NOTHING;
  `;

  console.log("? NeonDB schema migrated successfully!");
}

main().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
