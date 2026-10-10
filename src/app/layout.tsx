import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "EverythingKiddies | Electric Ride-Ons & Educational Toys for Kids",
  description: "Shop electric kids cars, motorbikes, STEM robotics, and Montessori educational toys with fast delivery across Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full max-w-full overflow-x-hidden">
      <body className="min-h-screen flex flex-col font-sans w-full max-w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full max-w-full min-w-0">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
