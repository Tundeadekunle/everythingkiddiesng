import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const ext = path.extname(file.name) || ".jpg";
    const filename = `kiddies_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${ext}`;

    // 1. Cloudinary Storage (Recommended for media & Next.js production)
    const hasCloudinary =
      Boolean(process.env.CLOUDINARY_URL) ||
      Boolean(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      );

    if (hasCloudinary) {
      if (process.env.CLOUDINARY_URL) {
        cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
      } else {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
        });
      }

      const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;
      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        folder: "everythingkiddies",
        resource_type: "image",
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        provider: "cloudinary",
      });
    }

    // 2. Vercel Blob Storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, file, { access: "public" });
      return NextResponse.json({
        success: true,
        url: blob.url,
        provider: "vercel-blob",
      });
    }

    // 3. Local filesystem storage (Active during local development)
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.cwd().startsWith("/var/task")
    );

    if (!isServerless && process.env.NODE_ENV === "development") {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const publicUrl = `/uploads/${filename}`;
        return NextResponse.json({
          success: true,
          url: publicUrl,
          provider: "local",
        });
      } catch (fsErr) {
        console.warn("Local filesystem write failed, using data-url fallback:", fsErr);
      }
    }

    // 4. Serverless Zero-Configuration Fallback:
    // When running in a read-only serverless environment (like Vercel) without
    // external storage credentials configured yet, store as an inline Data URI.
    // This allows uploads and product creation to succeed immediately without EROFS errors.
    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;
    return NextResponse.json({
      success: true,
      url: base64Data,
      provider: "data-url",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "File upload failed" },
      { status: 500 }
    );
  }
}
