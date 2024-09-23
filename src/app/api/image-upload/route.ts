import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface CoudinaryUploadResult {
  public_id: string;
  [key: string]: string;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CoudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "zipvid-image-uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CoudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);

        return NextResponse.json(
          {
            publicId: result.public_id,
          },
          { status: 201 }
        );
      }
    );
  } catch (error) {
    console.log("upload image failed", error);
    return NextResponse.json({ error: "upload image failed" }, { status: 501 });
  }
}
